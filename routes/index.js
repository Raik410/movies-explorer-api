const { celebrate, Joi } = require('celebrate');

const userRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login } = require('../controllers/user');

module.exports = (app, auth) => {
  app.post('/singup', celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().required(),
    }),
  }), createUser);

  app.post('/singin', celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }), login);

  app.use('/users', auth, userRouter);
  app.use('/movies', auth, moviesRouter);
};
