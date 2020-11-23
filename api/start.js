const express = require('express');
const morgan = require('morgan'); //middleware de logare
const helmet = require('helmet'); //middleware de securitate
const cors = require('cors');

const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(cors());
app.options("*", cors());
app.use(morgan(':remote-addr - :remote-user [:date[web]] ":method :url HTTP/:http-version" :status :res[content-length]'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', routes);

// handler de erori declarat ca middleware
app.use((err, req, res, next) => {
    console.trace(err);
    let status = 500;
    let message = 'Something Bad Happened Api';
    if (err.httpStatus) {
        status = err.httpStatus;
        message = err.message;
    }
    res.status(status).json({
        error: message,
    });
});

const port = process.env.PORT || 80;

app.listen(port, () => {
    console.log(`App is listening on ${port}`);
});
