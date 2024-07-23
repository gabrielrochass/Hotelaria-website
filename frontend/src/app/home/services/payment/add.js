import api from '../api.js';


const Add = async ({ id, cardNumber, name, expireDate, type, cvv }) => {
  try {
    const response = await api.post(`/payment-methods/add`, {
        id,
        cardNumber,
        name,
        expireDate,
        type,
        cvv
    });
    return {
      success: true,
      message: 'Card successfully registered',
      data: response.data
    }
  } catch (error) {
    throw error.response.data
  }
}

export default Add
