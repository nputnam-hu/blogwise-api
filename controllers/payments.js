const moment = require('moment')
const { Organization } = require('../models')
const config = require('../config')
const stripe = require('stripe')(config.stripeApiToken)
const errors = require('../errors')

const STRIPE_PLAN_IDS = process.env.DATABASE_URL
  ? {
      STARTER: 'plan_ElqnHwyhw7DGd5',
      GROWTH: 'plan_ElqnOkrjlsOURw',
      ENTERPRISE: 'plan_Elqu90qPxL4aAh',
    }
  : {
      STARTER: 'plan_ExvGHXwK5ASqag',
      GROWTH: 'plan_ExvH607bTmOhEP',
      ENTERPRISE: 'plan_ExvHB4swqgQU5O',
    }

const STRIPE_ID_PLANS = Object.keys(STRIPE_PLAN_IDS).reduce(
  (acc, key) => ({
    [STRIPE_PLAN_IDS[key]]: key,
    ...acc,
  }),
  {},
)

exports.createCustomer = async (req, res, next) => {
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

exports.addCcToOrg = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, ['source'])
  if (validationError) return res.status(400).send(validationError)
  try {
    const org = await Organization.findById(req.user.organizationId)
    await new Promise((resolve, reject) => {
      stripe.customers.createSource(
        org.stripeToken,
        {
          source: req.body.source,
        },
        err => {
          if (err) {
            return reject(err)
          }
          return resolve()
        },
      )
    })
    return res.sendStatus(200)
  } catch (err) {
    return next(err)
  }
}

exports.updateCustomerPlan = async (req, res, next) => {
  const validationError = errors.missingFields(req.body, ['plan'])
  if (validationError) return res.status(400).send(validationError)
  try {
    const org = await Organization.findById(req.user.organizationId)
    const customer = await stripe.customers.retrieve(org.stripeToken)
    const subscription = customer.subscriptions.data[0]
    if (!subscription) {
      throw new Error(`Customer Has No Subs, id: ${stripeToken}`)
    }
    const plan = STRIPE_PLAN_IDS[req.body.plan]
    if (!plan) {
      throw new Error(`Invalid plan: ${req.body.plan}`)
    }
    await stripe.subscriptions.update(subscription.id, {
      cancel_at_period_end: false,
      items: [
        {
          id: subscription.items.data[0].id,
          plan,
        },
      ],
    })
    return res.json({ plan: req.body.plan })
  } catch (err) {
    return next(err)
  }
}

exports.getCustomerInvoices = async stripeToken => {
  const invoices = await new Promise((resolve, reject) => {
    stripe.invoices.list(
      {
        customer: stripeToken,
        limit: 5,
      },
      (err, invoices) => {
        if (err) {
          return reject(err)
        }
        return resolve(invoices.data)
      },
    )
  })
  const formattedInvoices = invoices
    .filter(i => i.amount_due > 0)
    .map(i => ({
      amountDue: i.amount_due,
      invoicePdf: i.invoice_pdf,
      dueDate: moment.unix(i.period_end),
    }))
  return { invoices: formattedInvoices }
}

exports.getCustomerPlanFromStripeToken = async stripeToken => {
  const { planId, trialEnd, ...rest } = await new Promise((resolve, reject) => {
    stripe.customers.retrieve(stripeToken, (err, customer) => {
      if (err) {
        return reject(err)
      }
      if (customer.subscriptions.data.length === 0) {
        throw new Error(`Customer Has No Subs, id: ${stripeToken}`)
      }
      return resolve({
        planId: customer.subscriptions.data[0].plan.id,
        trialEnd: customer.subscriptions.data[0].trial_end,
        lastFour: customer.sources.data[0]
          ? customer.sources.data[0].last4
          : null,
        brand: customer.sources.data[0] ? customer.sources.data[0].brand : null,
      })
    })
  })
  const now = moment()
  momentTrialEnd = moment.unix(trialEnd)
  const trialDaysLeft = Math.max(
    Math.ceil(momentTrialEnd.diff(now, 'days', true)),
    0,
  )
  return { plan: STRIPE_ID_PLANS[planId], trialDaysLeft, ...rest }
}
