import express from 'express';
import cors from 'cors';
import routes from "./routes";
import path from 'path';
import { errors } from 'celebrate';
require('dotenv');

const app = express();

const MY_PORT = process.env.PORT;
/*const MY_APP_SECRET = process.env.APP_SECRET;*/

app.use(cors({
    /*  origin: 'www'*/
}));
app.use(express.json());
app.use(routes);

/**
 * Servir arquivos staticos
 */
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

app.listen(MY_PORT || 3333);