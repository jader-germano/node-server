import knex from 'knex'
import path from 'path';

const connection = knex({
    client: 'sqlite3',
    connection: {
        /*__dirname : retorna o caminho do diretório do arquivo executado*/
        filename: path.resolve(__dirname, 'database.sqlite'),
    },
    useNullAsDefault: true,
});

export default connection;