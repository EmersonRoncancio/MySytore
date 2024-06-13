import { envs } from "../../config"
import { ConecctionMongo } from "../mongo/mongo-dataBase"


(async () => {
    await ConecctionMongo.start({
        urlDb: envs.URL_MONGODB,
        dbName: envs.DB_NAME
    })

    await main()
})()

async function main() {

}