import Knex from 'knex';

export async function up(knex: Knex) {
    // Criar a tabela
    return  knex.schema.createTable('colletc_points_contact', table => {
        table.increments('id').primary();
        table.integer('colletct_point_id').notNullable()
            .references('id')
            .inTable('colletct_points');

        table.integer('address_id').notNullable()
            .references('id')
            .inTable('address');
    })
}

export async function down(knex: Knex) {
    // Rollback
    return knex.schema.dropTable('colletc_points_contact');
}