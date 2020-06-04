import { Request, Response } from 'express';

import knex from '../database/connection';


class ColletPointController {
    async index(request: Request, response: Response) {
        try {
            const { city, uf, items } = request.query;
            const trx = await knex.transaction();
            const parsedItems = String(items)
                .split(',')
                .map(item => Number(item.trim()));

            const collectPoints = await trx('collect_point')
                .join('collect_point_item', 'collect_point.id', '=', 'collect_point_item.collect_point_id')

                .join('collect_point_address', 'collect_point.id', '=', 'collect_point_address.collect_point_id')
                .join('address', 'address.id', '=', 'collect_point_address.address_id' )

                .join('collect_point_liaison', 'collect_point.id', '=', 'collect_point_liaison.collect_point_id')
                .join('liaison', 'liaison.id', '=', 'collect_point_liaison.liaison_id' )

                .whereIn('item_id', parsedItems).or
                .where('address.uf', String( uf)).or
                .where('address.city', String(city))
                .distinct().select('collect_point.*').select('address.*').select('liaison.*')
            await trx.commit();
            return response.status(200).json(collectPoints).end();
        } catch (error) {
            console.log(error)
            return response.status(500).json(error).end();
        }
    }
    async create(request: Request, response: Response) {
        try {
            const { name, address, liaison, items } = request.body;
            const trx = await knex.transaction();
            const collect_point = {
                image: 'image-fake',
                name,
            };
            // Gravar collect_point
            const point_id = await trx('collect_point')
                .insert(collect_point, 'id');

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
                    collect_point_id: point_id[0]
                }
            })

            // Criação objetos relacionais address -> collect_point
            const collectPoint_address = address_ids.map((id: number) => {
                return {
                    address_id: id,
                    collect_point_id: point_id[0]
                }
            })

            // Criação objetos relacionais liaison_ids -> collect_point
            const collectPoint_liaison = liaison_ids.map((id: number) => {
                return {
                    liaison_id: id,
                    collect_point_id: point_id[0]
                }
            })

            // Gravar objetos relacionais
            await trx('collect_point_item').insert(collectPoint_item)
            await trx('collect_point_address').insert(collectPoint_address)
            await trx('collect_point_liaison').insert(collectPoint_liaison)

            await trx.commit();
            return response.status(200).json({
                id: point_id[0],
                ...collect_point,
                address,
                liaison
            }).end();
        } catch (error) {
            console.log(error)
            return response.status(500).json(error).end();
        }
    }

    async show(request: Request, response: Response) {
        try {
            const trx = await knex.transaction();
            const { id } = request.params;
            const collectPoints = await trx('collect_point').where('id', id).first();

            const items = await trx('item')
                .join('collect_point_item', 'item.id', '=', 'collect_point_item.item_id')
                .where('collect_point_item.collect_point_id', id);

            const address = await trx('address')
                .join('collect_point_address', 'address.id', '=', 'collect_point_address.address_id')
                .where('collect_point_address.collect_point_id', id);

            const liaison = await trx('liaison')
                .join('collect_point_liaison', 'liaison.id', '=', 'collect_point_liaison.liaison_id')
                .where('collect_point_liaison.collect_point_id', id);
            await trx.commit();

            return collectPoints ? response.status(200).json({ collectPoints, items, address, liaison }).end() :
                response.status(400).json({ message: 'Collect Point not found.' }).end();
        } catch (error) {
            console.log(error)
            return response.status(500).json(error).end();
        }
    }
}

export default ColletPointController;