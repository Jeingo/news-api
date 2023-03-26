import { UsersModel } from '../domain/user.entity'
import { UserDocument } from '../domain/user.entity.type'
import { DbId } from '../../../global-types/db.types'
import { ObjectId } from 'mongodb'

class UsersRepository {
    /**
     * Description: Save user document
     */
    async save(user: UserDocument): Promise<UserDocument> {
        return await user.save()
    }

    /**
     * Description: Return user document by login or email
     */
    async getUserByLoginOrEmail(loginOrEmail: string): Promise<UserDocument | null> {
        return UsersModel.findOne().or([{ email: loginOrEmail }, { login: loginOrEmail }])
    }

    /**
     * Description: Return user document by id
     */
    async getUserById(id: DbId): Promise<UserDocument | null> {
        return UsersModel.findById(new ObjectId(id))
    }
}

export const usersRepository = new UsersRepository()
