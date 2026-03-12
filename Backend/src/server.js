// const express = require('express');
import express from 'express';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { connectToDatabase, disconnectFromDatabase } from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
connectToDatabase();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// --- KODE ERROR HANDLING & SHUTDOWN ---

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  // Tutup server dulu, baru database
  if (server) {
    server.close(async () => {
      await disconnectFromDatabase();
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectFromDatabase();
  process.exit(1);
});

// Graceful shutdown (misal: Ctrl+C)
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  if (server) {
    server.close(async () => {
      await disconnectFromDatabase();
      process.exit(0);
    });
  }
});