const config = require('../config')
const { ses } = require('../config/aws')
const { getCustomerPlanFromStripeToken } = require('../controllers/payments')
const client = require('../config/netlify')

exports.createNewSite = async () => {
  const deployKeyObj = await client.createDeployKey()

  const siteOption = {
    name: null,
    custom_domain: null,
    password: null,
    user_id: '5c2d23ef820efea2c62fa226',
    force_ssl: null,
    account_slug: 'nputnam-hu',
    account_name: "Noah Putnam's team",
    account_type: 'personal',
    deploy_hook: 'https://api.netlify.com/hooks/github',
    processing_settings: {
      css: { bundle: true, minify: true },
      js: { bundle: true, minify: true },
      images: { optimize: true },
      html: { pretty_urls: true },
      skip: true,
    },
    repo: {
      id: 171395074,
      provider: 'github',
      deploy_key_id: deployKeyObj.id,
      repo_path: 'nputnam-hu/blogwise-template-1-canonical',
      repo_branch: 'deploy',
      repo_url: 'https://github.com/nputnam-hu/blogwise-template-1-canonical',
      dir: 'public',
      cmd: 'npm run build',
      allowed_branches: ['master'],
      public_repo: true,
      private_logs: null,
      installation_id: 653696,
      env: {},
    },
  }

  const site = await client.createSite({ body: siteOption })

  return site
}

exports.allowedUsers = async function allowedUsers(stripeToken) {
  const { plan } = await getCustomerPlanFromStripeToken(stripeToken)
  switch (plan) {
    case 'FREE':
      return 1
    case 'STARTER':
      return 2
    case 'GROWTH':
      return 5
    case 'ENTERPRISE':
      return 999
    default:
      NavigationNavigationPreloadManager
      throw new Error('Invalid Plan')
  }
}

exports.sendAlertEmail = async function sendAlertEmail(
  msg,
  subject = 'Alert From Blogwise API',
) {
  if (process.env.NODE_ENV !== 'production') {
    return
  }
  const params = {
    Destination: {
      ToAddresses: config.alertToAdresses,
    },
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data: `<h1>Alert</h1> <br/> <p>${msg}</p>`,
        },
      },
      Subject: {
        Charset: 'UTF-8',
        Data: subject,
      },
    },
    Source: 'Blogwise Team <support@blogwise.co>',
  }
  await ses.sendEmail(params).promise()
}
