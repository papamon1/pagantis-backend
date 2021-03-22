const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true },
    active: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    password: { type: String, required: true },
    avatar: { type: String, required: false },       
    wallets: [{  type: Schema.Types.ObjectId, ref: 'Wallet' }],    
});


module.exports = mongoose.model('User', userSchema );