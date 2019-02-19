const { Blog, Organization } = require('../models')
const config = require('../config')
const { gitCommitPush } = require('../utils/git-commit')

exports.createBlog = async (req, _, next) => {
  try {
    const newBlog = await Blog.build({ siteUrl: req.openInstance.netlifyUrl })
    await newBlog.save()
    newBlog.setProdInstance(req.openInstance)
    req.blogId = newBlog.id
    return next()
  } catch (err) {
    return next(err)
  }
}

exports.getBlogFromUser = async (req, _, next) => {
  try {
    const org = await Organization.findById(req.user.organizationId)
    const blog = await org.getBlog()
    req.blog = blog
    return next()
  } catch (err) {
    return next(err)
  }
}

exports.updateBlog = async (req, res, next) => {
  const {
    blog: { id },
  } = req
  try {
    const blog = await Blog.update(req.body, { where: { id } })
    req.blog = blog
    return next()
  } catch (err) {
    return next(err)
  }
}

exports.getBlog = (req, res) => res.json(req.blog)

exports.deployBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.blog.id)
    const prodInstance = await blog.getProdInstance()
    const org = await Organization.findById(blog.OrganizationId)
    const users = await org.getUsers()
    const formattedUsers = users.reduce(
      (acc, user) => ({
        [user.id]: {
          name: user.name,
          bio: user.bio,
          img: user.headshotUri,
        },
        ...acc,
      }),
      {},
    )
    const jsonData = {
      title: blog.title,
      description: blog.description,
      logoUri: blog.logoUri,
      backgroundHexCode: blog.backgroundHexCode,
      social: {
        mainSite: blog.mainSiteUrl,
        twitter: blog.twitterUrl
          ? `https://twitter.com/${blog.twitterUrl}`
          : '',
        facebook: blog.facebookUrl
          ? `https://www.facebook.com/${blog.facebookUrl}`
          : '',
        linkedin: blog.linkedinUrl
          ? `https://www.linkedin.com/${blog.linkedinUrl}`
          : '',
      },
      tags: blog.tags,
      authors: formattedUsers,
    }
    gitCommitPush({
      owner: config.githubOwner,
      repo: prodInstance.githubRepo,
      files: [
        {
          path: 'src/constants/user.json',
          content: JSON.stringify(jsonData),
        },
      ],
      fullyQualifiedRef: 'heads/master',
      forceUpdate: true,
      commitMessage: `Update From Admin Dashboard, User ID: ${req.user.id}`,
      token: config.githubApiToken,
    })
    return next()
  } catch (err) {
    console.error(err)
    return next(err)
  }
}
