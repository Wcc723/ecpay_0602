var express = require('express');
var router = express.Router();
const ecpay_payment = require('ecpay_aio_nodejs');
require('dotenv').config();
const { MERCHANTID, HASHKEY, HASHIV, HOST } = process.env;

// 設定檔
const options = {
  OperationMode: 'Test', // Test or Production
  MercProfile: {
    MerchantID: MERCHANTID,
    HashKey: HASHKEY,
    HashIV: HASHIV,
  },
  IgnorePayment: [
    //    "Credit",
    //    "WebATM",
    //    "ATM",
    //    "CVS",
    //    "BARCODE",
    //    "AndroidPay"
  ],
  IsProjectContractor: false,
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})
  .get('/checkout', function(req, res, next) {
    const MerchantTradeDate = new Date().toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const MerchantTradeNo = `1234567${new Date().getTime()}`;
    const base_param = {
      MerchantTradeNo, //請帶20碼uid, ex: f0a0d7e9fae1bb72bc93
      MerchantTradeDate, //ex: 2017/02/13 15:45:30
      TotalAmount: '100',
      TradeDesc: '測試交易描述',
      ItemName: '測試商品等',
      ReturnURL: `${HOST}/return`,
      ClientBackURL: `${HOST}/index.html`,
    };
    const create = new ecpay_payment(options);
    const html = create.payment_client.aio_check_out_all(base_param);
    console.log(html);
    

  res.render('checkout', { title: 'Express', html });
})
.post('/return', function(req, res, next) {
  console.log('req.body:', req.body);
  const {CheckMacValue} = req.body;
  const data = { ...req.body }; // 原始資料
  delete data.CheckMacValue;
  const create = new ecpay_payment(options);
  const checkValue = create.payment_client.helper.gen_chk_mac_value(data);
  // 加入 HsahKey / HashIV 的解密資料

  console.log('CheckMacValue', CheckMacValue, checkValue);
  console.log('CheckMacValue', CheckMacValue === checkValue);
  res.send('1|OK');
});

module.exports = router;
