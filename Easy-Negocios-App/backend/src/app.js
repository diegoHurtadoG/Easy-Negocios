import express from "express";
import projectsRoutes from './routes/projects'

const app = express();

app.use(express.json()); // express.json parses incoming requests with JSON and is a body-parser

app.use(projectsRoutes)

export default app