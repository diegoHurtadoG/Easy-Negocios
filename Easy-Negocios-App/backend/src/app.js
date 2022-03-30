import express from "express";
import projectsRoutes from './routes/projects'

const app = express();

app.use(projectsRoutes)

export default app