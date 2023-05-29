const { Schema } = require('mongoose');
const { DB } = require('../connections/mongoDB-connect')

const transactionSchema = new Schema({
    transactionHash: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    blockHash: {
        type: String,
        required: true,
    },
    blockNumber: {
        type: Number,
        required: true
    },
    fromAddress: {
        type: String,
        required: true,
    },
    toAddress: {
        type: String,
    },
});

module.exports = { transaction: DB.model('Transaction', transactionSchema) };
