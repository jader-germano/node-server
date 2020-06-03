import express from 'express';
import knex from './database/connection'

const routes = express.Router();

routes.get('/items', async (request, response) => {
    const items = await knex('item').select('*');

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${ item.image }`,

        }
    })
    return response.json(serializedItems)
})

routes.post('/collect-point', async (request, response) => {
    try {
        const { name, address, liaison, items } = request.body;
        const trx = await knex.transaction();

        const point_ids = await trx('collect_point')
            .insert({
                image: 'image-fake',
                name,
            }, 'id');

        const address_ids = await trx('address')
            .insert(address, 'id');

        const liaison_ids = await trx('liaison')
            .insert(liaison, 'id');

        const collectPoint_item = items.map((id: number) => {
            return {
                item_id: id,
                collect_point_id: point_ids[0]
            }
        })

        const collectPoint_address = address_ids.map((id: number) => {
            return {
                address_id: id,
                collect_point_id: point_ids[0]
            }
        })

        const collectPoint_liaison = liaison_ids.map((id: number) => {
            return {
                liaison_id: id,
                collect_point_id: point_ids[0]
            }
        })

        await trx('collect_point_item').insert(collectPoint_item)
        await trx('collect_point_address').insert(collectPoint_address)
        await trx('collect_point_liaison').insert(collectPoint_liaison)
        trx.commit();
        return response.status(200).json({ success: true }).end();
    } catch (error) {
        return response.status(500).json(error).end();
    }

})

export default routes;

// Migrations = Histórico de BD

// Create table
