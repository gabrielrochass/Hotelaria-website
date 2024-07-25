import api from '../api.js'

const Remove = async ({ id, cardNumber, type }) => {
  try {
    const response = await api.delete(`/payment-methods/remove?id=${id}&cardNumber=${cardNumber}&type=${type}`);
    return response.data;
  } catch (error) {
    throw error.response.data
  }
}

export default Remove
