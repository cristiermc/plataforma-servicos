import {createServer} from "node:http";

const server = createServer((request, response) => {
    if (request.url === "/") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/plain");
        response.end("FixFast Funcionando!");
        return;
    }
    if (request.url === "/health") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        response.end(JSON.stringify({status: "ok"}));
        return;
    }

    response.statusCode = 404;
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify({error: "Rota não encontrada"}));
});

server.listen(3000, () => {
    console.log("Server rodando em http://localhost:3000");
});
