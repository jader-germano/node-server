import Knex from 'knex';

export async function up(knex: Knex) {
    // Criar a tabela
    return  knex.schema.createTable('item_colletc_points', table => {
        table.increments('id').primary();
        table.integer('colletct_point_id').notNullable().references('id').inTable('colletct_points');
        table.integer('item_id').notNullable().references('id').inTable('item');
    })

}

export async function down(knex: Knex) {
    // Rollback
    return knex.schema.dropTable('address');
}