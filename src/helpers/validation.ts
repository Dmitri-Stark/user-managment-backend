import Joi from 'joi';

export const paginationSchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(10),
  offset: Joi.number().integer().min(0).default(0)
});

export const removeUserFromGroupSchema = Joi.object({
  userId: Joi.number().integer().required(),
  groupId: Joi.number().integer().required()
});

export const updateUsersStatusesSchema = Joi.object({
  updates: Joi.array().items(
    Joi.object({
      id: Joi.number().integer().required(),
      status: Joi.string().valid('pending', 'active', 'blocked').required()
    })
  ).min(1).max(500).required()
});