import { useMutation, useQuery, useQueryClient, UseQueryResult } from 'react-query';

export interface Product {
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
  amount: number;
  total: number;
}

const API_URL = 'https://fakestoreapi.com';


const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useGetUsersPdv = () => {
  return useQuery('users', () => fetchUsers());
};

export const useGetProducts = (): UseQueryResult<Product[], Error> => {
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

const fetchCategoryProducts = async () => {
  const response = await fetch(`${API_URL}/products/categories'`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useGetCategoryProducts = () => {
  return useQuery(['products'], () => fetchCategoryProducts());
};

const fetchProductsByCategory = async (categoria: string) => {
  const response = await fetch(`${API_URL}/products/category/${categoria}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useGetProductsCategory = (categoria: string) => {
  return useQuery(['products', categoria], () => fetchProductsByCategory(categoria));
};



// Função para adicionar um novo produto
const addProduct = async (newProduct) => {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useAddProduct = () => {
  const queryClient = useQueryClient();

  const addProductMutation = useMutation(addProduct, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('products');
      const newProduct = data;

      const products: Product[] = queryClient.getQueryData('products') || [];
      const updatedProducts = [newProduct, ...products];
      queryClient.setQueryData('products', updatedProducts);
    },
  });

  return addProductMutation;
};

