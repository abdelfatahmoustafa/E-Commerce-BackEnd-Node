import Joi from "joi";


export const getSubCategoryValidation = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "SubCategory ID is required",
    "any.required": "SubCategory ID is required",
  }),
});


export const getSubCategoryByIdValidation = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "SubCategory ID is required",
    "any.required": "SubCategory ID is required",
  }),
}); 

export const addSubCategoryValidation = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "SubCategory name is required",
    "any.required": "SubCategory name is required",
  }),
  categoryID: Joi.string().required().messages({
    "string.empty": "Category ID is required",
    "any.required": "Category ID is required",
  }),
});

export const updateSubCategoryValidation = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "SubCategory ID is required",
    "any.required": "SubCategory ID is required",
  }),
  name: Joi.string().optional(),
  categoryID: Joi.string().optional(),
    image: Joi.object({
    secure_url: Joi.string().optional(),
    public_id: Joi.string().optional(),
  }),
  description: Joi.string().optional(),
}).or("name", "categoryID", "image", "description").messages({
  "object.missing": "At least one field (name, categoryID, image, description) is required for update",
});

export const deleteSubCategoryValidation = Joi.object({
  id: Joi.string().required().messages({
    "string.empty": "SubCategory ID is required",
    "any.required": "SubCategory ID is required",
  }),
});