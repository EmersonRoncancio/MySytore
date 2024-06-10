import { Request, Response } from 'express'
import { CustomError } from '../../dominio'
import { CreateCategoryDTO } from '../../dominio/dtos/category/create.category'
import { CategoryService } from '../services/category.service'

export class CategoriesController {

    constructor(
        private readonly CategoryService: CategoryService
    ) { }

    private handleError = (error: any, res: Response) => {

        if (error instanceof CustomError) return res.status(error.statusCode).json({ error: error.message })

        return res.status(500).json({ error: 'internal Server Error' })
    }

    createCategories = (req: Request, res: Response) => {
        const body = req.body

        const [error, Dto] = CreateCategoryDTO.create(body)
        if (error) return res.status(400).json({ error })

        this.CategoryService.CreateCategory(Dto!, body.user)
            .then(category => res.json(category))
            .catch(error => this.handleError(error, res))
    }

    getCategories = (req: Request, res: Response) => {

        res.json('Obtener Categorias')
    }
}