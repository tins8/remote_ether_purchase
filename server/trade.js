const Web3 = require('web3');
const axios = require('axios');
const EthereumTx = require('ethereumjs-tx');
const testnet = `https://rinkeby.infura.io/${process.env.INFURA_ACCESS_TOKEN}`;
const web3 = new Web3( new Web3.providers.HttpProvider(testnet) );
web3.eth.defaultAccount = process.env.WALLET_ADDRESS;

const Gdax = require('gdax');
const publicClient = new Gdax.PublicClient();
const FIVE_MINUTES = 300;

const ticker = (symbol) => {
    return publicClient.getProductTicker(symbol)
    .catch(error => {
        console.log(error);
    });
};

const historic = (symbol) => {
    return publicClient.getProductHistoricRates(symbol, {granularity: FIVE_MINUTES})
    .catch(error => {
        console.log(error);
    });
};

const getCurrentGasPrices = async () => {
    let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
    let prices = {
      low: response.data.safeLow / 10,
      medium: response.data.average / 10,
      high: response.data.fast / 10
    };
    return prices;
  };

const getBalance = async () => {
    let balanceWei = await web3.eth.getBalance(web3.eth.defaultAccount);
    let balance = await web3.utils.fromWei(balanceWei, 'ether');
    return balance;
};

const sendEther = async (sendAmount) => {
    let nonce = await web3.eth.getTransactionCount(web3.eth.defaultAccount);
    let gasPrices = await getCurrentGasPrices();
    let sendValue = web3.utils.toWei(sendAmount.toString(), 'ether');
    let details = {
        "to": process.env.DESTINATION_WALLET_ADDRESS,
        "value": web3.utils.toHex( sendValue ),
        "gas": 21000,
        "gasPrice": gasPrices.low * 1000000000, // converts the gwei price to wei
        "nonce": nonce,
        "chainId": 4 // EIP 155 chainId - rinkeby: 4
      };
    
    const transaction = new EthereumTx(details);
    transaction.sign( Buffer.from(process.env.WALLET_PRIVATE_KEY, 'hex') )
    const serializedTransaction = transaction.serialize();
    const transactionId = web3.eth.sendSignedTransaction('0x' + serializedTransaction.toString('hex') );
    
    return transactionId;
  };

module.exports = {
    ticker: ticker,
    sendEther: sendEther,
    getBalance: getBalance,
    historic: historic
};

