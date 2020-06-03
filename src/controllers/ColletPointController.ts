import { Request, Response } from 'express'

import knex from '../database/connection'


class ColletPointController {
    async creatte(request: Request, response: Response) {
        try {
            const { name, address, liaison, items } = request.body;
            const trx = await knex.transaction();

            // Gravar collect_point
            const point_ids = await trx('collect_point')
                .insert({
                    image: 'image-fake',
                    name,
                }, 'id');

            // Gravar address
            const address_ids = await trx('address')
                .insert(address, 'id');

            // Gravar liaison
            const liaison_ids = await trx('liaison')
                .insert(liaison, 'id');

            // Criação objetos relacionais item -> collect_point
            const collectPoint_item = items.map((id: number) => {
                return {
                    item_id: id,
                    collect_point_id: point_ids[0]
                }
            })

            // Criação objetos relacionais address -> collect_point
            const collectPoint_address = address_ids.map((id: number) => {
                return {
                    address_id: id,
                    collect_point_id: point_ids[0]
                }
            })

            // Criação objetos relacionais liaison_ids -> collect_point
            const collectPoint_liaison = liaison_ids.map((id: number) => {
                return {
                    liaison_id: id,
                    collect_point_id: point_ids[0]
                }
            })

            // Gravar objetos relacionais
            await trx('collect_point_item').insert(collectPoint_item)
            await trx('collect_point_address').insert(collectPoint_address)
            await trx('collect_point_liaison').insert(collectPoint_liaison)

            trx.commit();
            return response.status(200).json({ success: true }).end();
        } catch (error) {
            return response.status(500).json(error).end();
        }
    }
}

export default ColletPointController;