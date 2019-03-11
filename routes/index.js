const express = require('express')
const auth = require('../controllers/auth')
const blogs = require('../controllers/blogs')
const organizations = require('../controllers/organizations')
const users = require('../controllers/users')
const s3 = require('../controllers/s3')
const prodInstances = require('../controllers/prodInstances')
const netlifyIdentity = require('../controllers/netlifyIdentity')

const router = express.Router()

/*
 * Organization Routes
 */

router
  .route('/organizations')
  .post(
    prodInstances.getOpenInstance,
    blogs.createBlog,
    users.creatFirstUser,
    organizations.createOrganization,
  )
  .get(auth.validateAdmin, organizations.getOrganization)
  .put(auth.validateAdmin, organizations.updateOrganization)

router
  .route('/organizations/users')
  .get(auth.validateAdmin, organizations.getOrganizationUsers)

/*
 * User Routes
 */

router
  .route('/users')
  .put(
    auth.validateUser,
    users.updateUser,
    blogs.getBlogFromUser,
    blogs.deployBlog,
    users.getUser,
  )
  .get(auth.validateSuperAdmin, users.getAllUsers)

router
  .route('/users/invite')
  .post(auth.validateAdmin, users.inviteUser)
  .put(users.registerInvitedUser)

router.route('/users/me').get(auth.validateUser, users.getUser)

/*
 * Blog Routes
 */

router
  .route('/blogs')
  .get(auth.validateAdmin, blogs.getBlogFromUser, blogs.getBlog)
  .put(
    auth.validateAdmin,
    blogs.getBlogFromUser,
    blogs.updateBlog,
    blogs.deployBlog,
    blogs.getBlog,
  )

router
  .route('/blogs/dns')
  .put(auth.validateAdmin, blogs.getBlogFromUser, blogs.updateBlogDomain)

router
  .route('/blogs/ssl')
  .post(auth.validateAdmin, blogs.getBlogFromUser, blogs.setBlogSSL)

router
  .route('/blogs/deploy')
  .get(auth.validateAdmin, blogs.getBlogFromUser, blogs.getBlogDeploys)
  .post(auth.validateAdmin, blogs.getBlogFromUser, blogs.deployBlog)

router
  .route('/blogs/content')
  .post(auth.validateAdmin, blogs.getBlogFromUser, blogs.getContentRecs)

/*
 * S3 Routes
 */

router.route('/s3/upload').put(auth.validateUser, s3.uploadPhoto)

/*
 * Auth Routes
 */

router.route('/auth/login').post(auth.loginUser)

router.route('/auth/forgot').post(auth.sendResetToken)

router.route('/auth/reset').put(auth.resetPassword)

/*
 * Prod Instance Routes
 */

router
  .route('/instances')
  .get(auth.validateAdmin, blogs.getBlogFromUser, prodInstances.getInstance)
  .post(auth.validateSuperAdmin, prodInstances.createInstance)

router.route('/.netlify/identity/token').post(netlifyIdentity.loginUser)
// router
//   .route('/.netlify/identity/logout')
//   .post(netlifyIdentity.validateToken, netlifyIdentity.logoutUser)
// router
//   .route('/.netlify/identity/user')
//   .get(netlifyIdentity.validateToken, netlifyIdentity.getUserData)
// router.route('/.netlify/identity/settings').get(netlifyIdentity.getSettings)

module.exports = router
