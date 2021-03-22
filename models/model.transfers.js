const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transferSchema = new Schema({

    createdAt: { type: Date, default: Date.now, required: true },
    walletFrom: { type: Schema.Types.ObjectId, ref: 'Wallet' },
    walletTo: { type: Schema.Types.ObjectId, ref: 'Wallet' },
    executedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number, required: true },
       
});

transferSchema.post('save', function(doc) {
    doc.execPopulate('executedBy', 'firstName lastName')
});


module.exports = mongoose.model('Transfer', transferSchema );