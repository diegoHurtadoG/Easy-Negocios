import express from "express";
import cors from "cors";
import morgan from "morgan";

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { options } from "./swaggerOptions";
const specs = swaggerJSDoc(options);

import projectsRoutes from './routes/projects';


const app = express();

app.use(cors()); // So any backend app can connect, avoids a typical http problem
app.use(morgan("dev")); // Shows http requests in console when done

app.use(express.json()); // express.json parses incoming requests with JSON and is a body-parser

app.use(projectsRoutes);

app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
app.get('/', async (req, res) => {
    res.json({status: "EasyNegocios Backend"});
});

export default app