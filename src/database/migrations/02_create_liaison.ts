import Knex from 'knex';

export async function up(knex: Knex) {
    // Criar a tabela
    return knex.schema.createTable('liaison', table => {
        table.increments('id').primary();
        table.string('description').notNullable();

        table.string('type_liaison_id').notNullable()
            .references('id')
            .inTable('type_liaison');

    })

}

export async function down(knex: Knex) {
    // Rollback
    return knex.schema.dropTable('liaison');
}