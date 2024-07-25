import api from '../api.js'

export const get = async (accommodationId) => {
  try {
    const response = await api.get('user/host/accommodations/', accommodationId)
    return response.data
  } catch (error) {
    console.error('Error fetching accommodation:', error)
    return 'Erro ao carregar acomodação'
  }
}
