
//Importa o módulo HTTP do Node.js para criar um servidor
import {createServer} from "node:http";

//Importa a função responsável por tratar as rotas da aplicação
import {handleRoutes} from "./routes.js";

//Cria o servidor e encaminha cada requisição para o responsável pelas rotas
const server = createServer((request, response) => {
    handleRoutes(request, response);
});


//Inicia o servidor na porta 3000
server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});