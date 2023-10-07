import 'reflect-metadata';
import 'colors';
import 'dotenv/config';
import { __prod__ } from './constants';
import createGQLServer from './app';
import setupCloundinary from './config/setupCloundinary';
import { AppDataSource } from './data-source';

const main = async () => {
  await AppDataSource.initialize();

  setupCloundinary();

  const { server } = await createGQLServer();

  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    console.log(
      `Graph API is running at http://localhost:${PORT}/graphql`.blue.bold
    );
  });
};

main().catch((err) => console.log('Root Error: ', err));
