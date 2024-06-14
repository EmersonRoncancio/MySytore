import { NextFunction, Request, Response } from "express";


export class FileUploadMiddleware{

    static containFile(req: Request, res: Response, next: NextFunction){

        if(!req.files || Object.keys(req.files).length === 0){
            return res.status(400).json({error: 'No se recivieron archivos'})
        }

        if( !Array.isArray(req.files.image)){
            req.body.files = [ req.files.image ]
        }else{
            req.body.files = req.files.image
        }

        next()
    }
}