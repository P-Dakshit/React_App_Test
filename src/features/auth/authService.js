import api from '../../utils/api';

export const authService = {
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    // DummyJSON /users/add endpoint for registration
    const response = await api.post('/users/add', userData);
    return response.data;
  },
};

