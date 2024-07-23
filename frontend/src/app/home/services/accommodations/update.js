import api from '../api.js'

export const edit = async (accommodation) => {
  try {
    const response = await api.put('user/host/accommodations/', accommodation)
    return response.data
  } catch (error) {
    console.error('Error editing accommodation:', error)
    return 'Erro ao editar acomodação'
  }
}
