import 'reflect-metadata';
import 'colors';
import 'dotenv/config';
import { createConnection } from 'typeorm';
import { __prod__ } from './constants';
import createApp from './app';
import setupCloundinary from './config/setupCloundinary';

const main = async () => {
  await createConnection();

  setupCloundinary();

  const { app } = await createApp();

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(
      `Graph API is running at http://localhost:${PORT}$/graphql`.blue.bold
    );
  });
};

main().catch((err) => console.log('Root Error: ', err));
