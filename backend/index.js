import express from "express";

import cors from "cors";

import router from "./routes/routes.js";

const app = express();

const port = 5000;

app.use(express.json());

app.use(cors());

app.use(router);

app.listen(port,()=>
{
    console.log("server listening at port "+port);
});