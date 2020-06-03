import Knex from 'knex';

export async function up(knex: Knex) {
    // Criar a tabela
    return  knex.schema.createTable('collect_point_address', table => {
        table.increments('id').primary();
        table.integer('collect_point_id').notNullable()
            .references('id')
            .inTable('collect_point');

        table.integer('address_id').notNullable()
            .references('id')
            .inTable('address');
    })
}

export async function down(knex: Knex) {
    // Rollback
    return knex.schema.dropTable('collect_point_address');
}