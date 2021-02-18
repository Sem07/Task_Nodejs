const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const dotenv = require('dotenv');
const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');

const { apiRouter } = require('./routes');
const { config: { PORT } } = require('./configs');

const app = express();

dotenv.config();
require('./dataBase').getInstance().setModels();

app.engine('ejs', consolidate.ejs);
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());
app.use(express.json);
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);

app.use('*', (err, req, res, next) => {
    res
        .status(err.code)
        .json({
            message: err.message,
            ok: false
        });
});

app.listen(PORT, (err) => err && console.log(err) || console.log(`Server is listening on ${PORT}`));
