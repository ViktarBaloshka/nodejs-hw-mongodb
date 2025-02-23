import express from 'express';
import pino from 'pino-http';
import corse from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const PORT = Number(process.env.PORT);

export function setupServer() {
  const app = express();

  app.use(express.json());
  app.use(corse());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use('*', (req, res, next) => {
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
