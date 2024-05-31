import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  URL_MONGODB: get('URL_MONGODB').required().asString(),
  DB_NAME: get('DB_NAME').required().asString()
}



