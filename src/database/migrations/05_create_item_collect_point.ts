import Knex from 'knex';

export async function up(knex: Knex) {
    // Criar a tabela
    return  knex.schema.createTable('item_collect_points', table => {
        table.increments('id').primary();
        table.integer('collect_point_id').notNullable()
            .references('id')
            .inTable('collect_points');
        table.integer('item_id').notNullable()
            .references('id')
            .inTable('item');
    })
}

export async function down(knex: Knex) {
    // Rollback
    return knex.schema.dropTable('item_collect_points');
}