import Knex from 'knex';

export async function up(knex: Knex) {
    // Criar a tabela
    return knex.schema.createTable('address', table => {
        table.increments('id').primary();
        table.decimal('latitude').notNullable();
        table.decimal('longitude').notNullable();
        table.string('city').notNullable();
        table.string('uf').notNullable();
        table.string('number').notNullable();
    });

}

export async function down(knex: Knex) {
    // Rollback
    return knex.schema.dropTable('address');
}