// Required libraries
const express = require("express");
const _ = require("underscore");
const products = require("./../../../database").products;
const productsRouter = express.Router();
const uuid = require("uuid");
const Joi = require("joi");


//Usando Joi 

const blueprintProducto = Joi.object().keys({
  title: Joi.string().max(100).required(),
  price: Joi.number().positive().precision(2).required,
  coin: Joi.string().length(3).uppercase(),

});

// middleware
const validateProduct = (req, res, next) => {
  let result = Joi.ValidationError(nuevoProducto, blueprintProducto, { abortEarly: false, convert: false });
  console.log(result);
  if (result.error === null) {
    next();
    return
  } else {
    res.status(400).send("...Error en validar producto");
  }
};


// ******************** Route of the GET and POST method from the root ********************
productsRouter.get("/", (req, res) => {
  res.json(products);
});

productsRouter.post("/", (req, res) => {//*Post, is used for create new products
  let nuevoProducto = req.body;




  if (!nuevoProducto || !nuevoProducto.price || !nuevoProducto.title) {
    res.status(400).send("Tu producto debe especificar un titulo, precio y moneda.");
    return
  }
  nuevoProducto.id = uuid.v4();
  products.push(nuevoProducto);
  res.status(201).json(products);  // Status 201, is created successfully
});


// ******************** Route of the GET, PUT AND DELETE method from the id ********************
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
productsRouter.delete("/:id", (req, res) => {
  let indiceABorrar = _.findIndex(products, product => product.id == req.params.id);
  if (indiceABorrar === -1) {
    res.status(404).send(`The product with id: [${req.params.id}] don't exist`);
    return
  }

  let borrado = products.splice(indiceABorrar, 1);
  res.json(borrado);

});


// ******************** Export middleware Router ********************
module.exports = productsRouter;