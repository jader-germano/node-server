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

                .whereIn('item_id', parsedItems).or
                .where('collect_point.uf', String(uf)).or
                .where('collect_point.city', String(city))
                .distinct().select('collect_point.*')
            await trx.commit();
            return response.status(200).json(collectPoints).end();
        } catch (error) {
            console.log(error)
            return response.status(500).json(error).end();
        }
    }

    async create(request: Request, response: Response) {
        try {
            const {
                name,
                whatsapp,
                email,
                latitude,
                longitude,
                city,
                uf,
                items
            } = request.body;
            const trx = await knex.transaction();
            const collect_point = {
                image: 'image-fake',
                name,
                whatsapp,
                email,
                latitude,
                longitude,
                city,
                uf,
            };
            // Gravar collect_point
            const point_id = await trx('collect_point')
                .insert(collect_point, 'id');

            // Criação objetos relacionais item -> collect_point
            const collectPoint_item = items.map((id: number) => {
                return {
                    item_id: id,
                    collect_point_id: point_id[0]
                }
            })

            // Gravar objetos relacionais
            await trx('collect_point_item').insert(collectPoint_item)

            await trx.commit();
            return response.status(200).json({
                id: point_id[0],
                ...collect_point,
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

            await trx.commit();

            return collectPoints ? response.status(200).json({ collectPoints, items }).end() :
                response.status(400).json({ message: 'Collect Point not found.' }).end();
        } catch (error) {
            console.log(error)
            return response.status(500).json(error).end();
        }
    }
}

export default ColletPointController;