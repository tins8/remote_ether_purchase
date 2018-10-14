const config = require('./config.js');
const express = require('express');
const router = express.Router();
const trade = require('./trade.js');
const BUY_AMOUNT = 5.00;

const routes = () => {
    router.route('/b')
    .get((req, res, next) => {
        trade.ticker('BTC-USD')
        .then( p => {
            res.status(200).send({ response : p.price });
        });
    });
    router.route('/e')
    .get((req, res, next) => {
        trade.ticker('ETH-USD')
        .then( p => {
            res.status(200).send({ response : p.price });
        });
    });
    router.route('/balance')
    .get((req, res, next) => {
        trade.getBalance()
        .then( b => {
            res.status(200).send({ response : b });
        });
    });

    router.route('/buy')
    .get((req, res, next) => {
        trade.ticker('ETH-USD')
        .then( p => {
            let etherAmount = BUY_AMOUNT/p.price;
            trade.sendEther(etherAmount)
            .then((t) => {
                res.status(200).send({ response : t });
            });
        })
    });
    router.route('/historic')
    .get((req, res, next) => {
        trade.historic('ETH-USD')
        .then( data => {
            res.status(200).send({ response : data });
        })
    });
    return router;
};

module.exports = routes;