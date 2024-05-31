import { Router } from "express";
import { AuthController } from "./controller";


export class AuthRouters {


    static get routes(): Router {

        const router = Router()
        const controller = new AuthController()

        router
            .post('/login', controller.Login)
            .post('/register', controller.Register)
            .get('/validate-email/:token', controller.ValidateEmail)

        return router
    }
}