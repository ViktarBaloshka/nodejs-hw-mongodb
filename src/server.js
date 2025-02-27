import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const PORT = Number(process.env.PORT) || 3100;

export function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('*', (req, res) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something  went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
