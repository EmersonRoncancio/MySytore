import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
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
        ref: 'User',
        required: true
    },
    Category: {
        type: Schema.Types.ObjectId,
        ref: 'Categorias',
        required: true
    }
})

productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret, options) {
        delete ret._id
    },
})

export const ProductModel = mongoose.model("Products",productSchema)