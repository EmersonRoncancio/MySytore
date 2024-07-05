import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        unique: true
    },
    emailValidate: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerido']
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

UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret, options) {
        delete ret._id
        delete ret.password
    },
})

export const UserModel = mongoose.model("User",UserSchema)