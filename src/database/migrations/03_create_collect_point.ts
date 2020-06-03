import Knex from 'knex';

export async function up(knex: Knex) {
    // Criar a tabela
    return knex.schema.createTable('collect_point', table => {
        table.increments('id').primary();
        table.string('image').notNullable();
        table.string('name').notNullable();
        table.integer('contact_id').references('id').inTable('contact');
        table.integer('address_id').references('id').inTable('address');
    })

}

export async function down(knex: Knex) {
    // Rollback
    return  knex.schema.dropTable('collect_point');
}