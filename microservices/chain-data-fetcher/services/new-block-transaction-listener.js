const { logger } = require('../config/logger');



const newBlockTransactionListner = async (web3, kafka) => {

    const producer = kafka.producer()
    await producer.connect()

    var subscription = web3.eth.subscribe('newBlockHeaders', async function (error, result) {
        if (!error) {
            const blockNumber = result.number
            const block = await web3.eth.getBlock(blockNumber)
            await producer.send({
                topic: 'polygon-pos-new-block-transactions',
                messages: [
                    { key: blockNumber.toString(), value: JSON.stringify({ transactions: block.transactions }) },
                ],
            })
            logger.info("New Block Transactions from " + blockNumber + "block")
            console.log("New Upcoming....  " + blockNumber);
            return
        }

        console.error(error)
        return
    })
        .on("connected", function (subscriptionId) {
            console.log("onConnected SubscriptionID is: " + subscriptionId);
        })
        .on("error", async (err) => {
            await producer.disconnect()
            console.error
            logger.error("New Block Transaction Listener subscription get into some error: " + err)

            // unsubscribes the subscription
            subscription.unsubscribe(function (error, success) {
                if (success) {
                    console.log('Successfully unsubscribed!');
                }
            });
        });

}

module.exports = {
    newBlockTransactionListner,
}