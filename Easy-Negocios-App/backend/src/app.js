import express from "express";
import projectsRoutes from './routes/projects'
import cors from "cors"
import morgan from "morgan"

const app = express();

app.use(cors()); // So any backend app can connect, avoids a typical http problem
app.use(morgan("dev")); // Shows http requests in console when done

app.use(express.json()); // express.json parses incoming requests with JSON and is a body-parser

app.use(projectsRoutes)

export default app