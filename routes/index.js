var express = require('express');
var router = express.Router();
const Web3 = require('web3');
const Tx = require('ethereumjs-tx')

const contract = require('./contract/Tipjar')

const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

web3.eth.defaultAccount = web3.eth.accounts[0];

const TestContract = new web3.eth.Contract(contract.CONTRACT_ABI, contract.CONTRACT_ADDRESS);

const account = "0xaf027fe57EEce4012d417cc675B08BD5646FFe6B";

const privateKey = new Buffer('b9f4f4ab7209b4e78c5a0c6a2dbcffb889c66f36aa16204c8dc6e08ac01b2ffb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'a' });
});

router.post('/send', function(req, res, next) {
  var rawTx = {
    nonce: '0x00',
    gasPrice: '0x09184e72a000',
    gasLimit: '0x2710',
    to: web3.contract.CONTRACT_ADDRESS,
    value: '0x00',
    data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057'
  }
  
  var tx = new Tx(rawTx);
  tx.sign(web3.privateKey);
  
  var serializedTx = tx.serialize();
  
  web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
  .on('receipt', console.log);


});

module.exports = {
	  router,
    TestContract,
    account,
    privateKey,
    contract
}
