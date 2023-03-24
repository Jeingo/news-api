export type Token = string
export type PairOfToken = { accessToken: string; refreshToken: string }
export type TokenPayloadType = {
    userId: string
    exp: number
    iat: number
}
