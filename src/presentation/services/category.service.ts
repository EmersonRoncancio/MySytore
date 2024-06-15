import { CategoryModel } from "../../data";
import { CustomError, UsersEntidad } from "../../dominio";
import { CreateCategoryDTO, PaginationDto } from "../../dominio/dtos";


export class CategoryService {

    constructor() { }

    public async CreateCategory(createDto: CreateCategoryDTO, user: UsersEntidad) {

        const Category = await CategoryModel.findOne({ nombre: createDto.nombre })
        if (Category) throw CustomError.badRequest('La categoria ya existe')

        try {
            const newCategory = await CategoryModel.create({
                nombre: createDto.nombre,
                disponible: createDto.disponible,
                user: user.id
            })

            await newCategory.save()

            return {
                id: newCategory.id,
                nombre: newCategory.nombre,
                disponible: newCategory.disponible,
            }

        } catch (error) {
            throw CustomError.internalServer('Internanl Server Error')
        }
    }

    public async GetCategories(paginationDto: PaginationDto) {
        const { page, limit } = paginationDto

        try {
            const total = await CategoryModel.countDocuments()
            const ModelCategorys = await CategoryModel.find()
                .skip((page-1)*limit)
                .limit(limit)

            const Categories = ModelCategorys.map((category) => {
                return {
                    id: category.id,
                    nombre: category.nombre,
                    disponible: category.disponible,
                }
            })

            return {
                Page: page,
                Limit: limit,
                Total: total,
                next: `/api/categories?page=${page+1}&limit=${limit}`,
                previus:(page - 1 > 0)? `/api/categories?page=${page-1}&limit=${limit}`:null,
                Categories: Categories
            }
        } catch (error) {
            throw CustomError.internalServer('Internal Server Error')
        }
    }

}