import { regularExps } from "../../../config"


export class RegisterDto {

    private constructor(
        public readonly nombre: string,
        public readonly email: string,
        public readonly password: string
    ) { }

    static create(object: { [key: string]: any }): [string?, RegisterDto?] {
        const { nombre, email, password } = object

        if (!nombre) return ["El nombre es requerido", undefined]
        if (!email) return ["El email es requerido", undefined]
        if (!regularExps.email.test(email)) return ["El email no es valido", undefined]
        if (!password) return ["La contraseña es requerido", undefined]
        if (password < 6) return ["Contraseña invalida", undefined]

        return [undefined, new RegisterDto(nombre, email, password)]
    }
}