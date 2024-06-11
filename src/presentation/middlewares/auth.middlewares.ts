import { error } from 'console'
import { NextFunction, Request, Response } from 'express'
import { JwtAdapter } from '../../config';
import { CustomError, UsersEntidad } from '../../dominio';
import { UserModel } from '../../data';

export class AuthMiddleware {

    static async validateJWT(req: Request, res: Response, next: NextFunction) {

        const autorizacion = req.header('Authorization')
        if (!autorizacion) return res.status(401).json({ error: 'No se recivio un token' });
        if (!autorizacion.startsWith('Bearer ')) return res.status(401).json({ error: 'Bearer Token invalido' })

        const token = autorizacion.split(' ')[1] || ''

        try {

            const payload = await JwtAdapter.validateToken<{ id: string }>(token)
            if (!payload) return res.status(401).json({error: 'Token invalido'})

            const user = await UserModel.findById( payload.id )
            if(!user) return res.status(401).json({error: 'Token invalido - User'})

            req.body.user = UsersEntidad.fromObject(user)

            next()

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'mani' })
        }

        
    }
}