import express from 'express';

const routes = express.Router();

routes.get('/', (request, response) => {
    return  response.json({message: 'Hello World'});
})

export default routes;

// Migrations = Histórico de BD

// Create table
