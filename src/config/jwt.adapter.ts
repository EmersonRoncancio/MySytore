import jwt from 'jsonwebtoken'
import { envs } from './envs'

export const JwtAdapter = {
    generateToken: async (payload: any, duration: string = "2h") => {

        return new Promise((resolve) => {
            jwt.sign(payload, envs.JWT_SEED, { expiresIn: duration }, (error, token) => {
                if (error) return resolve(null)

                resolve(token)
            })
        })

    },
    validateToken: (token: string) => {


        return
    }
}