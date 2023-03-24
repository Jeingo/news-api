import * as dotenv from 'dotenv'
dotenv.config()

export const settings = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017',
    DB_NAME: process.env.DB_NAME || 'service',
    JWT_SECRET: process.env.JWT_SECRET || '123',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '456',
    EXPIRE_JWT: process.env.EXPIRE_JWT,
    EXPIRE_REFRESH_JWT: process.env.EXPIRE_REFRESH_JWT,
    SECURE_COOKIE_MODE: process.env.SECURE_COOKIE_MODE
}
