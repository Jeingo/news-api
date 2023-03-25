import jwt from 'jsonwebtoken'
import { PairOfToken, Token, TokenPayloadType } from '../global-types/token.type'
import { settings } from '../settings/setting'
import { DbId } from '../global-types/db.types'

class JwtService {
    /**
     * Description: Create and return access and refresh tokens
     */
    createPairOfToken(userId: string): PairOfToken {
        const accessToken = jwt.sign({ userId: userId }, settings.JWT_SECRET, {
            expiresIn: settings.EXPIRE_JWT
        })
        const refreshToken = jwt.sign({ userId: userId }, settings.JWT_REFRESH_SECRET, {
            expiresIn: settings.EXPIRE_REFRESH_JWT
        })
        return {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    }

    /**
     * Description: Check expiration refresh token and if it good => return payload
     */
    checkExpirationAndGetPayload(token: Token): TokenPayloadType | null {
        try {
            return jwt.verify(token, settings.JWT_REFRESH_SECRET) as TokenPayloadType
        } catch (err) {
            return null
        }
    }

    /**
     * Description: Check expiration access token and if it good => return payload
     */
    getUserIdByToken(token: string): DbId | null {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return result.userId
        } catch (err) {
            return null
        }
    }
}

export const jwtService = new JwtService()
