import jwt from 'jsonwebtoken'
import { envs } from './envs'
import { error } from 'console'

export const JwtAdapter = {
    generateToken: async (payload: any, duration: string = "2h") => {

        return new Promise((resolve) => {
            jwt.sign(payload, envs.JWT_SEED, { expiresIn: duration }, (error, token) => {
                if (error) return resolve(null)

                resolve(token)
            })
        })

    },
    validateToken:<T>(token: string): Promise<T|null> => {

        return new Promise((resolve) => {
            jwt.verify(token, envs.JWT_SEED, (error, decoded)=>{

                if(error) return resolve(null)

                resolve(decoded as T)
            })
        })
    }
}