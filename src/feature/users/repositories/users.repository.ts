import { UsersModel } from '../domain/user.entity'

class UsersRepository {
    async save(user: any) {
        return await user.save()
    }
    async getUserByLoginOrEmail(loginOrEmail: string) {
        return UsersModel.findOne().or([{ email: loginOrEmail }, { login: loginOrEmail }])
    }
}

export const usersRepository = new UsersRepository()
