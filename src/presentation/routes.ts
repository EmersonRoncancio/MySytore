import { Router } from 'express';
import { AuthRouters } from './auth/router';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRouters.routes);


    return router;
  }


}

