import { CustomError } from "../errors/custom.error"

enum Roles {
    ADMIN_ROL = "ADMIN_ROL",
    USER_ROL = "USER_ROL"
}

// interface UsariosType{
//     nombre: string,
//     email: string,
//     password: string,
//     img: string,
//     rol: Roles
// }

export class UsersEntidad {


    constructor(
        public id: string,
        public nombre: string,
        public email: string,
        public emailValidate: boolean,
        public password: string,
        public rol: Roles,
        public img?: string,
    ) { }

    static fromObject(object: { [key: string]: any }) {
        const { id, _id, nombre, email, emailValidate, password, rol, img } = object

        if (!id && !_id) throw CustomError.badRequest("Id es requerido")
        if (!nombre) throw CustomError.badRequest("Nombre es requerido")
        if (!email) throw CustomError.badRequest("Nombre es requerido")
        if (emailValidate === undefined) throw CustomError.badRequest("Nombre es requerido")
        if (!password) throw CustomError.badRequest("Nombre es requerido")
        if (!rol) throw CustomError.badRequest("Nombre es requerido")

        const entity = new UsersEntidad(id || _id, nombre, email, emailValidate, password, rol, img)

        return entity
    }
}