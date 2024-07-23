import api from '../api.js'

const Remove = async ({ email, cardNumber, type }) => {
  try {
    const response = await api.delete(`/payment-methods/remove?email=${email}&cardNumber=${cardNumber}&type=${type}`)
    return response.data
  } catch (error) {
    throw error.response.data
  }
}

export default Remove
