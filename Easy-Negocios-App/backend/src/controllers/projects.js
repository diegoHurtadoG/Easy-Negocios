import {connect} from '../database'

export const getProjects = async (req, res) => {
    const connection = await connect()
    const [rows] = await connection.query('SELECT * FROM projects')
    res.json(rows)
}

export const getProject = (req, res) => {
    res.send("Hello World!!")
}

export const createProject = (req, res) => {
    res.send("Hello World!!")
}

export const deleteProject = (req, res) => {
    res.send("Hello World!!")
}

export const updateProject = (req, res) => {
    res.send("Hello World!!")
}