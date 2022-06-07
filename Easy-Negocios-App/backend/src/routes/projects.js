import { Router } from 'express';
import {
    createProject,
    deleteProject,
    getProject,
    getProjects,
    updateProject,
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    getInvestments,
    getInvestment,
    createInvestment,
    deleteInvestment,
    updateInvestment,
    getClients,
    getClient,
    getOrdersByClient,
    createClient,
    deleteClient,
    updateClient,
    getCategories,
    getCategory,
    createCategory,
    deleteCategory,
    updateCategory,
    getOrders,
    getLastOrder,
    getOrder,
    createOrder,
    deleteOrder,
    updateOrder,
    getSales,
    getSale,
    createSale,
    deleteSale,
    updateSale,
    getOrdersList,
    getOrderItem,
    createOrderItem,
    deleteOrderItem,
    updateOrderItem,
    getSalesList,
    getSaleItem,
    createSaleItem,
    deleteSaleItem,
    updateSaleItem
} from '../controllers/projects';

const router = Router();

//#region projects

/////////////////////////// PROJECTS ///////////////////////////

/**
 * @swagger
 * tags:
 *  name: Projects
 *  description: Project management endpoints
 */

/**
 * @swagger
 * /projects:
 *  get:
 *      summary: Get all projects
 *      tags: [Projects]
 */
router.get('/projects', getProjects)

/**
 * @swagger
 * /projects/{id}:
 *  get:
 *      summary: Get a specific project by id
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID of the project to retrieve.
 *            schema:
 *              type: integer
 *      tags: [Projects]
 */
router.get('/projects/:id', getProject)

/**
 * @swagger
 * /projects:
 *  post:
 *      summary: Saves a project into the DB
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "Project object that needs to be added to the DB"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            project_name:
 *              type: string
 *              description: The project name.
 *              example: Minimarket
 *            project_description:
 *              type: string
 *              description: Brief description of the project
 *              example: Fruit and vegetables marketplace.
 *      tags: [Projects]
 */
router.post('/projects', createProject)

/**
 * @swagger
 * /projects/{id}:
 *  delete:
 *      summary: Deletes a specific project by id
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID of the project to delete.
 *            schema:
 *              type: integer
 *      tags: [Projects]
 */
router.delete('/projects/:id', deleteProject)

/**
 * @swagger
 * /projects/{id}:
 *  put:
 *      summary: Updates a project into the DB
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *      - name: "id"
 *        in: "path"
 *        description: "Id of the project that needs to be updated"
 *        type: "string"
 *        required: true
 *      - in: "body"
 *        name: "body"
 *        description: "Project object that needs to be added to te DB"
 *        required: true
 *        schema:
 *          type: object
 *          properties:
 *            project_name:
 *              type: string
 *              description: The project name.
 *              example: Minimarket
 *            project_description:
 *              type: string
 *              description: Brief description of the project
 *              example: Fruit and vegetables marketplace.
 *      tags: [Projects]
 */
router.put('/projects/:id', updateProject)

//#endregion

//#region products

/////////////////////////// PRODUCTS ///////////////////////////

/**
 * @swagger
 * tags:
 *  name: Products
 *  description: Product management Endpoints
 */

/**
 * @swagger
 * /projects/{project_id}/products:
 *  get:
 *      summary: Get products of a specific project
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID of the project that contains the products.
 *            schema:
 *              type: integer
 *      tags: [Products]
 */
router.get('/projects/:project_id/products', getProducts)

/**
* @swagger
* /projects/{project_id}/products/{product_id}:
*  get:
*      summary: Get a specific product by id
*      parameters:
*          - in: path
*            name: project_id
*            required: true
*            description: Numeric ID of the project to retrieve.
*            schema:
*              type: integer
*          - in: path
*            name: product_id
*            required: true
*            description: Numeric ID of the product to retrieve.
*            schema:
*              type: integer
*      tags: [Products]
*/
router.get('/projects/:project_id/products/:product_id', getProduct)

/**
 * @swagger
 * /projects/{project_id}/products:
 *  post:
 *      summary: Saves a product into a specific project in the db
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *          - in: "path"
 *            name: project_id
 *            required: true
 *            description: Numeric ID of the project to select.
 *            schema:
 *              type: integer
 *          - in: "body"
 *            name: "body"
 *            description: "Product object that needs to be added to the DB"
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  product_name:
 *                      type: string
 *                      description: Name of the product.
 *                      example: Asparragus
 *                  category_id:
 *                      type: integer
 *                      description: The category id.
 *                      example: 2
 *                      required: false
 *                  product_description:
 *                      type: string
 *                      description: Brief description of the product.
 *                      example: The green ones with a funny top
 *                      required: false
 *                  net_price:
 *                      type: integer
 *                      description: The product price in which it will be sold per unit.
 *                      example: 1000
 *                  gross_price:
 *                      type: integer
 *                      description: The product price without taxes per unit.
 *                      example: 850
 *                  stock:
 *                      type: integer
 *                      description: The amount of available products.
 *                      example: 20
 *                  measure_unit:
 *                      type: string
 *                      description: The stock measurement unit.
 *                      example: meters
 *                      required: false
 *      tags: [Products]
 */
router.post('/projects/:project_id/products', createProduct)

/**
* @swagger
* /projects/{project_id}/products/{product_id}:
*  delete:
*      summary: Practically deletes a specific product by id, checking project_id too. Really updates the Active column to 0
*      parameters:
*          - in: path
*            name: project_id
*            required: true
*            description: Numeric ID of the project to select.
*            schema:
*              type: integer
*          - in: path
*            name: product_id
*            required: true
*            description: Numeric ID of the product to delete.
*            schema:
*              type: integer
*      tags: [Products]
*/
router.delete('/projects/:project_id/products/:product_id', deleteProduct)

/**
 * @swagger
 * /projects/{project_id}/products/{product_id}:
 *  put:
 *      summary: Updates a product in the DB
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *          - in: "path"
 *            name: project_id
 *            required: true
 *            description: Numeric ID of the project to select.
 *            schema:
 *              type: integer
 *          - in: "path"
 *            name: product_id
 *            required: true
 *            description: Numeric ID of the product to update.
 *            schema:
 *              type: integer
 *          - in: "body"
 *            name: "body"
 *            description: "Product object that will be replazed in the DB"
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  product_name:
 *                      type: string
 *                      description: Name of the product.
 *                      example: Asparragus
 *                  category_id:
 *                      type: integer
 *                      description: The category id.
 *                      example: 2
 *                      required: false
 *                  product_description:
 *                      type: string
 *                      description: Brief description of the product.
 *                      example: The green ones with a funny top
 *                      required: false
 *                  net_price:
 *                      type: integer
 *                      description: The product price in which it will be sold per unit.
 *                      example: 1000
 *                  gross_price:
 *                      type: integer
 *                      description: The product price without taxes per unit.
 *                      example: 850
 *                  stock:
 *                      type: integer
 *                      description: The amount of available products.
 *                      example: 20
 *                  measure_unit:
 *                      type: string
 *                      description: The stoch measurement unit.
 *                      example: meters
 *                      required: false
 *      tags: [Products]
 */
router.put('/projects/:project_id/products/:product_id', updateProduct)

//#endregion

//#region investments

/////////////////////////// INVESTMENTS ///////////////////////////

/**
 * @swagger
 * tags:
 *  name: Investments
 *  description: Investments management Endpoints
 */

/**
 * @swagger
 * /projects/{project_id}/investments:
 *  get:
 *      summary: Get investments of a specific project
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID of the project that contains the investments.
 *            schema:
 *              type: integer
 *      tags: [Investments]
 */
router.get('/projects/:project_id/investments', getInvestments)

/**
* @swagger
* /projects/{project_id}/investments/{investment_id}:
*  get:
*      summary: Get a specific investments by id and project_id
*      parameters:
*          - in: path
*            name: project_id
*            required: true
*            description: Numeric ID of the project to retrieve.
*            schema:
*              type: integer
*          - in: path
*            name: investments_id
*            required: true
*            description: Numeric ID of the investments to retrieve.
*            schema:
*              type: integer
*      tags: [Investments]
*/
router.get('/projects/:project_id/investments/:investment_id', getInvestment)

/**
 * @swagger
 * /projects/{project_id}/investments:
 *  post:
 *      summary: Saves an investment into a specific project in the db
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *          - in: "path"
 *            name: project_id
 *            required: true
 *            description: Numeric ID of the project to select.
 *            schema:
 *              type: integer
 *          - in: "body"
 *            name: "body"
 *            description: "Investment object that needs to be added to the DB"
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  total_net_price:
 *                      type: integer
 *                      description: Amount of money spent.
 *                      example: 1500
 *                  total_gross_price:
 *                      type: integer
 *                      description: Amount of money spent without taxes.
 *                      example: 1200
 *                      required: false
 *                  ticket:
 *                      type: bool
 *                      description: If the investment was with ticket (true) or Invoice/Bill (false)
 *                      example: 1
 *                      required: false
 *                  investment_description:
 *                      type: string
 *                      description: The description of the investment
 *                      example: 20 carrots, a coffee machine and dog food
 *                  investment_date:
 *                      type: timestamp
 *                      description: The date of the investment
 *                      example: 2022-04-16 12:34:20
 *                  owned_product:
 *                      type: bool
 *                      description: If the investment include a buy and sell item (so stock can be updated)
 *                      example: 0
 *                  cuantity:
 *                      type: integer
 *                      description: How many (unit measure) have been bought
 *                      example: 5
 *                      required: false
 *      tags: [Investments]
 */
router.post('/projects/:project_id/investments', createInvestment)

/**
* @swagger
* /projects/{project_id}/investments/{investment_id}:
*  delete:
*      summary: Practically delete a specific Investment by id, checking project_id too. Really updates the Active column to 0
*      parameters:
*          - in: path
*            name: project_id
*            required: true
*            description: Numeric ID of the project to select.
*            schema:
*              type: integer
*          - in: path
*            name: investment_id
*            required: true
*            description: Numeric ID of the investment to delete.
*            schema:
*              type: integer
*      tags: [Investments]
*/
router.delete('/projects/:project_id/investments/:investment_id', deleteInvestment)

/**
 * @swagger
 * /projects/{project_id}/investments/{investment_id}:
 *  put:
 *      summary: Updates an investment in the DB
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *          - in: "path"
 *            name: project_id
 *            required: true
 *            description: Numeric ID of the project to select.
 *            schema:
 *              type: integer
 *          - in: "path"
 *            name: investment_id
 *            required: true
 *            description: Numeric ID of the investment to update.
 *            schema:
 *              type: integer
 *          - in: "body"
 *            name: "body"
 *            description: "Investment object that needs to be added to the DB"
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  total_net_price:
 *                      type: integer
 *                      description: Amount of money spent.
 *                      example: 1111
 *                  total_gross_price:
 *                      type: integer
 *                      description: Amount of money spent without taxes.
 *                      example: 888
 *                      required: false
 *                  ticket:
 *                      type: bool
 *                      description: If the investment was with ticket (true) or Invoice/Bill (false)
 *                      example: 1
 *                      required: false
 *                  investment_description:
 *                      type: string
 *                      description: The description of the investment
 *                      example: 20 carrots, a coffee machine and dog food, but updated
 *                  owned_products:
 *                      type: bool
 *                      description: If the investment include a buy and sell item (so stock can be updated)
 *                      example: 0
 *                  cuantity:
 *                      type: integer
 *                      description: How many (unit measure) have been bought
 *                      example: 5
 *                      required: false
 *      tags: [Investments]
 */
router.put('/projects/:project_id/investments/:investment_id', updateInvestment)

//#endregion

//#region clients

/////////////////////////// CLIENTS ///////////////////////////

/**
 * @swagger
 * tags:
 *  name: Clients
 *  description: Clients management Endpoints
 */

/**
 * @swagger
 * /projects/{project_id}/clients:
 *  get:
 *      summary: Get clients of a specific project
 *      parameters:
 *          - in: path
 *            name: project_id
 *            required: true
 *            description: Numeric ID of the project that contains the clients.
 *            schema:
 *              type: integer
 *      tags: [Clients]
 */
router.get('/projects/:project_id/clients', getClients)

/**
* @swagger
* /projects/{project_id}/clients/{client_id}:
*  get:
*      summary: Get a specific client by id and project_id
*      parameters:
*          - in: path
*            name: project_id
*            required: true
*            description: Numeric ID of the project to retrieve.
*            schema:
*              type: integer
*          - in: path
*            name: client_id
*            required: true
*            description: Numeric ID of the client to retrieve.
*            schema:
*              type: integer
*      tags: [Clients]
*/
router.get('/projects/:project_id/clients/:client_id', getClient)

/**
 * @swagger
 * /projects/{project_id}/clients:
 *  post:
 *      summary: Saves a client into a specific project in the db
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *          - in: "path"
 *            name: project_id
 *            required: true
 *            description: Numeric ID of the project to select.
 *            schema:
 *              type: integer
 *          - in: "body"
 *            name: "body"
 *            description: "Client object that needs to be added to the DB"
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  client_name:
 *                      type: string
 *                      description: Name of the client.
 *                      example: John Doe
 *                  client_description:
 *                      type: string
 *                      description: Brief description of the client.
 *                      example: The blonde one that buys a lot of apples
 *                      required: false
 *      tags: [Clients]
 */
router.post('/projects/:project_id/clients', createClient)

/**
* @swagger
* /projects/{project_id}/clients/{client_id}:
*  delete:
*      summary: Practically delete a specific client by id, checking project_id too. Really updates the Active column to 0
*      parameters:
*          - in: path
*            name: project_id
*            required: true
*            description: Numeric ID of the project to select.
*            schema:
*              type: integer
*          - in: path
*            name: client_id
*            required: true
*            description: Numeric ID of the client to delete.
*            schema:
*              type: integer
*      tags: [Clients]
*/
router.delete('/projects/:project_id/clients/:client_id', deleteClient)

/**
 * @swagger
 * /projects/{project_id}/clients/{client_id}:
 *  put:
 *      summary: Updates a client in the DB
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *          - in: "path"
 *            name: project_id
 *            required: true
 *            description: Numeric ID of the project to select.
 *            schema:
 *              type: integer
 *          - in: "path"
 *            name: client_id
 *            required: true
 *            description: Numeric ID of the client to update.
 *            schema:
 *              type: integer
 *          - in: "body"
 *            name: "body"
 *            description: "Client object that needs to be updated in the DB"
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  client_name:
 *                      type: string
 *                      description: Name of the client.
 *                      example: John Doe
 *                  client_description:
 *                      type: string
 *                      description: Brief description of the client.
 *                      example: The blonde one that buys a lot of apples
 *                      required: false
 *      tags: [Clients]
 */
router.put('/projects/:project_id/clients/:client_id', updateClient)

/**
 * @swagger
 * /projects/{project_id}/client/{client_id}/orders:
 *  get:
 *      summary: Get a specific orders by client
 *      parameters:
 *          - in: path
 *            name: project_id
 *            required: true
 *            description: Numeric ID of the project to retrieve.
 *            schema:
 *              type: integer
 *          - in: path
 *            name: client_id
 *            required: true
 *            description: Numeric ID of the client to select.
 *            schema:
 *              type: integer
 *      tags: [Clients]
 */
router.get('/projects/:project_id/client/:client_id/orders', getOrdersByClient)

//#endregion

//#region categories

/////////////////////////// CATEGORIES ///////////////////////////

/**
 * @swagger
 * tags:
 *  name: Categories
 *  description: Categories management Endpoints
 */

/**
 * @swagger
 * /projects/{project_id}/categories:
 *  get:
 *      summary: Get categories of a specific project
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID of the project that contains the categories.
 *            schema:
 *              type: integer
 *      tags: [Categories]
 */
router.get('/projects/:project_id/categories', getCategories)

/**
* @swagger
* /projects/{project_id}/categories/{category_id}:
*  get:
*      summary: Get a specific category by id
*      parameters:
*          - in: path
*            name: project_id
*            required: true
*            description: Numeric ID of the project to select.
*            schema:
*              type: integer
*          - in: path
*            name: categorie_id
*            required: true
*            description: Numeric ID of the category to retrieve.
*            schema:
*              type: integer
*      tags: [Categories]
*/
router.get('/projects/:project_id/categories/:category_id', getCategory)

/**
 * @swagger
 * /projects/{project_id}/categories:
 *  post:
 *      summary: Saves a category into a specific project in the db
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *          - in: "path"
 *            name: project_id
 *            required: true
 *            description: Numeric ID of the project to select.
 *            schema:
 *              type: integer
 *          - in: "body"
 *            name: "body"
 *            description: "Category object that needs to be added to the DB"
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  category_name:
 *                      type: string
 *                      description: Name of the category.
 *                      example: Chocolates
 *                  category_description:
 *                      type: string
 *                      description: Brief description of the category.
 *                      example: Chocolate items, like brownie or cakes
 *                      required: false
 *      tags: [Categories]
 */
router.post('/projects/:project_id/categories', createCategory)

/**
* @swagger
* /projects/{project_id}/categories/{category_id}:
*  delete:
*      summary: Practically delete a specific category by id, checking project_id too. Really updates the Active column to 0
*      parameters:
*          - in: path
*            name: project_id
*            required: true
*            description: Numeric ID of the project to select.
*            schema:
*              type: integer
*          - in: path
*            name: categorie_id
*            required: true
*            description: Numeric ID of the category to delete.
*            schema:
*              type: integer
*      tags: [Categories]
*/
router.delete('/projects/:project_id/categories/:category_id', deleteCategory)

/**
 * @swagger
 * /projects/{project_id}/categories/{category_id}:
 *  put:
 *      summary: Updates a category in the DB
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *          - in: "path"
 *            name: project_id
 *            required: true
 *            description: Numeric ID of the project to select.
 *            schema:
 *              type: integer
 *          - in: "path"
 *            name: categorie_id
 *            required: true
 *            description: Numeric ID of the category to update.
 *            schema:
 *              type: integer
 *          - in: "body"
 *            name: "body"
 *            description: "Category object that needs to be added to the DB"
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  category_name:
 *                      type: string
 *                      description: Name of the category.
 *                      example: Chocolates
 *                  category_description:
 *                      type: string
 *                      description: Brief description of the category.
 *                      example: Chocolate items, like brownie or cakes
 *                      required: false
 *      tags: [Categories]
 */
router.put('/projects/:project_id/categories/:category_id', updateCategory)

//#endregion

//#region orders

/////////////////////////// ORDERS ///////////////////////////

/**
 * @swagger
 * tags:
 *  name: Orders
 *  description: Orders management Endpoints
 */

/**
 * @swagger
 * /projects/{project_id}/orders:
 *  get:
 *      summary: Get orders of a specific project
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID of the project that contains the orders.
 *            schema:
 *              type: integer
 *      tags: [Orders]
 */
router.get('/projects/:project_id/orders', getOrders)

/**
 * @swagger
 * /projects/{project_id}/orders/last:
 *  get:
 *      summary: Get last order ID
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID of the project that contains the orders.
 *            schema:
 *              type: integer
 *      tags: [Orders]
 */
 router.get('/projects/:project_id/orders/last', getLastOrder)

/**
* @swagger
* /projects/{project_id}/orders/{order_id}:
*  get:
*      summary: Get a specific order by id
*      parameters:
*          - in: path
*            name: project_id
*            required: true
*            description: Numeric ID of the project to retrieve.
*            schema:
*              type: integer
*          - in: path
*            name: order_id
*            required: true
*            description: Numeric ID of the order to retrieve.
*            schema:
*              type: integer
*      tags: [Orders]
*/
router.get('/projects/:project_id/orders/:order_id', getOrder)

/**
 * @swagger
 * /projects/{project_id}/orders:
 *  post:
 *      summary: Saves an order into a specific project in the db
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *          - in: "path"
 *            name: project_id
 *            required: true
 *            description: Numeric ID of the project to select.
 *            schema:
 *              type: integer
 *          - in: "body"
 *            name: "body"
 *            description: "Order object that needs to be added to the DB"
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  client_id:
 *                      type: integer
 *                      description: ID of the client that made the order.
 *                      example: 4
 *                  delivery_date:
 *                      type: timestamp
 *                      description: The date and time when to deliver the order
 *                      example: 2022-04-06 13:46:26
 *                      required: false
 *                  order_description:
 *                      type: string
 *                      description: Brief description of the order.
 *                      example: 20 apples and 15 carrots.
 *                      required: false
 *                  address:
 *                      type: string
 *                      description: The address to deliver.
 *                      example: Main Street 1234, New York
 *                      required: false
 *      tags: [Orders]
 */
router.post('/projects/:project_id/orders', createOrder)

/**
* @swagger
* /projects/{project_id}/orders/{order_id}:
*  delete:
*      summary: Practically delete a specific order by id, checking project_id too. Really updates the Active column to 0
*      parameters:
*          - in: path
*            name: project_id
*            required: true
*            description: Numeric ID of the project to select.
*            schema:
*              type: integer
*          - in: path
*            name: order_id
*            required: true
*            description: Numeric ID of the order to delete.
*            schema:
*              type: integer
*      tags: [Orders]
*/
router.delete('/projects/:project_id/orders/:order_id', deleteOrder)

/**
 * @swagger
 * /projects/{project_id}/orders/{order_id}:
 *  put:
 *      summary: Updates an order in the DB
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *          - in: "path"
 *            name: project_id
 *            required: true
 *            description: Numeric ID of the project to select.
 *            schema:
 *              type: integer
 *          - in: "path"
 *            name: order_id
 *            required: true
 *            description: Numeric ID of the order to update.
 *            schema:
 *              type: integer
 *          - in: "body"
 *            name: "body"
 *            description: "Order object that needs to be added to the DB"
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  client_id:
 *                      type: integer
 *                      description: ID of the client that made the order.
 *                      example: 4
 *                  delivery_date:
 *                      type: timestamp
 *                      description: The date and time when to deliver the order
 *                      example: 2022-04-06 13:46:26
 *                      required: false
 *                  order_description:
 *                      type: string
 *                      description: Brief description of the order.
 *                      example: 20 apples and 15 carrots.
 *                      required: false
 *                  address:
 *                      type: string
 *                      description: The address to deliver.
 *                      example: Main Street 1234, New York
 *                      required: false
 *      tags: [Orders]
 */
router.put('/projects/:project_id/orders/:order_id', updateOrder)


//#endregion

//#region sales

/////////////////////////// SALES ///////////////////////////

/**
 * @swagger
 * tags:
 *  name: Sales
 *  description: Sales management Endpoints
 */

/**
 * @swagger
 * /projects/{project_id}/sales:
 *  get:
 *      summary: Get sales of a specific project
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID of the project that contains the sales.
 *            schema:
 *              type: integer
 *      tags: [Sales]
 */
router.get('/projects/:project_id/sales', getSales)

/**
* @swagger
* /projects/{project_id}/sales/{sale_id}:
*  get:
*      summary: Get a specific sale by id
*      parameters:
*          - in: path
*            name: project_id
*            required: true
*            description: Numeric ID of the project to retrieve.
*            schema:
*              type: integer
*          - in: path
*            name: sale_id
*            required: true
*            description: Numeric ID of the sale to retrieve.
*            schema:
*              type: integer
*      tags: [Sales]
*/
router.get('/projects/:project_id/sales/:sale_id', getSale)

/**
 * @swagger
 * /projects/{project_id}/sales:
 *  post:
 *      summary: Saves a sale into a specific project in the db
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *          - in: "path"
 *            name: project_id
 *            required: true
 *            description: Numeric ID of the project to select.
 *            schema:
 *              type: integer
 *          - in: "body"
 *            name: "body"
 *            description: "Sale object that needs to be added to the DB"
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  total_net_price:
 *                      type: integer
 *                      description: Total sale price after taxes.
 *                      example: 1500
 *                  total_gross_price:
 *                      type: integer
 *                      description: Total sale price before taxes.
 *                      example: 1800
 *                      required: false
 *                  ticket:
 *                      type: boolean
 *                      description: Defines if it was ticket or invoice/bill
 *                      example: 0
 *                      required: false
 *                  sale_description:
 *                      type: string
 *                      description: Brief description of the sale
 *                      example: 40 potatoes and 25 carrots
 *                  sale_date:
 *                      type: timestamp
 *                      description: Date of the sale.
 *                      example: 2022-04-06 16:43:55
 *      tags: [Sales]
 */
router.post('/projects/:project_id/sales', createSale)

/**
* @swagger
* /projects/{project_id}/sales/{sale_id}:
*  delete:
*      summary: Practically delete a specific sale by id, checking project_id too. Really updates the Active column to 0
*      parameters:
*          - in: path
*            name: project_id
*            required: true
*            description: Numeric ID of the project to select.
*            schema:
*              type: integer
*          - in: path
*            name: product_id
*            required: true
*            description: Numeric ID of the sale to delete.
*            schema:
*              type: integer
*      tags: [Sales]
*/
router.delete('/projects/:project_id/sales/:sale_id', deleteSale)

/**
 * @swagger
 * /projects/{project_id}/sales/{sale_id}:
 *  put:
 *      summary: Updates a sale in the DB
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *          - in: "path"
 *            name: project_id
 *            required: true
 *            description: Numeric ID of the project to select.
 *            schema:
 *              type: integer
 *          - in: "path"
 *            name: sale_id
 *            required: true
 *            description: Numeric ID of the sale to update.
 *            schema:
 *              type: integer
 *          - in: "body"
 *            name: "body"
 *            description: "Sale object that needs to be added to the DB"
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  total_net_price:
 *                      type: integer
 *                      description: Total sale price after taxes.
 *                      example: 1500
 *                  total_gross_price:
 *                      type: integer
 *                      description: Total sale price before taxes.
 *                      example: 1800
 *                      required: false
 *                  ticket:
 *                      type: boolean
 *                      description: Defines if it was ticket or invoice/bill
 *                      example: 0
 *                      required: false
 *                  sale_description:
 *                      type: string
 *                      description: Brief description of the sale
 *                      example: 40 potatoes and 25 carrots
 *                  sale_date:
 *                      type: timestamp
 *                      description: Date of the sale.
 *                      example: 2022-04-06 16:43:55
 *      tags: [Sales]
 */
router.put('/projects/:project_id/sales/:sale_id', updateSale)

//#endregion

//#region order_products

/////////////////////////// ORDER_PRODUCT_RELATION ///////////////////////////

/**
 * @swagger
 * tags:
 *  name: Order-Product-Relation
 *  description: Order-Product-Relation management Endpoints
 */

/**
 * @swagger
 * /projects/{project_id}/orders/list/all:
 *  get:
 *      summary: Get orders list of a specific project
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID of the project that contains the orders.
 *            schema:
 *              type: integer
 *      tags: [Order-Product-Relation]
 */
router.get('/projects/:project_id/orders/list/all', getOrdersList)

/**
* @swagger
* /projects/{project_id}/orders/list/{order_product_relation_id}:
*  get:
*      summary: Get a specific order by id
*      parameters:
*          - in: path
*            name: project_id
*            required: true
*            description: Numeric ID of the project to retrieve.
*            schema:
*              type: integer
*          - in: path
*            name: order_product_relation_id
*            required: true
*            description: Numeric ID of the relation to retrieve.
*            schema:
*              type: integer
*      tags: [Order-Product-Relation]
*/
router.get('/projects/:project_id/orders/list/:order_product_relation_id', getOrderItem)

/**
 * @swagger
 * /projects/{project_id}/orders/list:
 *  post:
 *      summary: Saves a orders relation into a specific project in the db
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *          - in: "path"
 *            name: project_id
 *            required: true
 *            description: Numeric ID of the project to select.
 *            schema:
 *              type: integer
 *          - in: "body"
 *            name: "body"
 *            description: "Order product relation object that needs to be added to the DB"
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  product_id:
 *                      type: integer
 *                      description: The product id to relate.
 *                      example: 3
 *                      required: true
 *                  cuantity:
 *                      type: integer
 *                      description: Cuantity of the product in the order.
 *                      example: 20
 *                      required: false
 *                  client_id:
 *                      type: integer
 *                      description: ID of the client that made the order.
 *                      example: 4
 *                  delivery_date:
 *                      type: timestamp
 *                      description: The date and time when to deliver the order
 *                      example: 2022-04-06 13:46:26
 *                      required: false
 *                  order_description:
 *                      type: string
 *                      description: Brief description of the order.
 *                      example: 20 apples and 15 carrots.
 *                      required: false
 *                  address:
 *                      type: string
 *                      description: The address to deliver.
 *                      example: Main Street 1234, New York
 *                      required: false
 *      tags: [Order-Product-Relation]
 */
router.post('/projects/:project_id/orders/list', createOrderItem)

/**
* @swagger
* /projects/{project_id}/orders/list/{order_product_relation_id}:
*  delete:
*      summary: Practically delete a specific relation by id, checking project_id too. Really updates the Active column to 0
*      parameters:
*          - in: path
*            name: project_id
*            required: true
*            description: Numeric ID of the project to select.
*            schema:
*              type: integer
*          - in: path
*            name: order_product_relation_id
*            required: true
*            description: Numeric ID of the relation to delete.
*            schema:
*              type: integer
*      tags: [Order-Product-Relation]
*/
router.delete('/projects/:project_id/orders/list/:order_product_relation_id', deleteOrderItem)

/**
 * @swagger
 * /projects/{project_id}/orders/list/{order_product_relation_id}:
 *  put:
 *      summary: Updates a Order Product relation in the DB
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *          - in: "path"
 *            name: project_id
 *            required: true
 *            description: Numeric ID of the project to select.
 *            schema:
 *              type: integer
 *          - in: "path"
 *            name: order_product_relation_id
 *            required: true
 *            description: Numeric ID of the relation to update.
 *            schema:
 *              type: integer
 *          - in: "body"
 *            name: "body"
 *            description: "Order product relation object that needs to be added to the DB"
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  order_id:
 *                      type: integer
 *                      description: The order id to relate.
 *                      example: 2
 *                      required: true
 *                  product_id:
 *                      type: integer
 *                      description: The product id to relate.
 *                      example: 3
 *                      required: true
 *                  cuantity:
 *                      type: integer
 *                      description: Cuantity of the product in the order.
 *                      example: 20
 *                      required: false
 *      tags: [Order-Product-Relation]
 */
router.put('/projects/:project_id/orders/list/:order_product_relation_id', updateOrderItem)

//#endregion

//#region sales_products

/////////////////////////// SALES_PRODUCT ///////////////////////////

/**
 * @swagger
 * tags:
 *  name: Sale-Product-Relation
 *  description: Sale-Product-Relation management Endpoints
 */

/**
 * @swagger
 * /projects/{project_id}/sales/list/all:
 *  get:
 *      summary: Get sales list of a specific project
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: Numeric ID of the project that contains the sales.
 *            schema:
 *              type: integer
 *      tags: [Sale-Product-Relation]
 */
router.get('/projects/:project_id/sales/list/all', getSalesList)

/**
* @swagger
* /projects/{project_id}/sales/list/{sale_product_relation_id}:
*  get:
*      summary: Get a specific sale item by id
*      parameters:
*          - in: path
*            name: project_id
*            required: true
*            description: Numeric ID of the project to retrieve.
*            schema:
*              type: integer
*          - in: path
*            name: sale_product_relation_id
*            required: true
*            description: Numeric ID of the relation to retrieve.
*            schema:
*              type: integer
*      tags: [Sale-Product-Relation]
*/
router.get('/projects/:project_id/sales/list/:sale_product_relation_id', getSaleItem)

/**
 * @swagger
 * /projects/{project_id}/sales/list:
 *  post:
 *      summary: Saves a sales relation into a specific project in the db
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *          - in: "path"
 *            name: project_id
 *            required: true
 *            description: Numeric ID of the project to select.
 *            schema:
 *              type: integer
 *          - in: "body"
 *            name: "body"
 *            description: "Sale product relation object that needs to be added to the DB"
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  sales_id:
 *                      type: integer
 *                      description: The sale id to relate.
 *                      example: 2
 *                      required: true
 *                  product_id:
 *                      type: integer
 *                      description: The product id to relate.
 *                      example: 3
 *                      required: true
 *                  cuantity:
 *                      type: integer
 *                      description: Cuantity of the product sold in the sale.
 *                      example: 20
 *                      required: false
 *      tags: [Sale-Product-Relation]
 */
router.post('/projects/:project_id/sales/list', createSaleItem)

/**
* @swagger
* /projects/{project_id}/sales/list/{sale_product_relation_id}:
*  delete:
*      summary: Practically delete a specific relation by id, checking project_id too. Really updates the Active column to 0
*      parameters:
*          - in: path
*            name: project_id
*            required: true
*            description: Numeric ID of the project to select.
*            schema:
*              type: integer
*          - in: path
*            name: sale_product_relation_id
*            required: true
*            description: Numeric ID of the relation to delete.
*            schema:
*              type: integer
*      tags: [Sale-Product-Relation]
*/
router.delete('/projects/:project_id/sales/list/:sale_product_relation_id', deleteSaleItem)

/**
 * @swagger
 * /projects/{project_id}/sales/list/{sale_product_relation_id}:
 *  put:
 *      summary: Updates a Sale Product relation in the DB
 *      consumes:
 *      - "application/json"
 *      produces:
 *      - "application/json"
 *      parameters:
 *          - in: "path"
 *            name: project_id
 *            required: true
 *            description: Numeric ID of the project to select.
 *            schema:
 *              type: integer
 *          - in: "path"
 *            name: order_product_relation_id
 *            required: true
 *            description: Numeric ID of the relation to update.
 *            schema:
 *              type: integer
 *          - in: "body"
 *            name: "body"
 *            description: "Sale product relation object that needs to be added to the DB"
 *            required: true
 *            schema:
 *              type: object
 *              properties:
 *                  sales_id:
 *                      type: integer
 *                      description: The sale id to relate.
 *                      example: 2
 *                      required: true
 *                  product_id:
 *                      type: integer
 *                      description: The product id to relate.
 *                      example: 3
 *                      required: true
 *                  cuantity:
 *                      type: integer
 *                      description: Cuantity of the product sold in the sale.
 *                      example: 20
 *                      required: false
 *      tags: [Sale-Product-Relation]
 */
router.put('/projects/:project_id/sales/list/:sale_product_relation_id', updateSaleItem)

//#endregion

export default router