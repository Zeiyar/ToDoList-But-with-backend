const Joi = require("joi");

const TodoValidation = Joi.object({
    note: Joi.string().min(3).max(100).required(),
    category: Joi.string().min(1).max(100).optional(),
    done: Joi.boolean().optional(),
}).unknown(false);

module.exports = (req, res, next) => {
  const { error } = TodoValidation.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};