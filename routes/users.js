const { celebrate, Joi } = require('celebrate');
const userRouter = require('express').Router();

const { getUserProfile, updateProfile } = require('../controllers/user');

userRouter.get('/me', getUserProfile);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().min(2).max(20),
    name: Joi.string().required().min(2).max(20),
  }),
}), updateProfile);

module.exports = userRouter;
