import {connect} from '../database'

//console.log(req.params)

export const getProjects = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query('SELECT * FROM projects')
    res.json(rows)
}

export const getProject = async (req, res) => {
    const connection = await connect();
    const [rows] = await connection.query("SELECT * FROM projects WHERE id = ?",
    [
        req.params.id,
    ],
    function(error,results){
        console.log(error)
        console.log(results)
    });
    res.json(rows[0])
}

export const createProject = async (req, res) => {
    const connection = await connect();
    const results = await connection.query(
        "INSERT INTO projects (project_name, project_description) VALUES (?, ?)",
        [
            req.body.project_name,
            req.body.project_description,
        ]);
    console.log(results)
}

export const deleteProject = async (req, res) => {
    const connection = await connect();
    const results = await connection.query(
        "DELETE FROM projects WHERE id = ?",
        [
            req.params.id,
        ]
    )
    console.log(results)
}

export const updateProject = async (req, res) => {
    res.send("Hello World!!")
}