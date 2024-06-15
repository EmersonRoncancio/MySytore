import { Router } from "express";
import { FileUploadController } from "./controller";
import { FileUploadService } from "../services/file-upload.service";
import { FileUploadMiddleware } from "../middlewares/fileUpload.middleware";
import { TypeMiddleware } from "../middlewares/type.middleware";


export class FileUploadRoutes {


    static get routes(): Router {

        const router = Router()

        const uploadSevice = new FileUploadService()
        const controller = new FileUploadController(uploadSevice)

        router.use(FileUploadMiddleware.containFile)
        router.use(TypeMiddleware.ValidTypes(['user', 'categories', 'products']))

        router
            .post('/single/:type', controller.FileUpload)
            .post('/multiple/:type', controller.UploadMultipleFiles)


        return router
    }
}