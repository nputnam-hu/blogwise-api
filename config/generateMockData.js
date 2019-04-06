const { ProdInstance } = require('../models')

;(async () => {
  await ProdInstance.create({
    netlifyUrl: 'https://cocky-snyder-e6cb02.netlify.com',
    buildHookUrl: 'b',
  })
})()
