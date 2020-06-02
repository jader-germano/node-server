import express from 'express';

const app = express();

app.use(express.json());
const users = [
    'Jader', // 0
    'Philipe', // 2
    'Germano',//...
    'Isaac',
    'Robson'
]

/**
 * Rota: Endereço completo da requisição
 * Recurso: Qual  entidade está sendo acessado do sistema
 *  
 * Métodos: GET/POST/PUT/DELETE
 * Request Param: Parâmetros declarados na rota que indentificam um recurso
 * Query Param: Parâmetros geralmente opcionais adicionados à rota como filtros, paginação, etc
 *  Resquest body: Parâmetros com criação/atualização de infos
 *
 *
*/

/**
 * GET: Busca de users
 * 
*/
app.get('/users', (request, response) => {
    const search = String(request.query.search).toLowerCase();
    const filteredUsers = search ? users.filter(u => u.toLowerCase().includes(search)) : users;
    // response.send('Hello world');
   return  response.json(filteredUsers);
})

/**
 * post: Busca de usuários por :id
 *
 */
app.get('/users/:id', (request, response) => {
    const id = Number(request.params.id);
    const user = users[id]
    return response.json(user);
})

/** 
 * POST: Busca de users
 * 
*/
app.post('/users', (request, response) => {
    const data = request.body;
    const user = {
        name: data.name,
        email:  data.email,
    }
    return response.json(user);
}) 

app.listen('3333')