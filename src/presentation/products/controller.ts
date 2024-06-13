import { Request, Response } from "express";
import { PaginationDto } from "../../dominio/dtos";
import { CreateProductDto } from "../../dominio/dtos/products/create.products";
import { ProductsService } from "../services/products.service";
import { CustomError } from "../../dominio";


export class ProductsController {

    constructor(
        public readonly produtService: ProductsService
    ) { }

    private handleError = (error: any, res: Response) => {

        if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message })

        return res.status(500).json({ error: 'internal Server Error' })
    }

    CreateProduct = (req: Request, res: Response) => {
        const body = req.body

        const [error, Dto] = CreateProductDto.create(body)
        if (error) return res.status(400).json({ error })

        this.produtService.CreateProduct(Dto!)
            .then(products => res.status(201).json(products))
            .catch(error => this.handleError(error, res))
    }

    GetProducts = (req: Request, res: Response) => {
        const { page = 1, limit = 10 } = req.query

        const [error, Dto] = PaginationDto.create(+page, +limit)
        if (error) return res.status(400).json(error)

        this.produtService.GetProducts(Dto!)
            .then(products => res.status(201).json(products))
            .catch(error => this.handleError(error, res))
    }
}