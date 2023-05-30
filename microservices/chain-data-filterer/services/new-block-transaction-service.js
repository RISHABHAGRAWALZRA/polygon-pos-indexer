const { logger } = require("../config/logger")
const { filterTransaction } = require("./filter-transaction-service")


const newBlockTransactionService = async (kafka) => {
    const consumer = kafka.consumer({ groupId: 'polygon-pos-new-block-transactions' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'polygon-pos-new-block-transactions' })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            const transactionHashes = JSON.parse(message.value).transactions
            filterTransaction(transactionHashes)

            logger.info('New block formed with ' + transactionHashes.length + ' transactions')
            console.log({
                key: message.key.toString(),
                //value: transactionHashes
            })
        },
    })
}

module.exports = { newBlockTransactionService }