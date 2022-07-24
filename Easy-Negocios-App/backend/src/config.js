import { config as dotenv } from "dotenv"
dotenv();

export const config = process.env.ENV === "PROD" ? 
{
    user: process.env.DB_GOOGLESQL_USER,
    password: process.env.DB_GOOGLESQL_PASSWORD,
    database: process.env.DB_GOOGLESQL_DATABASE,
    socketPath: process.env.DB_GOOGLESQL_SOCKETPATH,
    multipleStatements: true
} : 
{
    host: process.env.DB_LOCAL_HOST,
    user: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASSWORD,
    database: process.env.DB_LOCAL_DATABASE,
    multipleStatements: true
}