import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  URL_MONGODB: get('URL_MONGODB').required().asString(),
  DB_NAME: get('DB_NAME').required().asString(),
  JWT_SEED: get('JWT_SEED').required().asString(),
  EMAIL_SERVICE: get('EMAIL_SERVICE').required().asString(),
  EMAIL_REMITENTE: get('EMAIL_REMITENTE').required().asString(),
  PASSWORD_REMITENTE: get('PASSWORD_REMITENTE').required().asString(),
  URL_VALIDATE_EMAIL: get('URL_VALIDATE_EMAIL').required().asString(),
  ENVIAR_EMAIL: get('ENVIAR_EMAIL').default('false').asBool()
}



