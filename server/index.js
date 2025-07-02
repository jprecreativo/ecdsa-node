const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "c7d0fd41a4737fb856b50f0e6d5e9d5cf031d18c": 100,
  "2fd55c547ddfccb22592d0e822833b9e634104cb": 50,
  "2aa4e4ed4f1a19da506da0657ef0d271baf609bc": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  console.log(address);
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
