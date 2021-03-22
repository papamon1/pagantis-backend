const ObjectId = require("mongoose").Types.ObjectId;
const User = require('../models/model.user');
const Wallet = require('../models/model.wallet');
const Utils = require('../utils');

exports.doLogin = function (req, res) {
    
    const loginData = req.body;

    const user = new User(loginData)

    const filter = { ...loginData, active:true };

    User.find(filter)
    .populate({path: 'wallets', options: {sort: {name: 1}}})
    .exec((errors, transfer) =>{
        
        Utils.handleResults(errors, transfer, res, "No user was found matching the mail/password provided")

    }  

)};


exports.listUsers = function (req, res) {

    User.find((errors, users)=>{
        
        Utils.handleResults(errors, users, res)

    })

}

exports.finUserById = function (req, res) {

    const {id} = req.params

    User.findById(id)
    .populate({path: 'wallets', options: {sort: {name: 1}}})
    .exec((errors, user)=>{
        
        Utils.handleResults(errors, user, res)

    })

}