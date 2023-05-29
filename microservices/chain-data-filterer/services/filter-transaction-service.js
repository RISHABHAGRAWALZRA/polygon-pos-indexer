const { transaction } = require('../model/transaction')
const config = require('../config/index')

const Web3 = require('web3')
const web3 = new Web3(config.ALCHEMY_RPC_NODE_URL);



module.exports.filterTransaction = async (hashes) => {
    hashes.map(async (hash) => {
        //console.log(hash)
        const result = await web3.eth.getTransactionReceipt(hash)

        const data = {
            transactionHash: result.transactionHash,
            status: result ? "confirmed" : "failed",
            blockHash: result.blockHash,
            blockNumber: result.blockNumber,
            fromAddress: result.from,
            toAddress: result.to || null,
        }


        //console.log(data)

        const trxn = await transaction.create(data);
        //console.log(trxn);
        if (trxn) {
            console.log("Successfully added for " + hash)
        } else {
            console.log("Unsuccessfull to add for " + hash)
        }
    })
}
