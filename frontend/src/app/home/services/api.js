// vai ser usado para fazer as requisições
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:5001'
})

export default api
