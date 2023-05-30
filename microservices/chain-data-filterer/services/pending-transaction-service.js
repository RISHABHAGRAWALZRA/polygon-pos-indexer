const { addPendingTransaction } = require("./add-pending-transaction-service")


const pendingTransactionService = async (kafka) => {
    const consumer = kafka.consumer({ groupId: 'polygon-pos-pending-transactions' })
    await consumer.connect()
    await consumer.subscribe({ topic: 'polygon-pos-pending-transactions' })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const transactionHash = message.value.toString()
            addPendingTransaction(transactionHash)
        },
    })
}

module.exports = { pendingTransactionService }