const { logger } = require('./config/logger')
const { kafka } = require('./connections/kakfa-connect')
const { filterTransaction } = require('./services/filter-transaction-service')

const consumer = kafka.consumer({ groupId: 'transaction' })

const main = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'blockchain' })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            const transactionHashes = JSON.parse(message.value).transactions
            filterTransaction(transactionHashes)

            logger.info('New block formed with ' + transactionHashes.length() + ' transactions')
            console.log({
                key: message.key.toString(),
                //value: transactionHashes
            })
        },
    })
}

main()



