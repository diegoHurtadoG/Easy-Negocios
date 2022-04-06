import mysql from 'mysql2'
import {config} from './config'

export const connect = async() => {
    return await mysql.createConnection(config);
}