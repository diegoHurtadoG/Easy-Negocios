import { config as dotenv } from "dotenv"
dotenv();

// If .env has PROD env, then the cloud run credentials work, if not, the local connection to cloudsql

export const config = (process.env.ENV === "PROD" || true) ? 
{
    user: process.env.DB_GOOGLESQL_USER,
    password: process.env.DB_GOOGLESQL_PASSWORD,
    database: process.env.DB_GOOGLESQL_DATABASE,
    socketPath: `/cloudsql/${process.env.DB_GOOGLESQL_INSTANCE_CONNECTION_NAME}`,
    multipleStatements: true
} : 
{
    host: process.env.DB_LOCAL_GOOGLE_HOST,
    user: process.env.DB_LOCAL_GOOGLE_USER,
    password: process.env.DB_LOCAL_GOOGLE_PASSWORD,
    database: process.env.DB_LOCAL_GOOGLE_DATABASE,
    multipleStatements: true
}