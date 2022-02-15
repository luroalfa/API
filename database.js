// Required libraries
const uuid = require("uuid");

// DATABASE
const products = [
  {
    // id: uuid.v4(),
    id: "123",
    title: "Macbook pro 13 inches",
    price: 1300,
    coin: "USD"
  },
  {
    // id: uuid.v4(),
    id: "456",
    title: "Mouse led",
    price: 30,
    coin: "USD"
  },
  {
    // id: uuid.v4(),
    id: "789",
    title: "Microphone BOSE",
    price: 100,
    coin: "USD"
  }
]

// Export module
module.exports = {
  products
}