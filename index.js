let express = require("express");
let bodyparser = require("body-parser");
let router = require("./router/router");
let mongoose = require("mongoose");
let cors = require("cors");
let app = express();
app.use(cors());
app.use(bodyparser.json());
require("dotenv").config();

const { MONGODB } = process.env;

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
})
.then(()=>console.log('Connected to db'))
.catch((err)=> console.log("DB connection error",err));



app.use("/", router);



app.get("/", function (req, res) {
  res.send("Book My Show");
  
});
app.listen(process.env.PORT ||8000)
