import path from "path";
import fs from 'fs'
import { UploadedFile } from "express-fileupload";
import { CustomError } from "../../dominio";
import { UuidAdapter } from "../../config/uuid.adapter";


export class FileUploadService {

    constructor() { }

    private CheckFolder(folderPath: string) {
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath)
        }
    }

    public async UploadSingle(
        file: UploadedFile,
        folder: string = 'uploads',
        validateExtensions: string[] = ['jpg', 'png', 'jpeg', 'gif']
    ) {

        try {
            const fileExtension = file.mimetype.split('/')[1]

            if (!validateExtensions.includes(fileExtension)) {
                throw CustomError.badRequest(`Tipo de archivo no valido: ${fileExtension}`)
            }

            const destination = path.resolve(__dirname, '../../../', folder)
            this.CheckFolder(destination)
            const fillName = `${UuidAdapter.generate()}.${fileExtension}`

            file.mv(`${destination}/${fillName}`)

            return { fillName }
        } catch (error) {
            console.log(error)
            throw CustomError.internalServer('Internal Server Error')
        }
    }

    public async UploadMultiple(
        file: UploadedFile[],
        folder: string = 'uploads',
        validateExtensions: string[] = ['jpg', 'png', 'jpeg', 'gif']
    ) {


        const fileNames = await Promise.all(
            file.map((files) => {
                return this.UploadSingle(files, folder, validateExtensions)
            }))

        return fileNames
    }
}