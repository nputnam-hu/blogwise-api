const moment = require('moment')
const config = require('../config')
const stripe = require('stripe')(config.stripeApiToken)

const STRIPE_PLAN_IDS = {
  FREE: 'plan_ElquCJeYbkds73',
  STARTER: 'plan_ElqnHwyhw7DGd5',
  GROWTH: 'plan_ElqnOkrjlsOURw',
  ENTERPRISE: 'plan_Elqu90qPxL4aAh',
}

const STRIPE_ID_PLANS = {
  plan_ElquCJeYbkds73: 'FREE',
  plan_ElqnHwyhw7DGd5: 'STARTER',
  plan_ElqnOkrjlsOURw: 'GROWTH',
  plan_Elqu90qPxL4aAh: 'ENTERPRISE',
}

exports.createCustomer = async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    req.stripeCustomerId = '<test_id>'
    return next()
  }
  try {
    const customerId = await new Promise((resolve, reject) => {
      stripe.customers.create(
        {
          email: req.body.user.email,
        },
        (err, customer) => {
          if (err) return reject(err)
          return resolve(customer.id)
        },
      )
    })
    await new Promise((resolve, reject) => {
      stripe.subscriptions.create(
        {
          items: [{ plan: STRIPE_PLAN_IDS.STARTER }],
          customer: customerId,
          trial_end: moment()
            .add(14, 'days')
            .unix(),
        },
        err => {
          if (err) return reject(err)
          return resolve()
        },
      )
    })
    req.stripeCustomerId = customerId
    return next()
  } catch (err) {
    return next(err)
  }
}

exports.getCustomerPlanFromStripeToken = async stripeToken => {
  const planId = await new Promise((resolve, reject) => {
    stripe.customers.retrieve(stripeToken, (err, customer) => {
      if (err) {
        return reject(err)
      }
      if (customer.subscriptions.data.length === 0) {
        throw new Error(`Customer Has No Subs, id: ${stripeToken}`)
      }
      return resolve(customer.subscriptions.data[0].plan.id)
    })
  })
  return STRIPE_ID_PLANS[planId]
}
