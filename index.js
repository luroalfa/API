// Required libraries
const express = require("express");
const bodyParser = require("body-parser");
const productsRouter = require("./api/recursos/products/products.routes");
const winston = require("winston");

//********************* WINSTON **********************

const incluirFecha = winston.format((info) => {
  info.message = `${new Date().getDay()} ${info.message}`
  return info;
});


const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({
      level: "info",
      handleExceptions: true,
      format: winston.format.combine(
        incluirFecha(),
        winston.format.simple()
      ),
      maxsize: 5120000, //5mb
      maxFiles: 5,
      filename: `${__dirname}/logs-de-aplicacion.log`
    })
  ]
});

logger.info("Info");
logger.error("Error");
logger.warn("Warn");
logger.debug("Debug");

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