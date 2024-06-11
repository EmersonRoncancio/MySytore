import mongoose, { Schema } from "mongoose";

const CategorieSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es requerido'],
        unique: true
    },
    disponible: {
        type: Boolean,
        default: false
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
})

export const CategoryModel = mongoose.model("Categorias",CategorieSchema)