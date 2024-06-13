import mongoose from "mongoose"


export const Validators = {
    MongoId: (id: string) => {
        return mongoose.isValidObjectId(id)
    }
}