const { Schema } = require('mongoose');
const { DB } = require('../connections/mongoDB-connect')

const pendingTransactionSchema = new Schema({
    transactionHash: {
        type: String,
        required: true,
        index: true,
        unique: true,
    }
});

module.exports = { pendingTransaction: DB.model('pending-transaction', pendingTransactionSchema) };
