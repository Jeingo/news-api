import { usersRepository } from '../../users/repositories/users.repository'
import bcrypt from 'bcrypt'
import { Token, TokenPayloadType } from '../../../global-types/token.type'
import { DbId } from '../../../global-types/db.types'
import { jwtService } from '../../../infrastructure/jwt.service'

class AuthService {
    async checkCredentialsAndGetUserId(loginOrEmail: string, password: string): Promise<DbId | null> {
        const user = await usersRepository.getUserByLoginOrEmail(loginOrEmail)
        if (!user) return null
        const res = await bcrypt.compare(password, user.hash)
        if (!res) {
            return null
        }
        return user._id.toString()
    }
    async checkAuthorizationAndGetPayload(refreshToken: Token): Promise<TokenPayloadType | null> {
        const payload = jwtService.checkExpirationAndGetPayload(refreshToken)
        if (!payload) {
            return null
        }
        const statusSession = await this.isActiveSession(payload.userId)
        if (!statusSession) {
            return null
        }
        return payload
    }
    async saveSession(userId: DbId, refreshToken: Token): Promise<boolean> {
        const user = await usersRepository.getUserById(userId)
        if (!user) {
            return false
        }
        user.updateRefreshToken(refreshToken)
        await usersRepository.save(user)
        return true
    }
    async deleteSession(userId: DbId): Promise<boolean> {
        const user = await usersRepository.getUserById(userId)
        if (!user) {
            return false
        }
        user.deleteRefreshToken()
        await usersRepository.save(user)
        return true
    }
    private async isActiveSession(userId: DbId): Promise<boolean> {
        const user = await usersRepository.getUserById(userId)
        return !!user
    }
}

export const authService = new AuthService()
