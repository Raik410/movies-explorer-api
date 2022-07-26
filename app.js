require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const NotFound = require('./utils/errors/NotFound');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const limiter = require('./middlewares/rateLimit');
const cors = require('./middlewares/cors');
const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());

app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors);

app.use(requestLogger);

router(app);

app.use(errorLogger);

app.use(auth, (req, res, next) => next(new NotFound('Страница не найдена')));

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

  .then(() => {
    app.listen(PORT, () => {
      console.log(`App started on ${PORT} port`);
    });
  })
  .catch((e) => console.log(e));
