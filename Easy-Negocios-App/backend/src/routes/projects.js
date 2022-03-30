import { Router } from 'express';
import { createProject, deleteProject, getProject, getProjects, updateProject } from '../controllers/projects';

const router = Router();

router.get('/projects', getProjects)

router.get('/projects/:id', getProject)

router.post('/projects', createProject)

router.delete('/projects/:id', deleteProject)

router.put('/projects/:id', updateProject)

export default router