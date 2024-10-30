import { useState } from 'react'
import { ProductType } from '@/types/Product'
import { useProductStore } from '@/store/products-store'
import api from '@/utils/api'
import { CategoriaType } from '@/types/Categoria'

export const useProducts = () => {
  const {
    products,
    setProducts,
    create,
    update,
    getProductById,
    delete: deleteProduct,
  } = useProductStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.get<ProductType[]>('/produtos')
      setProducts(response.data)
    } catch (err) {
      setError('Erro ao buscar produtos')
    } finally {
      setLoading(false)
    }
  }

  const createProduct = async (product: {
    nome: string
    descricao: string
    categoria: CategoriaType
    preco: number
  }) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.post('/produtos', {
        ...product,
        disponibilidade: [
          { data: '2025-10-05T00:00:00.000+00:00', horario: '09:00-11:00' },
        ],
      })
      create(response.data)
      return response.data
    } catch (err) {
      setError('Erro ao criar produto')
    } finally {
      setLoading(false)
    }
  }

  const updateProduct = async (product: ProductType) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.put<ProductType>(
        `/produtos/${product._id}`,
        product,
      )
      update(response.data)
    } catch (err) {
      setError('Erro ao atualizar produto')
    } finally {
      setLoading(false)
    }
  }

  const deleteProductById = async (id: string) => {
    setLoading(true)
    setError(null)
    try {
      await api.delete(`/produtos/${id}`)
      deleteProduct(id)
    } catch (err) {
      setError('Erro ao deletar produto')
    } finally {
      setLoading(false)
    }
  }

  return {
    products,
    loading,
    error,
    getProductById,
    createProduct,
    updateProduct,
    deleteProductById,
    getProducts,
  }
}
