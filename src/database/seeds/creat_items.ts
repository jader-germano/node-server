import Knex from 'knex';

export async function seed(knex: Knex) {
    await knex('item').insert([
        { title: 'Lâmpadas', image: 'lampadas.svg' },
        { title: 'Pilhas e Baterias', image: 'baterias.svg' },
        { title: 'Papéis e Papelão', image: 'papeis-papelao.svg' },
        { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' },
        { title: 'Resíduos Orgânicos', image: 'organicos.svg' },
        { title: 'Óleo de Cozinha', image: 'oleo.svg' },
    ])

    await knex('type_liaison').insert([
        { code: 0, description: 'phone' },
        { code: 1, description: 'whatsapp' },
        { code: 2, description: 'email' },

    ])
}