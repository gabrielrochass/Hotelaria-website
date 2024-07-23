import api from '../api.js'

const Visualize = async (email) => {
  try {
    const response = await api.get(`/payment-methods/visualize?email=${encodeURIComponent(email)}`)
    return response.data
  } catch (error) {
    console.error(error)
    return 'Error trying to access payment methods'
  }
}

export default Visualize
