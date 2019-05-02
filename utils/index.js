const config = require('../config')
const { ses } = require('../config/aws')
const { getCustomerPlanFromStripeToken } = require('../controllers/payments')

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
