var express = require('express');
var router = express.Router();
var axios = require("axios");


var API_KEY = process.env.API_KEY

/* GET users listing. */
router.post('/newOrder', async function(req, res, next) {
  let data = req.body
  let response = await axios.post(
    'https://sandbox-merchant.revolut.com/api/1.0/orders', 
    data, 
    {
    headers:{
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json; charset=utf-8'
    },
}
  )
  res.json(response.data);
});

module.exports = router;
