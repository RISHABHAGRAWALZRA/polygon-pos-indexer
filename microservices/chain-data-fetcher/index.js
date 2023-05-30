const config = require('./config/index')
const Web3 = require('web3');
const { kafka } = require('./connections/kafka-connect');
const { newBlockTransactionListner } = require('./services/new-block-transaction-listener');
const { pendingTransactionListener } = require('./services/pending-transaction-listener');

const web3 = new Web3(config.ALCHEMY_RPC_NODE_URL);

const main = async () => {

    newBlockTransactionListner(web3, kafka)
    pendingTransactionListener(web3, kafka)

}

main()
