import mongoose from "mongoose"


interface OptionConction{
    dbName: string,
    urlDb: string
}

export class ConecctionMongo{

    static async start(options: OptionConction){
        const {dbName,urlDb} = options

        try {
            await mongoose.connect(urlDb,{
                dbName: dbName
            })

            console.log('Conexion Exitosa')

            return true
        } catch (error) {
            console.log('Error en la conexion')
            throw error
        }
    }
}