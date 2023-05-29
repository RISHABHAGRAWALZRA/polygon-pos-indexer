const config = require('./config/index')
const { Kafka } = require('kafkajs')
const Web3 = require('web3');

const web3 = new Web3(config.ALCHEMY_RPC_NODE_URL);

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['kafka:9092'],
})

const producer = kafka.producer()

const main = async () => {
    await producer.connect()


    var subscription = web3.eth.subscribe('newBlockHeaders', async function (error, result) {
        if (!error) {
            const blockNumber = result.number
            const block = await web3.eth.getBlock(result.number)
            await producer.send({
                topic: 'blockchain',
                messages: [
                    { key: blockNumber.toString(), value: JSON.stringify({ transactions: block.transactions }) },
                ],
            })
            console.log("New Upcoming....  " + blockNumber);
            return;
        }

        console.error(error);
    })
        .on("connected", function (subscriptionId) {
            console.log(subscriptionId);
        })
        .on("data", function (blockHeader) {
            console.log(blockHeader);
        })
        .on("error", async () => {
            await producer.disconnect()
            console.error
        });


    // unsubscribes the subscription
    subscription.unsubscribe(function (error, success) {
        if (success) {
            console.log('Successfully unsubscribed!');
        }
    });

}

main()
