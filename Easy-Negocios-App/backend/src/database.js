import mysql from 'mysql2/promise'
import {config} from './config'

export const connect = async() => {
    return mysql.createPool(config);
}
