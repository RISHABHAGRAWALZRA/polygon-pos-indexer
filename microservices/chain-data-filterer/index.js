const { kafka } = require('./connections/kakfa-connect')
const { newBlockTransactionService } = require('./services/new-block-transaction-service')
const { pendingTransactionService } = require('./services/pending-transaction-service')

const main = async () => {

    newBlockTransactionService(kafka)
    pendingTransactionService(kafka)
}

main()



