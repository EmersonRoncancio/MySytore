import { UserModel } from "../../data";
import { CustomError } from "../../dominio";
import { RegisterDto } from "../../dominio/dtos/auth/register.dto";


export class AuthService{

    constructor(){}

    public async registerUser(registerDto: RegisterDto){
        const { nombre, email, password} = registerDto
        
        const existUser = await UserModel.findOne({ name: email})
        if( existUser ) throw CustomError.badRequest("El correo ya existe")

        return "Service ok"
    }


}