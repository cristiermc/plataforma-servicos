import { IncomingMessage, ServerResponse } from "node:http";

export function handleRoutes(
    request: IncomingMessage,
    response: ServerResponse
){
    if (request.url === "/") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/plain; charset=utf-8");
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
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.end(JSON.stringify({error: "Rota não encontrada"}));
}