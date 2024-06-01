import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        require: [true, 'El email es requerido'],
        unique: true
    },
    emailValidate: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        require: [true, 'La contraseña es requerido']
    },
    img: {
        type: String
    },
    rol: {
        type: [String],
        default: ['USER_ROL'],
        enum: ['ADMIN_ROL','USER_ROL']
    }
})

export const UserModel = mongoose.model("User",UserSchema)