import express from 'express';
import ColletPointController from "./controllers/ColletPointController";
import ItemController from "./controllers/ItemController";

const routes = express.Router();
const colletPointController = new ColletPointController();
const itemController = new ItemController();

routes.get('/items', itemController.list)

routes.post('/collect-point', colletPointController.creatte)

export default routes;

// Migrations = Histórico de BD

// Create table
