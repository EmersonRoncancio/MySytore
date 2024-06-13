import { ProductModel } from "../../data";
import { CustomError } from "../../dominio";
import { PaginationDto } from "../../dominio/dtos";
import { CreateProductDto } from "../../dominio/dtos/products/create.products";


export class ProductsService {

    constructor() { }

    public async CreateProduct(createProductDto: CreateProductDto) {

        const existProduct = await ProductModel.findOne({ nombre: createProductDto.nombre })
        if (existProduct) throw CustomError.badRequest('El producto ya existe')

        try {
            const product = await ProductModel.create(createProductDto)
            await product.save()

            return product
        } catch (error) {
            throw CustomError.internalServer('Internal Server Error')
        }
    }

    public async GetProducts(paginationDto: PaginationDto) {
        const { page, limit } = paginationDto

        try {
 
            const totalProducts = await ProductModel.countDocuments()
            const products = await ProductModel.find()
                .skip((page - 1) * limit)
                .limit(limit)
                .populate('user')

            return {
                page: page,
                limit: limit,
                total: totalProducts,
                products: products
            }

        } catch (error) {
            throw CustomError.internalServer(`${error}`)
        }

    }
}