import { Request, Response } from "express";
import { CustomError } from "../../dominio";
import { FileUploadService } from "../services/file-upload.service";
import { UploadedFile } from "express-fileupload";
import { error } from "console";


export class FileUploadController {

    constructor(
        private readonly uploadService: FileUploadService
    ) { }

    private handleError = (error: any, res: Response) => {

        if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message })

        return res.status(500).json({ error: 'internal Server Error' })
    }

    FileUpload = (req: Request, res: Response) => {

        const { type } = req.params
        const validateTypes = ['user','categories','products']
        if(!validateTypes.includes(type)){
            return res.status(400).json({error:'Ivalid Type'})
        }

        const file = req.body.files.at(0) as UploadedFile


        this.uploadService.UploadSingle(file, `uploads/${type}`)
            .then(uploded => res.json({uploded}))
            .catch( error => this.handleError(error, res))
    }

    UploadMultipleFiles = (req: Request, res: Response) => {

    }
}