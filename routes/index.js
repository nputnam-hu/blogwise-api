const express = require('express')
const auth = require('../controllers/auth')
const blogs = require('../controllers/blogs')
const organizations = require('../controllers/organizations')
const payments = require('../controllers/payments')
const users = require('../controllers/users')
const s3 = require('../controllers/s3')
const prodInstances = require('../controllers/prodInstances')
const blogPosts = require('../controllers/blogPosts')
const calendars = require('../controllers/calendars')
const tipOfTheDay = require('../utils/tipOfTheDay')

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
    payments.createCustomer,
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
    blogs.setBlogToUpdate,
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
    blogs.setBlogToUpdate,
    blogs.getBlog,
  )

router
  .route('/blogs/updates')
  .get(auth.validateUser, blogs.getBlogFromUser, blogs.getBlogUpdateStatus)

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

// router.route('/bl')

router
  .route('/blogs/build')
  .get(auth.validateUser, blogs.getBlogFromUser, blogs.buildBlog)

router
  .route('/blogs/content')
  .post(auth.validateUser, blogs.getBlogFromUser, blogs.getContentRecs)

router.route('/blogs/tip').get(auth.validateUser, tipOfTheDay)

/*
 * BlogPost Routes
 */

router
  .route('/blogs/posts')
  .get(auth.validateUser, blogs.getBlogFromUser, blogPosts.getBlogPosts)
  .post(auth.validateUser, blogs.getBlogFromUser, blogPosts.createBlogPost)
  .put(auth.validateUser, blogPosts.updateBlogPost)

router
  .route('/blogs/posts/:id')
  .get(auth.validateUser, blogPosts.getBlogPostById)
  .delete(auth.validateUser, blogPosts.deleteBlogPostById)

router
  .route('/blogs/posts/:id/publish')
  .post(auth.validateUser, blogPosts.publishBlogPostNow)

router
  .route('/blogs/posts/:id/publish/schedule')
  .post(auth.validateUser, blogPosts.publishBlogPostLater)

router
  .route('/blogs/posts/:id/publish/schedule/cancel')
  .delete(auth.validateUser, blogPosts.cancelScheduledPublish)

router
  .route('/blogs/posts/:id/unpublish')
  .post(auth.validateUser, blogPosts.unpublishBlogPost, blogs.deployBlog)

/*
 * Calendar Routes
 */

router.route('/calendars').post(auth.validateUser, calendars.createCalendar)
router
  .route('/calendars/posts')
  .get(auth.validateUser, calendars.getCalendarFromUser, calendars.getPosts)
  .post(
    auth.validateUser,
    calendars.getCalendarFromUser,
    calendars.scheduleInitialPosts,
  )
  .put(auth.validateUser, calendars.updatePost)

router
  .route('/calendars/posts/next')
  .get(
    auth.validateUser,
    calendars.getCalendarFromUser,
    calendars.getNextPostDue,
  )

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

module.exports = router
