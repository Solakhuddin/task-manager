import {z} from 'zod';

const addTaskSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
});

const updateTaskSchema = z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional(),
    status: z.enum(["pending", "done"]).optional(),
    dueDate: z.string().optional(),
});

export { addTaskSchema, updateTaskSchema };