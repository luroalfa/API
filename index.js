// Required libraries
const express = require("express");
const bodyParser = require("body-parser");
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

// Called function
const app = express();
app.use(bodyParser.json());

// ROUTES
// First route
app.get('/', (req, res) => {
  res.send("API-APPDELANTE");
});
// Second route
app.route("/products")
  .get((req, res) => {
    res.json(products);
  })
  .post((req, res) => {//*Post, is used for create new products
    let nuevoProducto = req.body;
    if (!nuevoProducto || !nuevoProducto.price || !nuevoProducto.title) {
      res.status(400).send("Tu producto debe especificar un titulo, precio y moneda.");
      return
    }
    nuevoProducto.id = uuid.v4();
    products.push(nuevoProducto);
    res.status(201).json(products);  // Status 201, is created successfully
  });

// third route
app.get("/products/:id", (req, res) => {
  for (let product of products) {
    if (product.id == req.params.id) {
      res.json(product);
      break;
    }
  }
  // Not found
  res.status(404).send(`The product with id [${req.params.id}] does not exist`);
});











// Our server listened on port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
});