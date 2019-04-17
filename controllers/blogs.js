const { getColorFromURL } = require('color-thief-node')
const { Blog, Organization, User } = require('../models')
const client = require('../config/netlify')
const errors = require('../errors')
const axios = require('axios')
const qs = require('querystring')
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

function getColorByBgColor(bgColor) {
  if (!bgColor) {
    return ''
  }
  return parseInt(bgColor.replace('#', ''), 16) > 0xffffff / 2 ? '#000' : '#fff'
}

// admin route, changes as new data migrations occur
exports.migrateBlogDataOver = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({})
    await Promise.all(
      blogs.map(blog => {
        blog.navbarHexCode = blog.backgroundHexCode
        blog.headerTextColor = getColorByBgColor(blog.backgroundHexCode)
        return blog.save()
      }),
    )
    return res.sendStatus(200)
  } catch (err) {
    return next(err)
  }
}

exports.updateBlog = async (req, res, next) => {
  const {
    blog: { id, bgImgUri, navbarHexCode, backgroundHexCode },
  } = req
  const updateBody = { ...req.body }
  // if new background image, and navbarHexcode is undefined set backgroundHex to img's dominant color
  if (!navbarHexCode) {
    if (req.body.bgImgUri && bgImgUri !== req.body.bgImgUri) {
      const dominantColor = await getColorFromURL(req.body.bgImgUri)
      updateBody.navbarHexCode = arrToHexString(dominantColor)
    } else if (
      req.body.backgroundHexCode &&
      backgroundHexCode !== req.body.backgroundHexCode
    ) {
      updateBody.navbarHexCode = req.body.backgroundHexCode
    }
  }
  try {
    const [rowsAffected, blog] = await Blog.update(updateBody, {
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

async function commitJSON(id, user, type) {
  // somewhat hacky way of checking if env is prod or dev
  // need to change if change our DB process
  if (!process.env.DATABASE_URL) {
    return
  }
  let deployTitle
  switch (type) {
    case 'blogPost':
      deployTitle = 'Blog post publishing'
      break
    case 'adminDash':
      deployTitle = 'Admin update building'
      break
    default:
      deployTitle = 'Update building'
      break
  }
  const blog = await Blog.findById(id)
  const prodInstance = await blog.getProdInstance()
  const jsonData = {
    customNavbarLinks: blog.customNavbarLinks || [],
    token: user.token,
    apiUrl: 'https://megaphone-api-prod.herokuapp.com',
    hasBeenInitialized: true,
  }
  await axios.post(
    `${prodInstance.buildHookUrl}?${qs.stringify({
      trigger_title: deployTitle,
    })}`,
    jsonData,
  )
}

exports.commitJSON = commitJSON

// blogwise admin route to trigger builds automatically
exports.deployBlogById = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, ['userId'])
  if (validationError) return res.status(400).send(validationError)
  try {
    const user = await User.findById(req.body.userId)
    const org = await Organization.findById(user.organizationId)
    const blog = await org.getBlog()
    await commitJSON(blog.id, user)
    await Blog.update({ hasUpdates: false }, { where: { id: req.body.blogId } })
    return res.sendStatus(200)
  } catch (err) {
    return next(err)
  }
}

exports.deployBlog = async (req, res, next) => {
  try {
    await commitJSON(req.blog.id, req.user, 'adminDash')
    await Blog.update({ hasUpdates: false }, { where: { id: req.blog.id } })
    return res.sendStatus(200)
  } catch (err) {
    return next(err)
  }
}

exports.setBlogToUpdate = async (req, res, next) => {
  try {
    await Blog.update({ hasUpdates: true }, { where: { id: req.blog.id } })
    return next()
  } catch (err) {
    return next(err)
  }
}

exports.getBlogUpdateStatus = async (req, res) => res.json(req.blog.hasUpdates)

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
        thumbnailUri: p.thumbnailUri,
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
        faviconPhotoUri: blog.faviconPhotoUri || '',
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
        headerTextColor: blog.headerTextColor || '',
        navbarHexCode: blog.navbarHexCode || '',
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
    const retDeploys = deploys
      .filter(d => d.branch === 'master')
      .slice(0, 4)
      .map(d => ({
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
  let { nouns } = req.body
  const { n } = req.body
  if (!nouns) {
    const { tags = {} } = req.blog
    nouns = Object.values(tags).map(t => t.name)
  }
  if (nouns.length === 0) return res.json([])
  const headlines = genHeadlines(nouns, n || undefined)
  return res.json(headlines)
}
