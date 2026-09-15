
//Responsável por receber as requisições e tratar as rotas da aplicação

import { IncomingMessage, ServerResponse } from "node:http";

import { services } from "./data/services.js";
import { serviceRequests } from "./data/serviceRequests.js";

//Função responsável por tratar as rotas da aplicação
export function handleRoutes(
    request: IncomingMessage,
    response: ServerResponse
){

    //Verifica se uma solicitação de serviço foi criada
    if (request.method === "POST" && request.url === "/service-requests") {
        //console.log("Recebendo uma solicitação de serviço...");
        let body = "";

        //Recebe os dados enviados na requisição
        request.on("data", (chunk) => {
            body += chunk;
        });

        //Executa quando todos os dados foram recebidos
        request.on("end", () => {
            try{
                //Converte o JSON recebido em um objeto JavaScript
                const data = JSON.parse(body);

                const newId = serviceRequests.length + 1;

                //Cria uma nova solicitação de serviço
                const newServiceRequest = {
                    id: newId,
                    serviceId: data.serviceId,
                    description: data.description,
                    status: "aberta"
                };

                //Adiciona a nova solicitação a lista
                serviceRequests.push(newServiceRequest);

                //Retorna a nova solicitação criada para o cliente
                response.statusCode = 201;
                response.setHeader("Content-Type", "application/json; charset=utf-8");
                response.end(JSON.stringify(newServiceRequest));
                return;

                console.log("Dados recebidos:", data);
            } catch {
                //Informa ao cliente que o JSON enviado é inválido
                response.statusCode = 400;
                response.setHeader("Content-Type", "application/json; charset=utf-8");
                response.end(JSON.stringify({error: "JSON inválido"}));
                return;
            }
        });
        return;
    }

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

    //Verifica se uma solicitação de serviço individual foi acessada
    if (request.url?.startsWith("/service-requests/")) {

        //Divide a URL para obter o ID da solicitação de serviço
        const parts = request.url.split("/");
        const serviceRequestId = Number(parts[2]);

        //Procura a solicitação de serviço pelo ID informado
        const serviceRequest = serviceRequests.find((serviceRequest) => serviceRequest.id === serviceRequestId);

        //Verifica se a solicitação de serviço existe
        if(!serviceRequest) {
            response.statusCode = 404;
            response.setHeader("Content-Type", "application/json; charset=utf-8");
            response.end(JSON.stringify({error: "Solicitação de serviço não encontrada"}));
            return;
        }

        //Retorna a solicitação de serviço encontrada em formato JSON
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json; charset=utf-8");
        response.end(JSON.stringify(serviceRequest));
        return;
    }

    //Verifica se a rota para listar todas as solicitações de serviço foi acessada
    if (request.url === "/service-requests") {
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