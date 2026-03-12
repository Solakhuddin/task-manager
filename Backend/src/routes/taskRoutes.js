// const express = require('express');
import express from 'express';
import { addTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/tasksController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware); 
router.get('', getTasks);
router.get('/:id', getTaskById);
router.post('', addTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;