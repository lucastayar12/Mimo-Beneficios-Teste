import express from "express";
import AtividadeRoute from "./controllers/AtividadeController";
var cors = require('cors');

const route = AtividadeRoute as express.Router;

const app = express();
app.use(express.json());
app.use(cors())

app.use(route);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});