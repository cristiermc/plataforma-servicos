import {createServer} from "node:http";
import {handleRoutes} from "./routes.js";

const server = createServer((request, response) => {
    handleRoutes(request, response);
});

server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});