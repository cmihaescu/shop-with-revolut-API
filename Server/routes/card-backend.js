var express = require('express');
var router = express.Router();
var axios = require("axios");


var API_KEY_SANDBOX = process.env.API_KEY_SANDBOX
var API_KEY_LIVE = process.env.API_KEY_LIVE

/* GET users listing. */
router.post('/newOrderSandbox', async function(req, res, next) {
  let data = req.body
  let response = await axios.post(
    'https://sandbox-merchant.revolut.com/api/1.0/orders', 
    data, 
    {
    headers:{
      Authorization: `Bearer ${API_KEY_SANDBOX}`,
      'Content-Type': 'application/json; charset=utf-8'
    },
}
  )
  res.json(response.data);
});

router.post('/newOrderLive', async function(req, res, next) {
  let data = req.body
  let response = await axios.post(
    'https://merchant.revolut.com/api/1.0/orders', 
    data, 
    {
    headers:{
      Authorization: `Bearer ${API_KEY_LIVE}`,
      'Content-Type': 'application/json; charset=utf-8'
    },
}
  )
  res.json(response.data);
});

module.exports = router;
