// Required libraries
const Joi = require("@hapi/joi");

//BluePrint-Joi
const blueprintProducto = Joi.object({
  title: Joi.string().max(100).required(),
  price: Joi.number().positive().precision(2).required(),
  coin: Joi.string().length(3).uppercase(),
});

// Export Middleware-Joi
module.exports = (req, res, next) => {
  let result = blueprintProducto.validate(req.body, { abortEarly: false, convert: false });
  if (result.error === undefined) {
    next();
    return
  } else {
    console.log(`The mistake is: ${result.error.details[0].message}`)
    res.status(400).send("...Error en validar producto");
  }
};
