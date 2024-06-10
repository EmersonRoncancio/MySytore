

export class CreateCategoryDTO {

    private constructor(
        public readonly nombre: string,
        public readonly disponible: boolean,
    ) { }

    static create(object: { [key: string]: any }):[string?, CreateCategoryDTO?] {
        const {nombre, disponible = false} = object

        let disponibleBoolean = disponible
        if(!nombre) return ['El nombre es requerido', undefined]
        if(typeof disponible !== 'boolean'){
            disponibleBoolean = ( disponible === 'true')
            console.log(disponibleBoolean)
        }

        return [undefined, new CreateCategoryDTO(nombre, disponibleBoolean)]
    }
}