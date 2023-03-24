import { DbId } from '../../../global-types/db.types'
import { UsersModel } from '../domain/user.entity'
import { usersRepository } from '../repositories/users.repository'

class UsersService {
    async createUser(login: string, email: string, password: string): Promise<DbId> {
        const user = UsersModel.make(login, email, password)
        await usersRepository.save(user)
        return user._id.toString()
    }
}

export const usersService = new UsersService()
