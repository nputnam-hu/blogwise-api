const express = require('express')
const auth = require('../controllers/auth')
const blogs = require('../controllers/blogs')
const organizations = require('../controllers/organizations')
const users = require('../controllers/users')
const s3 = require('../controllers/s3')
const netlifyIdentity = require('../controllers/netlifyIdentity')

const router = express.Router()

/*
 * Organization Routes
 */

router
  .route('/organizations')
  .post(
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
  .put(auth.validateUser, users.updateUser)
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
  .put(auth.validateAdmin, blogs.getBlogFromUser, blogs.updateBlog)

/*
 * S3 Routes
 */

router.route('/s3/logo').put(auth.validateUser, s3.uploadLogo)

/*
 * Auth Routes
 */

router.route('/auth/login').post(auth.loginUser)

/*
 * Netlify Identity Routes
 */

router.route('/.netlify/identity/token').post(netlifyIdentity.loginUser)
router
  .route('/.netlify/identity/logout')
  .post(netlifyIdentity.validateToken, netlifyIdentity.logoutUser)
router
  .route('/.netlify/identity/user')
  .get(netlifyIdentity.validateToken, netlifyIdentity.getUserData)
router.route('/.netlify/identity/settings').get(netlifyIdentity.getSettings)

module.exports = router
