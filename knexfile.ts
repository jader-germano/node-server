import path from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        /*__dirname : retorna o caminho do diretório do arquivo executado*/
        filename: path.resolve(__dirname,'src','database', 'database.sqlite'),
    },
    migrations: {
        directory: path.resolve(__dirname,'src','database', 'migrations'),
    },
    useNullAsDefault: true,
};