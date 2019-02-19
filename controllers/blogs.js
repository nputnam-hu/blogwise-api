const { Blog, Organization } = require('../models')
const errors = require('../errors')
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
    const [rowsAffected, blog] = await Blog.update(req.body, {
      where: { id },
      returning: true,
      plain: true,
    })
    if (rowsAffected === 0) {
      return res.status(404).send(errors.makeError(errors.err.OBJECT_NOT_FOUND))
    }
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
      {
        blogwiseStaff: {
          name: 'Blogwise Staff',
          bio:
            'Blogwise is the best way to start content marketing for your business',
          img:
            'https://megaphone-logo-uploads.s3.amazonaws.com/1550532855576_Noah.jpg',
        },
      },
    )
    const jsonData = {
      title: blog.title,
      description: blog.description,
      logoUri: blog.logoUri,
      backgroundHexCode: blog.backgroundHexCode,
      siteUrl: blog.siteUrl,
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
