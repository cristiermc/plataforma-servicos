
//Responsável por receber as requisições e tratar as rotas da aplicação

import { IncomingMessage, ServerResponse } from "node:http";

import { services } from "./data/services.js";
import { serviceRequests } from "./data/serviceRequests.js";

//Função responsável por tratar as rotas da aplicação
export function handleRoutes(
    request: IncomingMessage,
    response: ServerResponse
){
    //Verifica se a rota principal foi acessada
    if (request.url === "/") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/plain; charset=utf-8");
        response.end("FixFast Funcionando!");
        return;
    }
    //Verifica se a rota de saúde foi acessada
    if (request.url === "/health") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        response.end(JSON.stringify({status: "ok"}));
        return;
    }
    //Verifica se uma rota de serviço individual foi acessada
    if (request.url?.startsWith("/services/")) {

        //Divide a URL para obter o ID do serviço
        const parts = request.url.split("/");
        const serviceId = Number(parts[2]);

        //Procura o serviço pelo ID informado
        const service = services.find((service) => service.id === serviceId);

        //Verifica se o serviço existe
        if(!service) {
            response.statusCode = 404;
            response.setHeader("Content-Type", "application/json; charset=utf-8");
            response.end(JSON.stringify({error: "Serviço não encontrado"}));
            return;
        }

        //Retorna o serviço encontrado em formato JSON
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        response.end(JSON.stringify(service));
        return;
    }

    //Verifica se a rota para listar todas as solicitações de serviço foi acessada
    if (request.url === "/services-requests") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        response.end(JSON.stringify(serviceRequests));
        return;
    }

    //Verifica se a rota para listar todos os serviços foi acessada
    if (request.url === "/services") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        response.end(JSON.stringify(services));
        return;
    }

    //Retorna erro quando a rota não existe
    response.statusCode = 404;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.end(JSON.stringify({error: "Rota não encontrada"}));
}