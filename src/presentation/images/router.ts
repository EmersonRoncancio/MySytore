import { Router } from "express";
import { ImagesController } from "./controller";


export class ImagesRoutes{

    constructor(){}

    static get routes(): Router{

        const router = Router()

        const controller = new ImagesController()

        router 
            .get('/:type/:Image', controller.getImages)

        return router
    }
}