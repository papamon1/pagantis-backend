const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB Connected!"))
  .catch((err) => console.log(err));

const app = express();
const server = require("http").createServer(app);

const userRoute = require("./routes/route.user");
const walletRoute = require("./routes/route.wallet");
const transferRoute = require("./routes/router.transfer");

app.use(bodyParser.json());

var whitelist = ["http://localhost:8081"];
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true,
};

var cors = require("cors");
app.use(cors(corsOptions));

app.use("/api/v1/users", userRoute);
app.use("/api/v1/transfers", transferRoute);
app.use("/api/v1/wallets", walletRoute);

const PORT = process.env.PORT || 3001;

server.listen(PORT, function () {
  console.log("App is running on port: " + PORT);
});
