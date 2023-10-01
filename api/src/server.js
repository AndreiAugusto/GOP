require('./database');
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { routesUsuario } = require('./routes/usuario-route');
const { routesVeiculo } = require('./routes/veiculo-route');
const { routesOperacoes } = require('./routes/operacao-route');
const { routesDashboard } = require('./routes/dashboard-route');
const { routesOperacaoVeiculo } = require('./routes/operacao-veiculo-route');

const server = express();

server.use(express.json());
server.use(cors());

server.use(routesUsuario);
server.use(routesVeiculo);
server.use(routesOperacoes);
server.use(routesDashboard);
server.use(routesOperacaoVeiculo);

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`API iniciada: http://localhost:${PORT}`);
});
