// Required libraries
const express = require("express");
const bodyParser = require("body-parser");
const productsRouter = require("./api/recursos/products/products.routes");

//******************** Called function ********************
const app = express();

app.use(bodyParser.json());
app.use("/products", productsRouter);

// ******************* ROUTE
//******************** Respond with "API-APPDELANTE" when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.send("API-APPDELANTE");
});

//******************** Our server listened on port 3000
app.listen(3000, () => {
  console.log("Listening on port 3000");
});