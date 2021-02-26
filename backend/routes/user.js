var express = require('express')
var mongoose = require("mongoose");

var Sign = require('../models/signIn');

var router = express.Router();

//////////// Sign-UP//////////////

router.post("/signUp", (req, res) => {
    var x = req.body;
    // console.log("ABCD");
    console.log(x);
    Sign(x).save()
        .then(() => {
            res.send(true);
        })
        .catch(() => {
            res.send(false);
        })
})

//////////// Sign-In//////////////

router.post('/signIn', (req, res) => {
    var x = req.body
    console.log(x)
    Sign.findOne({ "username": x.username, "password": x.password })
        .then((data) => {
            console.log(data._id)
            res.send(data._id.toString());
        })
        .catch(() => {
            res.send("false");
        })
})

//////////// get Watchlist //////////////

router.get('/:id', (req, res) => {
    var x = req.params.id
    console.log(x)
    Sign.findOne({ "_id": x })
        .then((data) => {
            console.log(data.stock)
            res.send(data.stock);
        })
        .catch(() => {
            res.send("false");
        })
})

//////////// Add in Watchlist//////////////

router.post('/:id', (req, res) => {
    var x = req.params.id;
    var y = req.body.s
    console.log(y)
    console.log(x)
    Sign.updateOne({ "_id": x }, { $push: { "stock": { "stockID": y } } }, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
})

//////////// delete in Watchlist //////////////

router.post('/delete/:id', (req, res) => {
    var x = req.params.id;
    var y = req.body.s
    console.log(y)
    console.log(x)
    Sign.updateOne({ "_id": x }, { $pull: { "stock": { "stockID": y } } }, function (err, result) {
        if (err) throw err;
        res.json(result);
    })
})

//////////// BUY //////////////

router.post('/buy/:id', (req, res) => {
    var x = req.params.id;
    var y = req.body
    console.log(y)
    console.log(x)
    
    var money = parseFloat(y.rate) * parseInt(y.quantity);

    Sign.findOne({ "_id": x} , function (err, result) {
        if (err) throw err;
        var left=result.cash;
        left = left - money;
        Sign.updateOne({ "_id": x }, { $set: { "cash": left } }, function (err, result) {
            if (err) throw err;
            //res.send(result);
        })
    })

    Sign.findOne({ "_id": x, "portfolio.stockID": y.stockID }, function (err, data) {

        if (!data) {
            Sign.updateOne({ "_id": x }, { $push: { "portfolio": { "stockID": y.stockID, "quantity": y.quantity, "rate": y.rate , "transactions" : {  "quantity": y.quantity, "rate": y.rate } } } }, function (err, result) {
                if (err) throw err;
                res.send(result);
            })
        }
        else {
            //console.log(data);
            Sign.findOne({ "_id": x, "portfolio.stockID": y.stockID }, function (err, data2) {
                for (var i = 0; i < data2.portfolio.length; i++) {
                    if (data2.portfolio[i].stockID == y.stockID) {
                        var r1 = data2.portfolio[i].rate;
                        var q1 = data2.portfolio[i].quantity;
                    }
                }
                var r2 = y.rate;
                var q2 = y.quantity;
                var rate;
                var quant = q1 + q2;
                if(q2>0){
                    rate = ((r1 * q1 + r2 * q2) / quant).toFixed(2);
                }
                else{
                    rate=r2;
                }
                Sign.updateOne({ "_id": x, "portfolio.stockID": y.stockID }, { $set: { "portfolio.$.quantity": quant, "portfolio.$.rate": rate } }, function (err, result) {
                    if (err) throw err;
                    res.send(result);
                })
            })

            Sign.updateOne({ "_id": x, "portfolio.stockID": y.stockID }, { $push: { "portfolio.$.transactions": { "quantity": y.quantity, "rate": y.rate } } }, function (err, result) {
                if (err) throw err;
                //res.send(result);
                console.log("updated")
            })
        }

        //res.send(data);

        if (err) throw err;
        //console.log(data)
    })

})

//////////// GET CASH DETAILS  //////////////

router.get('/cash/:id', (req, res) => {
    var x = req.params.id
    console.log(x)
    Sign.findOne({ "_id": x })
        .then((data) => {
            console.log(data.cash)
            res.json(data.cash);
        })
        .catch(() => {
            res.json("false");
        })
})

//////////// GET PORTFOLIO DETAILS  //////////////

router.get('/portfolio/:id', (req, res) => {
    var x = req.params.id
    console.log(x)
    Sign.findOne({ "_id": x })
        .then((data) => {
            //console.log(data.cash)
            res.json(data.portfolio);
        })
        .catch(() => {
            res.json("false");
        })
})

//////////// GET ALL DETAILS  //////////////

router.get('/all/:id', (req, res) => {
    var x = req.params.id
    console.log(x)
    Sign.findOne({ "_id": x })
        .then((data) => {
            //console.log(data.cash)
            res.json(data);
        })
        .catch(() => {
            res.json("false");
        })
})



module.exports = router;