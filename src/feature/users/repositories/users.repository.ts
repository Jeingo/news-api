class UsersRepository {
    async save(user: any) {
        return await user.save()
    }
}

export const usersRepository = new UsersRepository()
