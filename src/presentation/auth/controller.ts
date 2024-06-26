import { Request, Response } from 'express'
import { RegisterDto } from '../../dominio/dtos/auth/register.dto'
import { CustomError } from '../../dominio'
import { AuthService } from '../services/auth.service'
import { LoginDto } from '../../dominio/dtos/auth/login.dto'

export class AuthController {

    constructor(
        public readonly AuthServive: AuthService
    ) { }

    private handleError = (error: any, res: Response) => {

        if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message })

        return res.status(500).json({ error: "Internal Server Error" })
    }

    Register = (req: Request, res: Response) => {
        const body = req.body

        const [error, Dto] = RegisterDto.create(body)
        if (error) return res.status(400).json({ error })

        this.AuthServive.registerUser(Dto!)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res))
    }

    Login = (req: Request, res: Response) => {
        const body = req.body

        const [error, Dto] = LoginDto.Login(body)

        if (error) return res.status(400).json({ error })

        this.AuthServive.Login(Dto!)
            .then(user => res.json(user))
            .catch(error => this.handleError(error, res))
    }

    ValidateEmail = (req: Request, res: Response) => {
        const { token } = req.params

        this.AuthServive.validateEmail(token)
            .then(() => res.json("Email validado"))
            .catch(error => this.handleError(error, res))
    }
}