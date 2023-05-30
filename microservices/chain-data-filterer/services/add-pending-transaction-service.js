const { logger } = require("../config/logger")
const { pendingTransaction } = require("../model/pending-transaction")


module.exports.addPendingTransaction = async (hash) => {
    const trxn = await pendingTransaction.create({ transactionHash: hash })
    if (trxn) {
        //console.log("Successfully added for " + hash)
        logger.info("Pending transaction successfully added for " + hash)
    } else {
        console.log("Pending transaction unsuccessfull to add for " + hash)
        logger.info("Pending transaction unsuccessfull to add for " + hash)
    }
}