import { NextFunction, Request, Response } from "express";


export class TypeMiddleware {

    static ValidTypes(validateTypes: string[]) {

        return (req: Request, res: Response, next: NextFunction) => {
            const type = req.url.split('/')[2]
            if (!validateTypes.includes(type)) {
                return res.status(400).json({ error: 'Ivalid Type' })
            }
            next()
        }
    }
}