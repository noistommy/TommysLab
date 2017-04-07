import express from 'express';
import path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY
import api from './routes';
import mongoose from 'mongoose';
import session from 'express-session';
import CORS from 'cors';


/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://ec2-52-78-127-187.ap-northeast-2.compute.amazonaws.com:27017/Thouse');

const app = express();
const port = 3000;
const devPort = 7777;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, './../public')));




/* use session */
app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true,
    store:require('mongoose-session')(mongoose)
}));

// app.use(CORS);

// app.use(function(req, res, next) {
//     res.header('Acess-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//     (req.method === 'OPTIONS') ?
//         res.send(200) :
//     next();
// });

/* handle error */
app.use(function(err, req, res, next) {

    req.session.now =  (new Date()).toUTCString();
    console.log(req.session);
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use('/api',api);

/* support client-side routing */
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});


app.listen(port, () => {
    console.log('Express is listening on port', port);
});

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}
