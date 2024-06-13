import { Router } from "express";
import { ProductsController } from "./controller";
import { AuthMiddleware } from "../middlewares/auth.middlewares";
import { ProductsService } from "../services/products.service";


export class ProductsRoutes{

    static get routes(): Router{

        const router = Router()

        const service = new ProductsService()
        const controller = new ProductsController(service)

        router
            .get('/', [AuthMiddleware.validateJWT], controller.GetProducts)
            .post('/', [AuthMiddleware.validateJWT], controller.CreateProduct)

        return router
    }
}