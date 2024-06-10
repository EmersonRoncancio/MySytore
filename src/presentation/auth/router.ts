import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../services/auth.service";
import { EmailService } from "../services/email.service";
import { envs } from "../../config";


export class AuthRouters {


    static get routes(): Router {

        const router = Router()
        const emailService = new EmailService(
            envs.EMAIL_SERVICE,
            envs.EMAIL_REMITENTE,
            envs.PASSWORD_REMITENTE,
            envs.ENVIAR_EMAIL)
        const authservice = new AuthService(emailService)
        const controller = new AuthController(authservice)

        router
            .post('/login', controller.Login)
            .post('/register', controller.Register)
            .get('/validate-email/:token', controller.ValidateEmail)

        return router
    }
}