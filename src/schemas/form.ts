import Joi from "joi";

// Form validation schemas
const defaultSchema = {
  date: Joi.string()
    .required()
    .error(() => new Error("Please select a valid date")),
  value: Joi.alternatives(Joi.string().regex(/^\d+(?:[.,]\d{1,2})?$/), Joi.number())
    .required()
    .error(() => new Error("Please enter a valid value")),
  name: Joi.string()
    .required()
    .error(() => new Error("Please enter a valid name")),
};

const incomeSchema = Joi.object({
  ...defaultSchema,
});

const expenseSchema = Joi.object({
  ...defaultSchema,
  category: Joi.string()
    .required()
    .error(() => new Error("Please select a category")),
});

const categorySchema = Joi.object({
  name: Joi.string()
    .required()
    .error(() => new Error("Please enter a valid name")),
  limitValue: Joi.number()
    .precision(2)
    .required()
    .error(() => new Error("Please enter a valid value")),
  note: Joi.string()
    .optional()
    .allow("")
    .error(() => new Error("Please enter a note")),
});

const authSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: false })
    .required()
    .error(() => new Error("Please enter a valid email address")),
  password: Joi.string()
    .required()
    .error(() => new Error("Please enter a valid password")),
});

export { incomeSchema, expenseSchema, categorySchema, authSchema };
