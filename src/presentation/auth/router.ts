import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";


export class AuthRouters {


    static get routes(): Router {

        const router = Router()
        const authservice = new AuthService()
        const controller = new AuthController(authservice)

        router
            .post('/login', controller.Login)
            .post('/register', controller.Register)
            .get('/validate-email/:token', controller.ValidateEmail)

        return router
    }
}