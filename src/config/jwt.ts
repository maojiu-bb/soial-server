import jwt from 'jsonwebtoken'

const secretKey = 'maojiu_skr'
const options = { expiresIn: '6h' }

export const setToken = (payload: any) => {
  return jwt.sign(payload, secretKey, options)
}

export const parseToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secretKey)
    return decoded
  } catch (err) {
    console.error('JWT verification failed')
    return false
  }
}
