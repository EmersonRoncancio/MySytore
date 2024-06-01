import mongoose from "mongoose";
import { UserModel } from "../../data";
import { CustomError, UsersEntidad } from "../../dominio";
import { RegisterDto } from "../../dominio/dtos/auth/register.dto";


export class AuthService{

    constructor(){}

    public async registerUser(registerDto: RegisterDto){
        const { nombre, email, password} = registerDto
        
        const existUser = await UserModel.findOne({ email: email})
        if( existUser ) throw CustomError.badRequest("El correo ya existe")

        try {
            const user = await UserModel.create(registerDto)
            await user.save()


            const {password, ...UsersEntity} = UsersEntidad.fromObject(user)

            return {
                User: UsersEntity,
                Token: "PPPP"
            }
        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }


}