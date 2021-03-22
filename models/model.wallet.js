const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const walletSchema = new Schema({

    name: { type: String, required: true },
    balance: { type: Number, required: true },
    updatedAt: { type: Date, default: Date.now },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
       
});


module.exports = mongoose.model('Wallet', walletSchema );