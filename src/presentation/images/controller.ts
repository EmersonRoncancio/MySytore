import { Request, Response } from "express";
import fs, { existsSync } from 'fs'
import path from "path";

export class ImagesController {

    constructor() { }

    public getImages = (req: Request, res: Response) =>{

        const { type, Image } = req.params

        const imagePath = path.resolve(__dirname, `../../../uploads/${type}/${Image}`)

        if(!existsSync(imagePath)){
            return res.status(404).json({error: 'La imagen no existe'})
        }

        res.sendFile(imagePath)
    }
}