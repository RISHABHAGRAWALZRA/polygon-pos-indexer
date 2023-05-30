const express = require("express")
const { transaction } = require('./model/transaction')
const { pendingTransaction } = require('./model/pending-transaction')

var app = express()

app.get("/:hash", async (req, res, next) => {
    const hash = req.params.hash
    if (!(/^0x([A-Fa-f0-9]{64})$/.test(hash))) {
        res.status(400).json({
            success: false,
            message: "Please check the transaction hash"
        })
        return
    }
    //console.log(hash)
    var result
    result = await transaction.findOne({ transactionHash: hash }).exec()
    if (result) {
        res.status(200).json({
            success: true,
            status: result.status
        })
        return
    } else {
        result = await pendingTransaction.findOne({ transactionHash: hash }).exec()
        if (result) {
            res.status(200).json({
                success: true,
                status: "pending"
            })
            return
        }
    }

    res.status(200).json({
        success: true,
        status: "queued"
    })
});

app.listen(7000, () => {
    console.log("Server running on port 7000");
});