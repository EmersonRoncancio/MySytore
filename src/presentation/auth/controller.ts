import {Request, Response} from 'express'
import { RegisterDto } from '../../dominio/dtos/auth/register.dto'
import { CustomError } from '../../dominio'
import { AuthService } from '../services/auth.service'

export class AuthController {

    constructor(
        public readonly AuthServive: AuthService
    ) { }

    Register = (req: Request, res: Response) => {
        const body = req.body

        const [error,Dto] = RegisterDto.create(body)

        if(error) return res.status(400).json({error})

        this.AuthServive.registerUser(Dto!)
            .then(user=> res.json(user))
    }

    Login = (req: Request, res: Response) => {
        res.json('Login')
    }

    ValidateEmail = (req: Request, res: Response) => {
        res.json('ValidateEmail')
    }
}