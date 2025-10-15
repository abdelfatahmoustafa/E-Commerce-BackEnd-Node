import Joi from "joi";

export const addCategoryValidation = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  img: Joi.string().uri().optional(),
  description: Joi.string().max(200).optional(),
});

export const updateCategoryValidation = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
  }),
  description: Joi.string().min(5).max(255).required().messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 5 characters long",
  }),
});

export const getCategoryByIdValidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

export const deleteCategoryByIdValidation = Joi.object({
  id: Joi.string().hex().length(24).required(),
});