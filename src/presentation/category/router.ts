import { Router } from 'express';
import { CategoriesController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middlewares';
import { CategoryService } from '../services/category.service';


export class CategoryRoutes {


  static get routes(): Router {

    const router = Router();

    const service = new CategoryService()
    const controller = new CategoriesController(service)

    // Definir las rutas
    router
      .get('/', [AuthMiddleware.validateJWT], controller.getCategories)
      .post('/', [AuthMiddleware.validateJWT], controller.createCategories)

    return router;
  }


}

