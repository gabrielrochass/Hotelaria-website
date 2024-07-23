import api from '../api.js'

export default async function CadastrarPromo(data) {
  const response = await api.post('/promo/cadastrar_promocao', data)
  return response.data
}
