import api from '../api.js'

export const deleteAccommodation = async (id) => {
  try {
    const response = await api.delete('user/host/accommodations/${id}')
    return response.data
  } catch (error) {
    console.error('Error deleting accommodation:', error)
    return 'Erro ao excluir acomodação'
  }
}
