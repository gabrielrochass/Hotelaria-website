import api from '../api.js'

const editarPromo = async (id, data) => {
  const response = await api.put(`/promo/editar_promocao/${id}`, data)
  return response.data
}

export default editarPromo
