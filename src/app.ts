import { envs } from './config/envs';
import { ConecctionMongo } from './data';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';


(async()=> {
  main();
})();


async function main() {

  await ConecctionMongo.start({
    urlDb: envs.URL_MONGODB,
    dbName: envs.DB_NAME
  })

  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}