import api from '../api.js';


const Visualize = async (id) => {
  try {
    const response = await api.get(`/payment-methods/visualize?id=${encodeURIComponent(id)}`);
    return response.data;
  } 
  catch (error) {
    console.error(error);
    return "Error trying to access payment methods";
  }
}

export default Visualize
