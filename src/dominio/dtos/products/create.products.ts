import { Validators } from "../../../config/validators"


export class CreateProductDto {

    private constructor(
        public readonly nombre: string,
        public readonly disponible: boolean,
        public readonly price: number,
        public readonly description: string,
        public readonly user: string,
        public readonly category: string
    ) { }

    static create(object: { [key: string]: any }): [string?, CreateProductDto?] {

        const { nombre, disponible = false, price = 0, description, user, category } = object

        let disponibleBoolean = disponible
        if (!nombre) return ['El nombre es requerido', undefined]
        if (typeof disponible !== 'boolean') {
            disponibleBoolean = (disponible === true)
        }
        if (price && typeof price !== 'number') return ['El precio tiene que ser de tipo number', undefined]
        if (!user) return ['El user es requerido', undefined]
        if (!category) return ['La categoria es requerida']
        if(!Validators.MongoId(user.id)) return ['Id del usuario no valido', undefined]
        if(!Validators.MongoId(category)) return ['Id de la categoria no valido', undefined]

        return [undefined, new CreateProductDto(nombre, disponible, price, description, user.id, category)]
    }
}