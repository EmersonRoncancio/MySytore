import { Router } from 'express';
import { AuthRouters } from './auth/router';
import { CategoryRoutes } from './category/router';
import { ProductsRoutes } from './products/routes';
import { FileUploadRoutes } from './fileUpload/router';
import { ImagesRoutes } from './images/router';




export class AppRoutes {


  static get routes(): Router {

    const router = Router();
    
    // Definir las rutas
    router.use('/api/auth', AuthRouters.routes);
    router.use('/api/categories', CategoryRoutes.routes);
    router.use('/api/products', ProductsRoutes.routes)
    router.use('/api/fileupload', FileUploadRoutes.routes)
    router.use('/api/images', ImagesRoutes.routes)

    return router;
  }


}

