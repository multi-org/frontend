import { useState, useEffect } from 'react';
import { ProductType } from '@/types/Product';
import { useProductStore } from '@/store/products-store';
import api from '@/utils/api'; 


export const useProducts = () => {
  const { products, create, update, delete: deleteProduct } = useProductStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<ProductType[]>('/productos');
      console.log(response.data)
      const fetchedProducts = response.data;
      fetchedProducts.forEach((product) => create(product)); 
    } catch (err) {
      setError('Erro ao buscar produtos');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (product: ProductType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post<ProductType>('/productos', product);
      create(response.data); 
    } catch (err) {
      setError('Erro ao criar produto');
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (product: ProductType) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.put<ProductType>(`/productos/${product.id}`, product);
      update(response.data); 
    } catch (err) {
      setError('Erro ao atualizar produto');
    } finally {
      setLoading(false);
    }
  };

  const deleteProductById = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await api.delete(`/productos/${id}`);
      deleteProduct(id); 
    } catch (err) {
      setError('Erro ao deletar produto');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return {
    products,
    loading,
    error,
    createProduct,
    updateProduct,
    deleteProductById,
  };
};
