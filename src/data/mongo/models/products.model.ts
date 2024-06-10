import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es requerido'],
        unique: true
    },
    disponible: {
        type: String,
        default: false
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Categorias',
        require: true
    }
})

export const ProductModel = mongoose.model("Products",productSchema)