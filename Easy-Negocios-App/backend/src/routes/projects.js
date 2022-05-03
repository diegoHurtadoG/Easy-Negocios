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
    createClient,
    deleteClient,
    updateClient } from '../controllers/projects';
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
 *      summary: Deletes a specific product by id, checking project_id too
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
  *      summary: Deletes a specific Investment by id, checking project_id too
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
  *      summary: Deletes a specific client by id, checking project_id too
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

//#region order_products

/////////////////////////// ORDER_PRODUCT /////////////////////////// {DONT KNOW IF API IS REQUIRED}


//#endregion

//#region sales_products

/////////////////////////// SALES_PRODUCT /////////////////////////// {DONT KNOW IF API IS REQUIRED}


//#endregion

export default router