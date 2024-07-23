import api from '../api.js'

export default async function login(email, password) {
  try {
    const data = {
      email: email,
      password: password
    }

    const response = await api.post('/auth/login', data)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
