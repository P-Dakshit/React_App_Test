import api from '../../utils/api';

export const productService = {
  fetchProducts: async () => {
    const response = await api.get('/products');
    return response.data;
  },
};

