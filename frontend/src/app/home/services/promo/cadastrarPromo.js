import api from '../api.js'

export default async function CadastrarPromo(data) {
  try {
    const response = await api.post('/promo/cadastrar_promocao', data)
    return response.data
  } catch (error) {
    throw error
  }
}
