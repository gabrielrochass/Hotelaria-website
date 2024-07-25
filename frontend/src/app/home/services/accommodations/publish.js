import api from '../api.js'

export const publish = async (accommodation) => {
  try {
    const response = await api.post('user/host/accommodations/', accommodation)
    return response.data
  } catch (error) {
    console.error('Error publishing accommodation:', error)
    return 'Erro ao publicar acomodação'
  }
}
