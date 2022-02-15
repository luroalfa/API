// Required libraries
const express = require("express");
const _ = require("underscore");
const products = require("./../../../database").products;
const productsRouter = express.Router();
const uuid = require("uuid");
const validateProduct = require("./products.validate");




// ******************** Route of the GET and POST method from the root ********************
productsRouter.get("/", (req, res) => {
  res.json(products);
});

productsRouter.post("/", validateProduct, (req, res) => {//*Post, is used for create new product
  let nuevoProducto = req.body;
  nuevoProducto.id = uuid.v4();
  products.push(nuevoProducto);
  console.log("El producto se agregó correctamente");
  res.status(201).send(`El producto ${nuevoProducto.title} se agregó correctamente.`);  // Status 201, is created successfully
});


// ******************** Route of the GET, PUT AND DELETE method from the id ********************
// Method Get
productsRouter.get("/:id", (req, res) => {
  for (let product of products) {
    if (product.id == req.params.id) {
      res.json(product);
      break;
    }
  }
  // Not found
  res.status(404).send(`The product with id [${req.params.id}] does not exist`);
});
// Method Put
productsRouter.put("/:id", (req, res) => {
  let id = req.params.id;
  let reemplazoProducto = req.body;
  if (!reemplazoProducto || !reemplazoProducto.price || !reemplazoProducto.title) {
    res.status(400).send("Tu producto debe especificar un titulo, precio y moneda.");
    return
  }
  let indice = _.findIndex(products, product => product.id == id);
  if (indice !== -1) {
    reemplazoProducto.id = id;
    products[indice] = reemplazoProducto;
    res.status(200).json(reemplazoProducto);
  } else {
    res.status(404).send("El producto no existe.");
  }
});
// Method Delete
productsRouter.delete("/:id", (req, res) => {
  let indiceABorrar = _.findIndex(products, product => product.id == req.params.id);
  if (indiceABorrar === -1) {
    res.status(404).send(`The product with id: [${req.params.id}] don't exist`);
    return
  }
  let borrado = products.splice(indiceABorrar, 1);
  res.send(`El producto ${borrado[0].title} con id: [${req.params.id}], fue eliminado correctamente.`);
});


// ******************** Export middleware Router ********************
module.exports = productsRouter;