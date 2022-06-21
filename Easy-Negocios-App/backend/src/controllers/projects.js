import { connect } from '../database'

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
        function (error, results) {
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
        "DELETE FROM order_product_relation WHERE project_id = ?;\
        DELETE FROM sales_product_relation WHERE project_id = ?;\
        DELETE FROM orders WHERE project_id = ?;\
        DELETE FROM sales WHERE project_id = ?;\
        DELETE FROM products WHERE project_id = ?;\
        DELETE FROM categories WHERE project_id = ?;\
        DELETE FROM investments WHERE project_id = ?;\
        DELETE FROM clients WHERE project_id = ?;\
        DELETE FROM projects WHERE id = ?",
        [
            req.params.id,
            req.params.id,
            req.params.id,
            req.params.id,
            req.params.id,
            req.params.id,
            req.params.id,
            req.params.id,
            req.params.id
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
        WHERE project_id = ? \
        AND active = 1",
        [
            req.params.project_id,
        ],
        function (error, results) {
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
        function (error, results) {
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
        function (error, results) {
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
        "UPDATE products \
        SET active = 0 \
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
        "UPDATE products SET active = 0 \
        WHERE project_id = ? \
        AND id = ?; \
        INSERT INTO products (project_id, product_name, category_id, \
            product_description, net_price, gross_price, stock, measure_unit) \
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
            req.params.project_id,
            req.params.product_id,
            req.params.project_id,
            req.body.product_name,
            req.body.category_id,
            req.body.product_description,
            req.body.net_price,
            req.body.gross_price,
            req.body.stock,
            req.body.measure_unit

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
        WHERE project_id = ? \
        AND active = 1",
        [
            req.params.project_id,
        ],
        function (error, results) {
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
        function (error, results) {
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
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
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
        function (error, results) {
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
        "UPDATE investments \
        SET active = 0 \
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
        WHERE project_id = ? \
        AND active = 1",
        [
            req.params.project_id,
        ],
        function (error, results) {
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
        function (error, results) {
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
        function (error, results) {
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
        "UPDATE clients \
        SET active = 0 \
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

export const getOrdersByClient = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "SELECT * FROM orders \
        WHERE project_id = ? \
        AND client_id = ? \
        AND active = 1",
        [
            req.params.project_id,
            req.params.client_id
        ],
        function (error, results) {
            console.log(error)
            console.log(results)
        });
    res.json(results)
}

//#endregion

//#region categories

/////////////////////////// CATEGORIES ///////////////////////////

export const getCategories = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "SELECT * FROM categories \
        WHERE project_id = ? \
        AND active = 1",
        [
            req.params.project_id,
        ],
        function (error, results) {
            console.log(error)
            console.log(results)
        });
    res.json(results)
}

export const getCategory = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "SELECT * FROM categories \
        WHERE project_id = ? \
        AND id = ?",
        [
            req.params.project_id,
            req.params.category_id
        ],
        function (error, results) {
            console.log(error)
            console.log(results)
        });
    res.json(results[0])
}

export const createCategory = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "INSERT INTO categories (project_id, category_name, category_description) \
        VALUES (?, ?, ?)",
        [
            req.params.project_id,
            req.body.category_name,
            req.body.category_description
        ],
        function (error, results) {
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

export const deleteCategory = async (req, res) => {
    const connection = await connect();
    const results = await connection.query(
        "UPDATE categories \
        SET active = 0 \
        WHERE project_id = ? \
        AND id = ?",
        [
            req.params.project_id,
            req.params.category_id,
        ]
    )
    //console.log(results)
    res.sendStatus(204);
}

export const updateCategory = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "UPDATE categories SET ? \
        WHERE project_id = ? \
        AND id = ?",
        [
            req.body,
            req.params.project_id,
            req.params.category_id,
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

//#region orders

/////////////////////////// ORDERS ///////////////////////////

export const getOrders = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "SELECT * FROM orders \
        WHERE project_id = ? \
        AND active = 1",
        [
            req.params.project_id,
        ],
        function (error, results) {
            console.log(error)
            console.log(results)
        });
    res.json(results)
}

export const getLastOrder = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "SELECT MAX( id ) AS id FROM orders",
        [
            req.params.project_id,
        ],
        function (error, results) {
            console.log(error)
            console.log(results)
        });
    res.json(results[0])
}

export const getOrder = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "SELECT * FROM orders \
        WHERE project_id = ? \
        AND id = ?",
        [
            req.params.project_id,
            req.params.order_id
        ],
        function (error, results) {
            console.log(error)
            console.log(results)
        });
    res.json(results[0])
}

export const createOrder = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "INSERT INTO orders (project_id, client_id, delivery_date, order_description, address) \
        VALUES (?, ?, ?, ?, ?)",
        [
            req.params.project_id,
            req.body.client_id,
            req.body.delivery_date,
            req.body.order_description,
            req.body.address
        ],
        function (error, results) {
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

export const deleteOrder = async (req, res) => {
    const connection = await connect();
    const results = await connection.query(
        "UPDATE orders \
        SET active = 0 \
        WHERE project_id = ? \
        AND id = ?",
        [
            req.params.project_id,
            req.params.order_id,
        ]
    )
    //console.log(results)
    res.sendStatus(204);
}

export const updateOrder = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "UPDATE orders SET ? \
        WHERE project_id = ? \
        AND id = ?",
        [
            req.body,
            req.params.project_id,
            req.params.order_id,
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

//#region sales

/////////////////////////// SALES ///////////////////////////

export const getSales = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "SELECT * FROM sales \
        WHERE project_id = ? \
        AND active = 1",
        [
            req.params.project_id,
        ],
        function (error, results) {
            console.log(error)
            console.log(results)
        });
    res.json(results)
}

export const getSale = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "SELECT * FROM sales \
        WHERE project_id = ? \
        AND id = ?",
        [
            req.params.project_id,
            req.params.sale_id
        ],
        function (error, results) {
            console.log(error)
            console.log(results)
        });
    res.json(results[0])
}

export const createSale = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "INSERT INTO sales (project_id, total_net_price, total_gross_price, \
            ticket, sale_description, sale_date) \
        VALUES (?, ?, ?, ?, ?, ?)",
        [
            req.params.project_id,
            req.body.total_net_price,
            req.body.total_gross_price,
            req.body.ticket,
            req.body.sale_description,
            req.body.sale_date
        ],
        function (error, results) {
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

export const deleteSale = async (req, res) => {
    const connection = await connect();
    const results = await connection.query(
        "UPDATE sales \
        SET active = 0 \
        WHERE project_id = ? \
        AND id = ?",
        [
            req.params.project_id,
            req.params.sale_id,
        ]
    )
    //console.log(results)
    res.sendStatus(204);
}

export const updateSale = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "UPDATE sales SET ? \
        WHERE project_id = ? \
        AND id = ?",
        [
            req.body,
            req.params.project_id,
            req.params.sale_id,
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

//#region order_product

/////////////////////////// ORDER_PRODUCT /////////////////////////// 

export const getOrdersList = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "SELECT order_product_relation.project_id, order_product_relation.id, products.product_name as productName, products.measure_unit, order_product_relation.cuantity, products.net_price as productNetPrice, products.gross_price as productGrossPrice, orders.order_description, orders.delivery_date, orders.address, clients.client_name, clients.client_description \
        FROM order_product_relation \
        INNER JOIN \
        products \
        ON order_product_relation.product_id=products.id \
        INNER JOIN \
        orders \
        ON order_product_relation.order_id=orders.id \
        INNER JOIN \
        clients \
        ON orders.client_id=clients.id \
        WHERE order_product_relation.active=1 \
        AND order_product_relation.project_id = ?",
        [
            req.params.project_id,
        ],
        function (error, results) {
            console.log(error)
            console.log(results)
        });
    res.json(results)
}

export const getOrderItem = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "SELECT order_product_relation.project_id, order_product_relation.id, products.product_name as productName, products.measure_unit, order_product_relation.cuantity, products.net_price as productNetPrice, products.gross_price as productGrossPrice, orders.order_description, orders.delivery_date, orders.address, clients.client_name, clients.client_description, clients.id as client_id, products.id as product_id \
        FROM order_product_relation \
        INNER JOIN \
        products \
        ON order_product_relation.product_id=products.id \
        INNER JOIN \
        orders \
        ON order_product_relation.order_id=orders.id \
        INNER JOIN \
        clients \
        ON orders.client_id=clients.id \
        WHERE order_product_relation.active = 1 \
        AND order_product_relation.project_id = ? \
        AND order_product_relation.id = ?",
        [
            req.params.project_id,
            req.params.order_product_relation_id
        ],
        function (error, results) {
            console.log(error)
            console.log(results)
        });
    res.json(results[0])
}

export const createOrderItem = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "INSERT INTO orders (project_id, client_id, delivery_date, order_description, address) \
        VALUES (?, ?, ?, ?, ?); \
        SET @last_order_id = LAST_INSERT_ID();\
        INSERT INTO order_product_relation (project_id, order_id, product_id, cuantity) \
        VALUES (?, @last_order_id, ?, ?)",
        [
            req.params.project_id,
            req.body.client_id,
            req.body.delivery_date,
            req.body.order_description,
            req.body.address,
            req.params.project_id,
            req.body.product_id,
            req.body.cuantity
        ],
        function (error, results) {
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

export const deleteOrderItem = async (req, res) => {
    const connection = await connect();
    const results = await connection.query(
        "UPDATE order_product_relation \
        SET active = 0 \
        WHERE project_id = ? \
        AND id = ?; \
        SET @order_relation_id = (SELECT order_id FROM order_product_relation WHERE project_id = ? AND id = ?); \
        UPDATE orders \
        SET active = 0 \
        WHERE id = @order_relation_id;",
        [
            req.params.project_id,
            req.params.order_product_relation_id,
            req.params.project_id,
            req.params.order_product_relation_id
        ]
    )
    //console.log(results)
    res.sendStatus(204);
}

export const updateOrderItem = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "UPDATE order_product_relation \
        SET product_id = ?, \
        cuantity = ? \
        WHERE project_id = ? \
        AND id = ?; \
        SET @order_relation_id = (SELECT order_id FROM order_product_relation WHERE project_id = ? AND id = ?); \
        UPDATE orders \
        SET client_id = ?, \
        delivery_date = ?, \
        order_description = ?, \
        address = ? \
        WHERE id = @order_relation_id ",
        [
            req.body.product_id,
            req.body.cuantity,
            req.params.project_id,
            req.params.sale_product_relation_id,
            req.params.project_id,
            req.params.sale_product_relation_id,
            req.body.client_id,
            req.body.delivery_date,
            req.body.order_description,
            req.body.address
        ]);
    console.log(results)
    // This way of returning is in the web response, not console, so we are returning the insertId of the
    //      new element and the data we sent
    res.json({
        changes_made: results.info,
        ...req.body,
    });
}

//#endregion

//#region sales_product

/////////////////////////// SALES_PRODUCT /////////////////////////// 

export const getSalesList = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "SELECT sales_product_relation.project_id, sales_product_relation.id, products.product_name as productName, products.measure_unit, sales_product_relation.cuantity, products.net_price as productNetPrice, products.gross_price as productGrossPrice, sales.sale_description, sales.total_net_price, sales.total_gross_price \
        FROM sales_product_relation \
        INNER JOIN \
        products \
        ON sales_product_relation.product_id=products.id \
        INNER JOIN \
        sales \
        ON sales_product_relation.sales_id=sales.id \
        WHERE sales_product_relation.active=1 \
        AND sales_product_relation.project_id = ?",
        [
            req.params.project_id,
        ],
        function (error, results) {
            console.log(error)
            console.log(results)
        });
    res.json(results)
}

export const getSaleItem = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "SELECT sales_product_relation.project_id, sales_product_relation.id, products.product_name as productName, products.id as product_id, products.measure_unit, sales_product_relation.cuantity, products.net_price as productNetPrice, products.gross_price as productGrossPrice, sales.sale_description, sales.total_net_price, sales.total_gross_price, sales.ticket as ticket \
        FROM sales_product_relation \
        INNER JOIN \
        products \
        ON sales_product_relation.product_id=products.id \
        INNER JOIN \
        sales \
        ON sales_product_relation.sales_id=sales.id \
        WHERE sales_product_relation.active=1 \
        AND sales_product_relation.project_id = ? \
        AND sales_product_relation.id = ?",
        [
            req.params.project_id,
            req.params.sale_product_relation_id
        ],
        function (error, results) {
            console.log(error)
            console.log(results)
        });
    res.json(results[0])
}

export const createSaleItem = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "INSERT INTO sales (project_id, total_net_price, total_gross_price, ticket, sale_description, sale_date) \
        VALUES (?, ?, ?, ?, ?, ?); \
        SET @last_order_id = LAST_INSERT_ID();\
        INSERT INTO sales_product_relation (project_id, sales_id, product_id, cuantity) \
        VALUES (?, @last_order_id, ?, ?)",
        [
            req.params.project_id,
            req.body.total_net_price,
            req.body.total_gross_price,
            req.body.ticket,
            req.body.sale_description,
            req.body.sale_date,
            req.params.project_id,
            req.body.product_id,
            req.body.cuantity
        ],
        function (error, results) {
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

export const deleteSaleItem = async (req, res) => {
    const connection = await connect();
    const results = await connection.query(
        "UPDATE sales_product_relation \
        SET active = 0 \
        WHERE project_id = ? \
        AND id = ?; \
        SET @sale_relation_id = (SELECT sales_id FROM sales_product_relation WHERE project_id = ? AND id = ?); \
        UPDATE sales \
        SET active = 0 \
        WHERE id = @sale_relation_id;",
        [
            req.params.project_id,
            req.params.sale_product_relation_id,
            req.params.project_id,
            req.params.sale_product_relation_id,
        ]
    )
    //console.log(results)
    res.sendStatus(204);
}

export const updateSaleItem = async (req, res) => {
    const connection = await connect();
    const [results] = await connection.query(
        "UPDATE sales_product_relation \
        SET product_id = ?, \
        cuantity = ? \
        WHERE project_id = ? \
        AND id = ?; \
        SET @sale_relation_id = (SELECT sales_id FROM sales_product_relation WHERE project_id = ? AND id = ?); \
        UPDATE sales \
        SET total_net_price = ?, \
        total_gross_price = ?, \
        ticket = ?, \
        sale_description = ?, \
        sale_date = ? \
        WHERE id = @sale_relation_id ",
        [
            req.body.product_id,
            req.body.cuantity,
            req.params.project_id,
            req.params.sale_product_relation_id,
            req.params.project_id,
            req.params.sale_product_relation_id,
            req.body.total_net_price,
            req.body.total_gross_price,
            req.body.ticket,
            req.body.sale_description,
            req.body.sale_date
        ]);
    console.log(results)
    // This way of returning is in the web response, not console, so we are returning the insertId of the
    //      new element and the data we sent
    res.json({
        changes_made: results.info,
        ...req.body,
    });
}

//#endregion