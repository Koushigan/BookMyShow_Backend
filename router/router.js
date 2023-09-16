const { response } = require("express");
let express = require("express");
let router = express.Router();
let User = require("../schema/user");
let session = require("express-session");

var cookieParser = require("cookie-parser");
router.use(cookieParser());
router.use(
  session({
    secret: "",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 100 * 60 * 60 * 24 },
  })
);

router.post("/bookingblack", (req, res) => {
  console.log(JSON.stringify(req.body));
  res.send(req.body);
  console.log(req.session.username);
});
router.post("/bookingbhediya", (req, res) => {
  console.log(JSON.stringify(req.body));
  res.send(req.body);
});

router.post("/user", async (req, res) => {
  const user = new User(req.body);
  req.session.username = user.username;
  req.session.password = user.password;
  await user.save();
  res.send(user);
});
router.post("/login", async (req, res) => {
  const user = req.body;
  req.session.username = user.username;
  req.session.password = user.password;
  User.findOne(
    { username: user.username, password: user.password },
    function (err, obj) {
      if (obj == null) {
        res.send("Wrong Username or Password");
      } else {
        res.send("Logging in");
      }
    }
  );
});

router.post("/check", async (req, res) => {
  let user = await User.findOne({
    username: req.session.username,
    password: req.session.password,
  });
  if (user == null) {
    res.send("Login or SignUp");
  }

  if (user) {
    res.send("");
  }
});

module.exports = router;