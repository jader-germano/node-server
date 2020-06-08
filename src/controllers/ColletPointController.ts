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

            const serializedPoints = collectPoints.map(point => {
                return {
                    ...point,
                    image_url: `http://192.168.11.6:3333/uploads/${point.image}`,
                }
            })
            await trx.commit();
            return response
                .status(200)
                .json(serializedPoints)
                .end();
        } catch (error) {
            return response
                .status(500)
                .json(error)
                .end();
        }
    };

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
                image: request.file.filename,
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
            const collectPoint_item = items
                .split(',')
                .map((item: string) => Number(item.trim()))
                .map((id: number) => {
                    return {
                        item_id: id,
                        collect_point_id: point_id[0]
                    }
                })

            // Gravar objetos relacionais
            await trx('collect_point_item').insert(collectPoint_item)

            await trx.commit();
            return response
                .status(200)
                .json({
                    id: point_id[0],
                    ...collect_point,
                }).end();
        } catch (error) {
            return response
                .status(500)
                .json(error)
                .end();
        }
    };

    async show(request: Request, response: Response) {
        try {
            const trx = await knex.transaction();
            const { id } = request.params;
            const collectPoint = await trx('collect_point')
                .where('id', id)
                .select('*')
                .first();

            if (!collectPoint) {
                response
                    .status(400)
                    .json({ message: 'Collect Point not found.' })
                    .end()
            }

            const serializedPoint = {
                ...collectPoint,
                image_url: `http://192.168.11.6:3333/uploads/${collectPoint.image}`,
            };

            const items = await trx('item')
                .join('collect_point_item', 'item.id', '=', 'collect_point_item.item_id')
                .where('collect_point_item.collect_point_id', id)
                .select('item.title');

            await trx.commit();

            return response
                .status(200)
                .json({
                    collectPoint: serializedPoint,
                    items
                })
                .end();
        } catch (error) {
            return response
                .status(500)
                .json(error)
                .end();
        }
    };
}

export default ColletPointController;