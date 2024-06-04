import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

export const bcryptAdapter = {
    hash: (password: string) => {
        const salt = genSaltSync();
        const hash = hashSync(password, salt);

        return hash
    },
    compare: (password: string, hash: string) => {
        const compare = compareSync(password, hash)

        return compare
    }
}
