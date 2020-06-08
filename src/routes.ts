import express from 'express';
import {celebrate, Joi} from 'celebrate';

import multer from "multer";
import multerConfig from  "./config/multer"

import ColletPointController from "./controllers/ColletPointController";
import ItemController from "./controllers/ItemController";

const routes = express.Router();
const upload = multer(multerConfig);

const colletPointController = new ColletPointController();
const itemController = new ItemController();

routes.get('/items', itemController.index)

routes.get('/collect-point', colletPointController.index)
routes.get('/collect-point/:id', colletPointController.show)

routes.post(
    '/collect-point',
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            latitude: Joi.number().required(),
            longitude:Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        })
    },{
        abortEarly: false
    }),
    colletPointController.create
);

export default routes;
