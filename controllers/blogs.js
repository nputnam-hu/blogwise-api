const { getColorFromURL } = require('color-thief-node')
const { Blog, Organization } = require('../models')
const client = require('../config/netlify')
const errors = require('../errors')
const config = require('../config')
const { gitCommitPush } = require('../utils/git-commit')
const { genHeadlines } = require('../utils/blogIdeas')

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

function toHexStr(c) {
  if (c > 255) {
    throw new Error('problem')
  }
  const hex = c.toString(16)
  return `${c < 16 ? '0' : ''}${hex}`
}

const arrToHexString = ([r, g, b]) =>
  `#${toHexStr(r)}${toHexStr(g)}${toHexStr(b)}`

exports.updateBlog = async (req, res, next) => {
  const {
    blog: { id },
  } = req
  // if new background image, set backgroundHex to img's dominant color
  if (req.body.bgImgUri && req.blog.bgImgUri !== req.body.bgImgUri) {
    const dominantColor = await getColorFromURL(req.body.bgImgUri)
    req.body.backgroundHexCode = arrToHexString(dominantColor)
  }
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

async function commitJSON(id, user) {
  // somewhat hacky way of checking if env is prod or dev
  // need to change if change our DB process
  if (!process.env.DATABASE_URL) {
    return
  }
  const blog = await Blog.findById(id)
  const prodInstance = await blog.getProdInstance()
  const jsonData = {
    faviconPhotoUri: blog.faviconPhotoUri || '',
    customNavbarLinks: blog.customNavbarLinks || [],
    token: user.token,
    apiUrl: process.env.DB_URL
      ? 'https://megaphone-api-prod.herokuapp.com'
      : 'http://localhost:3001',
    hasBeenInitialized: true,
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
    commitMessage: `Update From Admin Dashboard, User ID: ${user.id}`,
    token: config.githubApiToken,
  })
}

exports.commitJSON = commitJSON

exports.deployBlog = async (req, res, next) => {
  try {
    await commitJSON(req.blog.id, req.user)
    return next()
  } catch (err) {
    return next(err)
  }
}

exports.buildBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.blog.id)
    const org = await Organization.findById(blog.OrganizationId)
    const users = await org.getUsers()
    const blogPosts = await blog.getBlogPosts({
      where: { hasBeenPublished: true },
    })
    const responseJson = {
      authors: users.map(u => ({
        id: u.id,
        name: u.name,
        headshotUri: u.headshotUri,
        bio: u.bio,
      })),
      posts: blogPosts.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        htmlBody: p.htmlBody,
        publishDate: p.publishDate,
        coverPhotoUri: p.coverPhotoUri,
        tagIds: p.tags.map(t => t.value),
        slug: p.slug,
        authorId: p.UserId,
      })),
      tags: blog.tags,
      data: {
        title: blog.title || '',
        name: blog.companyName || '',
        description: blog.description || '',
        headerPhotoUri: blog.headerPhotoUri || '',
        sidebarPhotoUri: blog.sidebarPhotoUri || '',
        bgImgUri: blog.bgImgUri || '',
        backgroundHexCode: blog.backgroundHexCode || '',
        mainSiteUrl: blog.mainSiteUrl || '',
        twitterUrl: blog.twitterUrl
          ? `https://twitter.com/${blog.twitterUrl}`
          : '',
        facebookUrl: blog.facebookUrl
          ? `https://www.facebook.com/${blog.facebookUrl}`
          : '',
        linkedinUrl: blog.linkedinUrl
          ? `https://www.linkedin.com/${blog.linkedinUrl}`
          : '',
      },
    }
    return res.json(responseJson)
  } catch (err) {
    return next(err)
  }
}

exports.getBlogDeploys = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.blog.id)
    const prodInstance = await blog.getProdInstance()
    const deploys = await client.listSiteDeploys({
      site_id: prodInstance.netlifyUrl.replace(/https:\/\//, ''),
    })
    const retDeploys = deploys.slice(0, 3).map(d => ({
      id: d.id,
      state: d.state,
      published_at: d.published_at,
      created_at: d.created_at,
      title: d.title,
    }))
    return res.json(retDeploys)
  } catch (err) {
    return next(err)
  }
}

exports.updateBlogDomain = async (req, res, next) => {
  const {
    blog: { id },
  } = req
  try {
    const blog = await Blog.findById(id)
    const prodInstance = await blog.getProdInstance()
    await client.updateSite({
      site_id: prodInstance.netlifyUrl.replace(/https:\/\//, ''),
      body: { custom_domain: blog.siteUrl },
    })
    return res.sendStatus(200)
  } catch (err) {
    return next(err)
  }
}

exports.setBlogSSL = async (req, res, next) => {
  const {
    blog: { id },
  } = req
  try {
    const blog = await Blog.findById(id)
    const prodInstance = await blog.getProdInstance()
    client.provisionSiteTLSCertificate({
      site_id: prodInstance.netlifyUrl.replace(/https:\/\//, ''),
    })
    return res.sendStatus(200)
  } catch (err) {
    return next(err)
  }
}

exports.getContentRecs = (req, res) => {
  let { nouns, n } = req.body
  if (!nouns) {
    const { tags = {} } = req.blog
    nouns = Object.values(tags).map(t => t.name)
  }
  if (nouns.length === 0) return res.json([])
  const headlines = genHeadlines(nouns, n || undefined)
  return res.json(headlines)
}
