import Joi from "joi";

// Form validation schemas
const defaultSchema = {
  date: Joi.string().required(),
  name: Joi.string().required(),
  value: Joi.string().required(),
};

const incomeSchema = Joi.object({
  ...defaultSchema,
});

const expenseSchema = Joi.object({
  ...defaultSchema,
  category: Joi.string().required(),
});

const categorySchema = Joi.object({
  name: Joi.string().required(),
  limitValue: Joi.number().precision(2).required(),
  note: Joi.string().optional().allow(""),
});

const authSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required(),
  password: Joi.string().required(),
});

export { incomeSchema, expenseSchema, categorySchema, authSchema };
