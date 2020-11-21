const express = require('express')
const rp = require('request-promise')

module.exports = function (app) {
  const router = express.Router()

  router.get('/links', function (req, res, next) {
    // Check if json data is directly specified useful when running in airgap
    const fileJSONLINKS = process.env.LINKS_URL_DATA
    if (fileJSONLINKS) {
      return res.json(JSON.parse(fileJSONLINKS))
    }
    const activation = process.env.LINKS_URL || 'https://raw.githubusercontent.com/ibm-garage-cloud/developer-dashboard/master/public/data/links.json'

    // Get the Activation links
    rp({
      uri: activation,
      json: true
    }).then((data) => {
      res.json(data)
    })
      .catch((err) => {
        console.log(err)
        res.json({ error: err })
      })
  })

  app.use('/activation', router)
}
