import { CategoryModel } from "../../data";
import { CustomError, UsersEntidad } from "../../dominio";
import { CreateCategoryDTO } from "../../dominio/dtos";


export class CategoryService {

    constructor() { }

    public async CreateCategory(createDto: CreateCategoryDTO, user: UsersEntidad) {

        const Category = await CategoryModel.findOne({ nombre: createDto.nombre })
        if (Category) throw CustomError.badRequest('La categoria ya existe')

        try {
            const newCategory = new CategoryModel({
                nombre: createDto.nombre,
                disponible: createDto.disponible,
                user: user.id          
            })

            await newCategory.save()

            return {
                id: newCategory.id,
                nombre: newCategory.nombre,
                disponible: newCategory.disponible
            }
        } catch (error) {
            throw CustomError.internalServer('error en el sistema')
        }
    }

}