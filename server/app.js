const express = require("express");
const app = express();
require("dotenv/config");
const { default: mongoose } = require("mongoose");
const cors = require("cors");

app.get("/", (req, res) => {
  return res.json("OK!");
});

app.use(cors({ origin: true }));
//use authentication router
const userRoute = require("./routes/auth");
app.use("/api/users", userRoute);

mongoose.connect(
  process.env.DB_STRING
  // , { useNewUrlParser: true }
);
mongoose.connection
  .once("open", () => console.log("connected"))
  .on("error", (error) => {
    console.log(`ERROR: ${error}`);
  });
app.listen(4000, () => {
  console.log("run localhost 4000");
});
