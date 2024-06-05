import mongoose from "mongoose";
import { UserModel } from "../../data";
import { CustomError, UsersEntidad } from "../../dominio";
import { RegisterDto } from "../../dominio/dtos/auth/register.dto";
import { bcryptAdapter } from "../../config/bcrypt.adapter";
import { LoginDto } from "../../dominio/dtos/auth/login.dto";
import { JwtAdapter, envs } from "../../config";
import { EmailService } from "./email.service";


export class AuthService {

    constructor(
        private readonly emailService: EmailService
    ) { }

    public async registerUser(registerDto: RegisterDto) {
        const { nombre, email, password } = registerDto

        const existUser = await UserModel.findOne({ email: email })
        if (existUser) throw CustomError.badRequest("El correo ya existe")

        try {
            const user = await UserModel.create(registerDto)

            //Encriptacion de contraseña
            user.password = bcryptAdapter.hash(registerDto.password);

            await user.save()

            //Email de confirmacion
            this.SendValidateEmailLink(user.email!)

            const { password, ...UsersEntity } = UsersEntidad.fromObject(user)

            //Creacion de JWT
            const token = await JwtAdapter.generateToken({ id: user.id }, "3h")
            if (!token) throw CustomError.internalServer("Error al generar el token")

            return {
                User: UsersEntity,
                Token: token
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
        if (!token) throw CustomError.internalServer("Error al generar el token")

        return {
            User: UserChek,
            Token: token
        }
    }

    public validateEmail = async (token: string) => {

        const validateToken = await JwtAdapter.validateToken(token)
        if (!validateToken) throw CustomError.notAuthorized("Token no autorizado")

        const { email } = validateToken as {email: string}
        if(!email) throw CustomError.internalServer("Email no  esta en el token")
    
        const user = await UserModel.findOne({email})
        if(!user) throw CustomError.internalServer("Email no existe en la base de datos")

        user.emailValidate = true
        await user.save()
    }

    private SendValidateEmailLink = async (email: string) => {

        const token = await JwtAdapter.generateToken({ email })
        if (!token) throw CustomError.internalServer("Error al generar token")

        const link = `${envs.URL_VALIDATE_EMAIL}/auth/validate-email/${token}`
        const html = `
            <h1>Validar Email</h1>
            <p>Dar click en el enlace para validar Email</p>
            <a href=${link}>link</a>
        `

        const isSent = await this.emailService.sendEmail({
            to: email,
            subject: "Validacion de Email",
            htmlbody: html
        })
        if (!isSent) throw CustomError.internalServer("Error al enviar email")

        return true
    }

}