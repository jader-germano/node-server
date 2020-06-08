import { Request, Response } from 'express';

import knex from '../database/connection';

class ItemController {
    async index(request: Request, response: Response) {
        try {
            const items = await knex('item').select('*');

            const serializedItems = items.map(item => {
                return {
                    id: item.id,
                    title: item.title,
                    image_url: `http://192.168.11.6:3333/uploads/${item.image}`,
                }
            })
            return response.json(serializedItems)
                .status(200)
                .end();
        } catch (error) {
            console.log(error)
            return response.status(500)
                .json(error)
                .end();
        }
    }

}

export default ItemController;