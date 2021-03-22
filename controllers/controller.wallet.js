const ObjectId = require("mongoose").Types.ObjectId;
const Wallet = require("../models/model.wallet");

exports.updateWallet = function (id, amount) {
  const filter = { _id: ObjectId(id) };

  // For the cases we are subtracting from an account
  // we add the filter to control there is balance enough
  if (amount < 0) filter.balance = { $gte: Math.abs(amount) };

  try {
    return Wallet.findOneAndUpdate(
      filter,
      {
        $set: { updatedAt: Date.now() },
        $inc: { balance: amount },
      },
      { new: true }
    );
  } catch (error) {}
};

exports.getWalletsById = function (req, res) {
  const { id } = req.params;

  const filter = { owner: ObjectId(id) };

  Wallet.find(filter, (errors, wallet) => {
    if (errors) {
      // We should manage the error in this block. For the example, we just return a message
      return res.status(422).send({
        message: "An error occurred finding the wallet",
        details: errors,
      });
    }

    return res.status(200).send({
      data: wallet,
    });
  });
};

exports.checkWallet = function (walletId) {
  try {
    const filter = { _id: ObjectId(walletId) };

    return Wallet.find(filter, (errors, wallet) => {});
  } catch (error) {
    return Promise.reject();
  }
};
