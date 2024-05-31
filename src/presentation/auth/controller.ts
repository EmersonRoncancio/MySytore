import {Request, Response} from 'express'

export class AuthController {

    constructor(

    ) { }

    Register = (req: Request, res: Response) => {
        res.json('Register')
    }

    Login = (req: Request, res: Response) => {
        res.json('Login')
    }

    ValidateEmail = (req: Request, res: Response) => {
        res.json('ValidateEmail')
    }
}