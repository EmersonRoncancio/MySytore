import { Router } from 'express';
import { AuthRouters } from './auth/router';
import { CategoryRoutes } from './category/router';
import { ProductsRoutes } from './products/routes';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRouters.routes);
    router.use('/api/categories', CategoryRoutes.routes);
    router.use('/api/products', ProductsRoutes.routes)

    return router;
  }


}

