import api from '../api.js'

export const list = async () => {
  try {
    const response = await api.get('user/host/accommodations/?userId=123')
    return response.data
  } catch (error) {
    console.error(error)
    return 'Não foi possível listar as acomodações'
  }
}
