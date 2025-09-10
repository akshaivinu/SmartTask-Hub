import jwt from 'jsonwebtoken'
import { JWT_SECRET, NODE_ENV } from '../config/config.js'

export const generateToken  = (userId, res) => {
    const token = jwt.sign({ userId}, JWT_SECRET, {
        expiresIn: '30d'
    });
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })
}