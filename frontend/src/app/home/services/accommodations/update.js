import api from '../api.js';

export const updateAccommodation = async (id, accommodation) => {
  const response = await api.put(`/user/host/accommodation/${id}`, accommodation);
  return response.data;
};

export default updateAccommodation;