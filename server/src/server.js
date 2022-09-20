import express from 'express';
const app = express();
app.get('/ads', (request, response) => {
    console.log("Acessou ads");
    response.json([{ id: 1, name: 'acessou ads' }, { id: 2, name: 'acessou ad 2' }]);
});
app.listen(3333);
