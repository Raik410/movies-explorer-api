const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const AuthorizationError = require('../utils/errors/AuthorizationError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthorizationError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret');
  } catch (err) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  return next(); // пропускаем запрос дальше
};
