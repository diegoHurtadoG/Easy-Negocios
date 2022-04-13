import {connect} from '../database'

//console.log(req.params)

export const getProjects = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query('SELECT * FROM projects')
    res.json(results)
}

export const getProject = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query("SELECT * FROM projects WHERE id = ?",
    [
        req.params.id,
    ],
    function(error,results){
        console.log(error)
        console.log(results)
    });
    res.json(results[0])
}

export const createProject = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "INSERT INTO projects (project_name, project_description) VALUES (?, ?)",
        [
            req.body.project_name,
            req.body.project_description,
        ]);
    //console.log(results)
    // This way of returning is in the web response, not console, so we are returning the insertId of the
    //      new element and the data we sent
    res.json({
        id: results.insertId,
        ...req.body,
    });
}

export const deleteProject = async (req, res) => {
    const connection = await connect();
    const results = await connection.query(
        "DELETE FROM projects WHERE id = ?",
        [
            req.params.id,
        ]
    )
    //console.log(results)
    res.sendStatus(204);
}

export const updateProject = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "UPDATE projects SET ? WHERE id = ?",
        [
            req.body,
            req.params.id,
        ]
    )
    //console.log([results])
    res.json({
        changes_made: results.info,
        ...req.body,
    });
}