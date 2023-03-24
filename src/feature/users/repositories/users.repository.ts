import { UsersModel } from '../domain/user.entity'
import { UserDocument } from '../domain/user.entity.type'
import { DbId } from '../../../global-types/db.types'
import { ObjectId } from 'mongodb'

class UsersRepository {
    async save(user: UserDocument): Promise<UserDocument> {
        return await user.save()
    }
    async getUserByLoginOrEmail(loginOrEmail: string): Promise<UserDocument | null> {
        return UsersModel.findOne().or([{ email: loginOrEmail }, { login: loginOrEmail }])
    }
    async getUserById(id: DbId): Promise<UserDocument | null> {
        return UsersModel.findById(new ObjectId(id))
    }
}

export const usersRepository = new UsersRepository()
