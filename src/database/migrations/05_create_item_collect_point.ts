import Knex from 'knex';

export async function up(knex: Knex) {
    // Criar a tabela
    return knex.schema.createTable('collect_point_item', table => {
        table.increments('id').primary();
        table.integer('collect_point_id').notNullable()
            .references('id')
            .inTable('collect_point');
        table.integer('item_id').notNullable()
            .references('id')
            .inTable('item');
    })
}

export async function down(knex: Knex) {
    // Rollback
    return knex.schema.dropTable('collect_point_item');
}