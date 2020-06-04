import express from 'express';
import ColletPointController from "./controllers/ColletPointController";
import ItemController from "./controllers/ItemController";

const routes = express.Router();
const colletPointController = new ColletPointController();
const itemController = new ItemController();

routes.get('/items', itemController.index)
routes.post('/collect-point', colletPointController.create)
routes.get('/collect-point', colletPointController.index)
routes.get('/collect-point/:id', colletPointController.show)

export default routes;
