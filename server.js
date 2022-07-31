import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
//rfs can't invoke with import that make wrong
const rfs = require('rotating-file-stream');
import router from '~/routers';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;
const isProduction = process.env.NODE_ENV === 'production' ? true : false;

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname.replace('\\dist', ''), 'log'),
});
app.use(isProduction ? morgan('combined', { stream: accessLogStream }) : morgan('combined'));

app.get('/', (req, res) => {
    res.json({
        message: 'Hello gust',
    });
});
app.use('/api', router);
app.listen(port, () => console.log('server listening on port: ' + port));
