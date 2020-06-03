import Knex from 'knex';

export async function up(knex: Knex) {
    // Criar a tabela
    return knex.schema.createTable('type_contact', table => {
        table.increments('id').primary();
        table.integer('code').notNullable();
        table.string('description').notNullable();

    })

}

export async function down(knex: Knex) {
    // Rollback
    return knex.schema.dropTable('contact');
}