import express from "express";
import cache from "./cache.mjs";
import { v4 as uuidv4 } from "uuid";
import winston from 'winston';

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console()
  ]
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to log all requests
app.use((req, res, next) => {
  logger.info(`Incoming request`, { method: req.method, url: req.originalUrl, ip: req.ip });
  next();
});

// add a book - request body should contain a title, status and an author
app.post("/reading-list/books", (req, res) => {
  const { title, author, status } = req.body;
  const uuid = uuidv4();
  const logContext = { method: req.method, url: req.originalUrl, ip: req.ip, body: req.body, generated_uuid: uuid };

  if (!(status === "read" || status === "to_read" || status === "reading")) {
    logger.warn("Invalid status provided for new book.", { ...logContext, error_message: "Status is invalid. Accepted statuses: read | to_read | reading" });
    return res.status(400).json({
      error: "Status is invalid. Accepted statuses: read | to_read | reading",
    });
  }
  if (!title || !author || !status) {
    logger.warn("Missing title, author, or status for new book.", { ...logContext, error_message: "Title, Status or Author is empty" });
    return res.status(400).json({ error: "Title, Status or Author is empty" });
  }
  const value = { uuid, title, author, status };
  cache.set(uuid, value, 86400);
  logger.info("Successfully added a new book.", { ...logContext, result_uuid: uuid, title, author });
  return res.status(201).json({ uuid, title, author });
});

// update status of a book by uuid
app.put("/reading-list/books/:uuid", (req, res) => {
  const bookUuid = req.params.uuid; // Renamed to avoid conflict with uuidv4 import
  const { status } = req.body;
  const logContext = { method: req.method, url: req.originalUrl, ip: req.ip, body: req.body, book_uuid: bookUuid };

  if (!bookUuid || typeof bookUuid !== "string") {
    logger.warn("Missing or invalid UUID for book update.", { ...logContext, error_message: "missing or invalid UUID" });
    return res.status(400).json({ error: "missing or invalid UUID" });
  }
  if (!cache.has(bookUuid)) {
    logger.warn("Book UUID not found for update.", { ...logContext, error_message: "UUID does not exist" });
    return res.status(404).json({ error: "UUID does not exist" });
  }
  if (!(status === "read" || status === "to_read" || status === "reading")) {
    logger.warn("Invalid status provided for book update.", { ...logContext, error_message: "Status is invalid. Accepted statuses: read | to_read | reading" });
    return res.status(400).json({
      error: "Status is invalid. Accepted statuses: read | to_read | reading",
    });
  }
  const value = cache.get(bookUuid);
  value.status = status;
  cache.set(bookUuid, value);
  logger.info("Successfully updated book status.", { ...logContext, new_status: status });
  return res.json({ uuid: bookUuid, status });
});

// get the list of books
app.get("/reading-list/books", (req, res) => { // Added req parameter for consistency
  const logContext = { method: req.method, url: req.originalUrl, ip: req.ip };
  const keys = cache.keys();
  const allData = {};
  for (const key of keys) {
    allData[key] = cache.get(key);
  }
  logger.info("Successfully retrieved all books.", { ...logContext, book_count: keys.length });
  return res.json(allData);
});

// get a book by uuid
app.get("/reading-list/books/:uuid", (req, res) => {
  const bookUuid = req.params.uuid; // Renamed
  const logContext = { method: req.method, url: req.originalUrl, ip: req.ip, book_uuid: bookUuid };
  if (!bookUuid || typeof bookUuid !== "string") {
    logger.warn("Missing or invalid UUID for getting a book.", { ...logContext, error_message: "missing or invalid UUID" });
    return res.status(400).json({ error: "missing or invalid UUID" });
  }
  if (!cache.has(bookUuid)) {
    logger.warn("Book UUID not found for retrieval.", { ...logContext, error_message: "UUID does not exist" });
    return res.status(404).json({ error: "UUID does not exist" });
  }
  const value = cache.get(bookUuid);
  logger.info("Successfully retrieved a book.", { ...logContext, book_data: value });
  return res.json(value);
});

// delete a book by uuid
app.delete("/reading-list/books/:uuid", (req, res) => {
  const bookUuid = req.params.uuid; // Renamed
  const logContext = { method: req.method, url: req.originalUrl, ip: req.ip, book_uuid: bookUuid };
  if (!bookUuid || typeof bookUuid !== "string") {
    logger.warn("Missing or invalid UUID for deleting a book.", { ...logContext, error_message: "missing or invalid UUID" });
    return res.status(400).json({ error: "missing or invalid UUID" });
  }
  if (!cache.has(bookUuid)) {
    logger.warn("Book UUID not found for deletion.", { ...logContext, error_message: "UUID does not exist" });
    return res.status(404).json({ error: "UUID does not exist" });
  }
  cache.del(bookUuid);
  logger.info("Successfully deleted a book.", logContext);
  return res.json({ uuid: bookUuid }); // Original response was { uuid }, kept for consistency
});

// health check
app.get("/healthz", (req, res) => { // Added req parameter
  logger.info("Health check successful.", { method: req.method, url: req.originalUrl, ip: req.ip });
  return res.sendStatus(200);
});

// Error handling middleware
app.use((err, req, res, next) => { // Added req parameter
  if (res.headersSent) {
    return next(err);
  }
  // Log the error with Winston
  logger.error("Unhandled error occurred.", { 
    error_message: err.message, 
    error_stack: err.stack, 
    method: req.method, 
    url: req.originalUrl, 
    ip: req.ip 
  });
  res.status(500);
  res.json({ error: err.message }); // Keep the original error response structure
});

// Catch-all for 404 errors
app.use("*", (req, res) => { // Added req parameter
  logger.warn("Requested resource not found.", { method: req.method, url: req.originalUrl, ip: req.ip });
  return res
    .status(404)
    .json({ error: "the requested resource does not exist on this server" });
});

export default app;
