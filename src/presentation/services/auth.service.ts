import mongoose from "mongoose";
import { UserModel } from "../../data";
import { CustomError, UsersEntidad } from "../../dominio";
import { RegisterDto } from "../../dominio/dtos/auth/register.dto";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { LoginDto } from "../../dominio/dtos/auth/login.dto";
import { JwtAdapter } from "../../config";


export class AuthService {

    constructor() { }

    public async registerUser(registerDto: RegisterDto) {
        const { nombre, email, password } = registerDto

        const existUser = await UserModel.findOne({ email: email })
        if (existUser) throw CustomError.badRequest("El correo ya existe")

        try {
            const user = await UserModel.create(registerDto)

            user.password = bcryptAdapter.hash(registerDto.password);

            await user.save()


            const { password, ...UsersEntity } = UsersEntidad.fromObject(user)

            return {
                User: UsersEntity,
                Token: "PPPP"
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }
    }

    public async Login(loginDto: LoginDto) {

        const user = await UserModel.findOne({ email: loginDto.email })
        if (!user) throw CustomError.badRequest("El email no existe")

        const isMatch = bcryptAdapter.compare(loginDto.password, user?.password!)
        if (!isMatch) throw CustomError.badRequest("La contraseña es incorrecta")

        const { password, ...UserChek } = UsersEntidad.fromObject(user)

        const token = await JwtAdapter.generateToken({ id: user.id, email: user.email }, "3h")
        if(!token) throw CustomError.internalServer("Error al generar el token")

        return {
            User: UserChek,
            Token: token
        }

    }


}