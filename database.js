const uuid = require("uuid");

// DATABASE
const products = [
  {
    id: uuid.v4(),
    title: "Macbook pro 13 inches",
    price: 1300,
    coin: "USD"
  },
  {
    id: uuid.v4(),
    title: "Mouse led",
    price: 30,
    coin: "USD"
  },
  {
    id: uuid.v4(),
    title: "Microphone BOSE",
    price: 100,
    coin: "USD"
  }
]


module.exports = {
  products
}