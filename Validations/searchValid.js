const joi = require("joi");

const researchValidation = joi.object({
    term : joi.string().min(1).max(20).required(),
    page : joi.number().min(1).default(1),   
    limit : joi.number().min(1).max(50).default(5),
    sort: joi.string().valid("createdAt", "note", "category").default("createdAt"),
});

module.exports = (req, res, next) => {
  const { error, value } = researchValidation.validate(req.query);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.query = value;
  next();
};