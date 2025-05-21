import app from "./app.mjs";
import winston from 'winston';

// Configure Winston logger (as per task description for index.mjs)
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

const PORT = parseInt(process.env.PORT) || 8080;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`, { port: PORT });
});
