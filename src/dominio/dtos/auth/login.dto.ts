import { regularExps } from "../../../config"


export class LoginDto {

    private constructor(
        public readonly email: string,
        public readonly password: string
    ) { }

    static Login(object: { [key: string]: any }): [string?, LoginDto?] {
        const { email, password } = object

        if (!email) return ["El email es requerido", undefined]
        if (!regularExps.email.test(email)) return ["El email no es valido", undefined]
        if (!password) return ["La contraseña es requerida", undefined]
        if (password < 6) return ["Contraseña invalida", undefined]

        return [undefined, new LoginDto(email, password)]
    }
}