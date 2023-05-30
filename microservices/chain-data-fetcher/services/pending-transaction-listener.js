const pendingTransactionListener = async (web3, kafka) => {
    const producer = kafka.producer()
    await producer.connect()

    var subscription = web3.eth.subscribe('pendingTransactions', async (error, result) => {
        if (!error) {
            await producer.send({
                topic: 'polygon-pos-pending-transactions',
                messages: [
                    { value: result.toString() },
                ],
            })
            //console.log(result)
            return
        }
        console.log("Error form pending transaction listener subscription: " + error)
        logger.error("Pending Transaction Listener subscription get into some error: " + error)
        return
    })
        .on("error", async (err) => {
            await producer.disconnect()
            console.error
            logger.error("Pending Transaction Listener subscription get into some error: " + err)

            // unsubscribes the subscription
            subscription.unsubscribe(function (error, success) {
                if (success) {
                    console.log('Successfully unsubscribed!');
                }
            });
        });
}

module.exports = {
    pendingTransactionListener
}