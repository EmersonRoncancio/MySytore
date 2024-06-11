

export class PaginationDto {

    private constructor(
        public readonly page: number,
        public readonly limit: number
    ) { }

    static create(page: number = 1, limit: number = 5): [string?, PaginationDto?] {

        if (isNaN(page) || isNaN(limit)) return ['El Page o Limit tienen que ser numeros', undefined]
        if (page <= 0) return ['El Page tiene que ser mayor a 0', undefined]
        if (limit <= 0) return ['El Limit tiene que ser mayor a 0', undefined]

        return [undefined, new PaginationDto(page, limit)]
    }
}