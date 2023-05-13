const express = require("express");
require("./db/mongoose");
const Account = require("./models/account");
const path = require("path");
const app = express();

app.use(express.json());
const publicDirectoryPath = path.join(__dirname);
console.log("__dirname:", __dirname);
app.use(express.static(publicDirectoryPath));
const port = process.env.PORT || 3002;

app.post("/signinUser", async (req, res) => {
  const { email, password } = req.body;
  const account = await Account.findOne({ email });

  if (!account) {
    res.status(404).send();
  } else {
    console.log("account:", account);
    if (account.email === email && account.password === password) {
      console.log("welcome!");
      res.status(200).json(account);
    } else {
      console.log("wrong");
      res.status(404).send();
    }
  }
});

app.post("/createUser", async (req, res) => {
  console.log("123123");
  console.log("I am req.body:", req.body);
  try {
    const { email, password, repassword } = req.body;

    const newAccount = new Account({
      email: email,
      password: password,
      repassword: repassword,
    });

    console.log("you didnt store data!");
    console.log(newAccount);
    await newAccount.save();
    console.log("you stored data!");
    res.status(201).json(newAccount);
  } catch (err) {
    console.log("error!");
    console.error(err);
    res.status(500).json({ error: "Error!" });
  }
});

app.get("/", (req, res) => {
  console.log("##");
  window.location.href = "./index.html";
});

app.listen(port, () => {
  console.log("Server is running up on port 3002.");
});
