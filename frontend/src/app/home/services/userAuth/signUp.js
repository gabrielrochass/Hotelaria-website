import api from '../api.js'

export default async function signUp(fullName, birthday, email, cellphone, password, confirmPassword) {
  try {
    const data = {
      fullName: fullName,
      birthday: birthday,
      email: email,
      cellphone: cellphone,
      password: password,
      confirmPassword: confirmPassword
    }

    const response = await api.post('/auth/signup', data)
    return response.data
  } catch (error) {
    return []
  }
}
