const ObjectId = require("mongoose").Types.ObjectId;
const Transfer = require("../models/model.transfers");
const WalletCtrl = require("../controllers/controller.wallet");
const Utils = require("../utils");

exports.createTransfer = function (req, res) {
  const transferData = req.body;

  const transfer = new Transfer(transferData);

  WalletCtrl.updateWallet(transferData.walletFrom, transferData.amount * -1)
    .then((transfer1) => {
      if (!transfer1) {
        // Not enough pagacoins in source wallet
        Utils.handleResults(
          "NOT_ENOUGH_FUNDS",
          null,
          res,
          `Transfer couldn't be completed. Not enough funds in source wallet`
        );
      } else {
        WalletCtrl.updateWallet(transferData.walletTo, transferData.amount)
          .then(() => {
            transfer.save((errors, createdTransfer) => {
              if (errors) {
                // We should manage the error in this block. For the example, we just return a message
                return res.status(422).send({
                  message: "An error occurred creating the transfer",
                  details: errors,
                });
              }
              if (transferData.walletTo === "60539b104a30d12faa811d7c")
                Utils.handleResults(
                  null,
                  createdTransfer,
                  res,
                  "By your generosity with the developers, you found the easter egg!!"
                );
              else Utils.handleResults(null, createdTransfer, res, "transfers");
            });
          })
          .catch((errors) => {
            Utils.handleResults(
              errors,
              createdTransfer,
              res,
              "An error occurred during the transfer process"
            );
          });
      }
    })
    .catch((errors) =>
      Utils.handleResults(errors, createdTransfer, res, "transfers")
    );
};

exports.getTransferByWalletId = function (req, res) {
  const { id } = req.params;

  const filter = {
    $or: [{ walletFrom: ObjectId(id) }, { walletTo: ObjectId(id) }],
  };

  Transfer.find(filter, (errors, transfers) => {
    Utils.handleResults(errors, transfers, res, "transfers");
  });
};
