import { Router } from 'express';
import { AuthRouters } from './auth/router';
import { CategoryRoutes } from './category/router';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRouters.routes);
    router.use('/api/categories', CategoryRoutes.routes)

    return router;
  }


}

