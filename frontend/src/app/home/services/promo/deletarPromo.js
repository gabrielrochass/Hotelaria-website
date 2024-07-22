import api from '../api.js'

export default async function deletarPromo(id) {
  try {
    const response = await api.delete(`/promo/deletar_promocao/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
