import api from '../api.js'

export default async function ListarPromo() {
  try {
    const response = await api.get('/promo/promocoes_cadastradas')
    return response.data
  } catch (error) {
    console.error(error)
    return 'Não foi possível listar as promoções'
  }
}
