import { useQuery, UseQueryResult } from 'react-query';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const API_URL = 'https://fakestoreapi.com';

export const useApi = (): UseQueryResult<Product[], Error> => {
  const fetchProducts = async () => {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const products = await response.json();
    return products;
  };

  return useQuery('products', fetchProducts);
};
