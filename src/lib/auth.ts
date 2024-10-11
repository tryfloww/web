import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import prisma from './prisma'

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' })
}

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
  } catch (error) {
    return null
  }
}

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10)
}

export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword)
}

export const createSession = async (userId: string, type: string, accessToken: string) => {
  return prisma.session.create({
    data: {
      userId,
      type,
      accessToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  })
}
