const config = require('./index')
const NetlifyApi = require('netlify')

const client = new NetlifyApi(config.netlifyApiToken)

module.exports = client
