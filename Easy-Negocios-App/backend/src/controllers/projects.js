import {connect} from '../database'

//console.log(req.params)

//#region projects

/////////////////////////// PROJECTS ///////////////////////////

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

//#endregion

//#region products

/////////////////////////// PRODUCTS ///////////////////////////

export const getProducts = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "SELECT * FROM products \
        WHERE project_id = ?",
    [
        req.params.project_id,
    ],
    function(error,results){
        console.log(error)
        console.log(results)
    });
    res.json(results)
}

export const getProduct = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "SELECT * FROM products \
        WHERE project_id = ? \
        AND id = ?",
    [
        req.params.project_id,
        req.params.product_id
    ],
    function(error,results){
        console.log(error)
        console.log(results)
    });
    res.json(results[0])
}

export const createProduct = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "INSERT INTO products (project_id, product_name, category_id, \
            product_description, net_price, gross_price, stock, measure_unit) \
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
            req.params.project_id,
            req.body.product_name,
            req.body.category_id,
            req.body.product_description,
            req.body.net_price, 
            req.body.gross_price, 
            req.body.stock, 
            req.body.measure_unit
        ],
        function(error,results){
            console.log(error)
            console.log(results)
        });
    //console.log(results)
    // This way of returning is in the web response, not console, so we are returning the insertId of the
    //      new element and the data we sent
    res.json({
        id: results.insertId,
        ...req.body,
    });
}

export const deleteProduct = async (req, res) => {
    const connection = await connect();
    const results = await connection.query(
        "DELETE FROM products \
        WHERE project_id = ? \
        AND id = ?",
        [
            req.params.project_id,
            req.params.product_id,
        ]
    )
    //console.log(results)
    res.sendStatus(204);
}

export const updateProduct = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "UPDATE products SET ? \
        WHERE project_id = ? \
        AND id = ?",
        [
            req.body,
            req.params.project_id,
            req.params.product_id,
        ]);
    //console.log(results)
    // This way of returning is in the web response, not console, so we are returning the insertId of the
    //      new element and the data we sent
    res.json({
        changes_made: results.info,
        ...req.body,
    });
}

//#endregion

//#region investments

/////////////////////////// INVESTMENTS ///////////////////////////

export const getInvestments = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "SELECT * FROM investments \
        WHERE project_id = ?",
    [
        req.params.project_id,
    ],
    function(error,results){
        console.log(error)
        console.log(results)
    });
    res.json(results)
}

export const getInvestment = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "SELECT * FROM investments \
        WHERE project_id = ? \
        AND id = ?",
    [
        req.params.project_id,
        req.params.investment_id
    ],
    function(error,results){
        console.log(error)
        console.log(results)
    });
    res.json(results[0])
}

export const createInvestment = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "INSERT INTO investments (project_id, total_net_price, total_gross_price, \
            ticket, investment_description, investment_date, owned_product, cuantity) \
        VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
            req.params.project_id,
            req.body.total_net_price,
            req.body.total_gross_price,
            req.body.ticket,
            req.body.investment_description,
            req.body.investment_date,
            req.body.owned_product, 
            req.body.cuantity
        ],
        function(error,results){
            console.log(error)
            console.log(results)
        });
    //console.log(results)
    // This way of returning is in the web response, not console, so we are returning the insertId of the
    //      new element and the data we sent
    res.json({
        id: results.insertId,
        ...req.body,
    });
}

export const deleteInvestment = async (req, res) => {
    const connection = await connect();
    const results = await connection.query(
        "DELETE FROM investments \
        WHERE project_id = ? \
        AND id = ?",
        [
            req.params.project_id,
            req.params.investment_id,
        ]
    )
    //console.log(results)
    res.sendStatus(204);
}

export const updateInvestment = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "UPDATE investments SET ? \
        WHERE project_id = ? \
        AND id = ?",
        [
            req.body,
            req.params.project_id,
            req.params.investment_id,
        ]);
    //console.log(results)
    // This way of returning is in the web response, not console, so we are returning the insertId of the
    //      new element and the data we sent
    res.json({
        changes_made: results.info,
        ...req.body,
    });
}

//#endregion

//#region clients

/////////////////////////// CLIENTS ///////////////////////////

export const getClients = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "SELECT * FROM clients \
        WHERE project_id = ?",
    [
        req.params.project_id,
    ],
    function(error,results){
        console.log(error)
        console.log(results)
    });
    res.json(results)
}

export const getClient = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "SELECT * FROM clients \
        WHERE project_id = ? \
        AND id = ?",
    [
        req.params.project_id,
        req.params.client_id
    ],
    function(error,results){
        console.log(error)
        console.log(results)
    });
    res.json(results[0])
}

export const createClient = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "INSERT INTO clients (project_id, client_name, client_description) \
        VALUES (?, ?, ?)",
        [
            req.params.project_id,
            req.body.client_name,
            req.body.client_description
        ],
        function(error,results){
            console.log(error)
            console.log(results)
        });
    //console.log(results)
    // This way of returning is in the web response, not console, so we are returning the insertId of the
    //      new element and the data we sent
    res.json({
        id: results.insertId,
        ...req.body,
    });
}

export const deleteClient = async (req, res) => {
    const connection = await connect();
    const results = await connection.query(
        "DELETE FROM clients \
        WHERE project_id = ? \
        AND id = ?",
        [
            req.params.project_id,
            req.params.client_id,
        ]
    )
    //console.log(results)
    res.sendStatus(204);
}

export const updateClient = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "UPDATE clients SET ? \
        WHERE project_id = ? \
        AND id = ?",
        [
            req.body,
            req.params.project_id,
            req.params.client_id,
        ]);
    //console.log(results)
    // This way of returning is in the web response, not console, so we are returning the insertId of the
    //      new element and the data we sent
    res.json({
        changes_made: results.info,
        ...req.body,
    });
}

//#endregion

//#region categories

/////////////////////////// CATEGORIES ///////////////////////////


//#endregion

//#region orders

/////////////////////////// ORDERS ///////////////////////////


//#endregion

//#region sales

/////////////////////////// SALES ///////////////////////////


//#endregion

//#region order_product

/////////////////////////// ORDER_PRODUCT /////////////////////////// 


//#endregion

//#region sales_product

/////////////////////////// SALES_PRODUCT /////////////////////////// 

//#endregion