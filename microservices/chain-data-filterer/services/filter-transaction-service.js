const { transaction } = require('../model/transaction')
const { pendingTransaction } = require('../model/pending-transaction');

const config = require('../config/index')

const Web3 = require('web3');
const { logger } = require('../config/logger');
const web3 = new Web3(config.GET_BLOCK_RPC_NODE_URL);



module.exports.filterTransaction = async (hashes) => {

    const res = await pendingTransaction.deleteMany({ transactionHash: { $in: hashes } })
    if (res) {
        //console.log("Removed confirmed transaaction from pending transaction list")
        logger.info("Removed confirmed transaaction from pending transaction list")
    } else {
        consol.log('Unable to remove')
    }

    hashes.map(async (hash) => {
        //console.log(hash)
        const result = await web3.eth.getTransactionReceipt(hash)

        if (result) {
            const data = {
                transactionHash: result.transactionHash,
                status: result.status ? "confirmed" : "failed",
                blockHash: result.blockHash,
                blockNumber: result.blockNumber,
                fromAddress: result.from,
                toAddress: result.to || null,
            }


            const trxn = await transaction.create(data);
            //console.log(trxn);
            if (trxn) {
                //console.log("Successfully added for " + hash)
                logger.info("New block transaction successfully added for " + hash)
            } else {
                console.log("New block transaction unsuccessfull to add for " + hash)
                logger.info("New block transaction unsuccessfull to add for " + hash)
            }

        } else {
            logger.error("Get no receipt for " + hash + 'transaction')
            console.log("Get no receipt for " + hash + 'transaction')
        }
    })
}
