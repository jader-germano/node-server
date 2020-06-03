import express from 'express';
import knex from './database/connection'

const routes = express.Router();

routes.get('/items', async (request, response) => {
    const items = await knex('item').select('*');

    const serializedItems = items.map( item => {
        return {
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`,

        }
    })
    return response.json(serializedItems)
})

routes.post('/collect-point', async (request, response) => {

    const {
        name,
        address,
        contact,
        items,
    } = request.body;
    knex('collect-point').insert({
        name,
        address,
        contact,
        items,
    })
    return response.json()
})

export default routes;

// Migrations = Histórico de BD

// Create table
