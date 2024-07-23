import api from '../api.js'

export default async function login(email, password) {
  console.log('Chegou no serviço de login')
  try {
    const data = {
      email: email,
      password: password
    }

    const response = await api.post('/auth/login', data)
    console.log(`response do login: ${response}`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
