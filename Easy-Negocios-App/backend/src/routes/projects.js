import { Router } from 'express';
import { createProject, deleteProject, getProject, getProjects, updateProject } from '../controllers/projects';

const router = Router();

/**
 * @swagger
 * /projects:
 *  get:
 *      summary: Get all projects
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
 */
router.put('/projects/:id', updateProject)

export default router