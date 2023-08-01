import { v4 as uuidv4 } from 'uuid'

export const userUniqueId = () => {
  const id = uuidv4().replace(/-/g, '').substring(0, 9)
  return `s_${id}`
}

export const postUniqueId = () => {
  const id = uuidv4().replace(/-/g, '').substring(0, 9)
  return `p_${id}`
}
