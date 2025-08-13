import { useState } from 'react'
import { ProductType } from '@/types/Product'
import { useProductStore } from '@/store/products-store'
import api from '@/apis/api'
// import { CategoriaType } from '@/types/Categoria'

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
    companyId: string,
    type: string,
    title: string,
    description: string,
    spaceDetails: {
      capacity: number,
      area: number,
    },
    category: string,
    images?: File[],
    chargingModel: string,
    hourlyPrice: number,
    dailyPrice: number,
    weeklyAvailability: {
      monday: {
        start: string,
        end: string,
      },
      tuesday: {
        start: string,
        end: string,
      },
      wednesday: {
        start: string,
        end: string,
      },
      thursday: {
        start: string,
        end: string,
      },
      friday: {
        start: string,
        end: string,
      },
      saturday?: {
        start: string,
        end: string,
      },
      sunday?: {
        start: string,
        end: string,
      },
    },
  }) => {
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData()

      formData.append("companyId", product.companyId)
      formData.append("type", product.type)
      formData.append("title", product.title)
      formData.append("description", product.description)
      formData.append("capacity", product.spaceDetails.capacity.toString())
      formData.append("area", product.spaceDetails.area.toString())
      formData.append("category", product.category)
      formData.append("chargingModel", product.chargingModel)
      formData.append("hourlyPrice", product.hourlyPrice.toString())
      formData.append("dailyPrice", product.dailyPrice.toString())
      formData.append(
        "weeklyAvailability",
        JSON.stringify(product.weeklyAvailability)
      )
      if (product.images && product.images.length > 0) {
        product.images.forEach((file, index) => {
          if (file instanceof File) {
            formData.append('images', file)
            console.log(`Arquivo ${index} adicionado:`, file.name, file.size)
          } else {
            console.error(`Item ${index} não é um File:`, file)
          }
        })
      }
      console.log('FormData entries:')
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(key, `File: ${value.name}(${value.size} bytes)`)
        } else {
          console.log(key, value)
        }
      }
      const response = await api.post(`/products/${product.companyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
      create(response.data)
      return response.data
    } catch (err) {
      setError('Erro ao criar produto')
    } finally {
      setLoading(false)
    }
  }

  // const updateProduct = async (product: ProductType) => {
  //   setLoading(true)
  //   setError(null)
  //   try {
  //     const response = await api.put<ProductType>(
  //       `/produtos/${product._id}`,
  //       product,
  //     )
  //     update(response.data)
  //     return response.data
  //   } catch (err) {
  //     setError('Erro ao atualizar produto')
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const updateProduct = async (product: ProductType) => {
    setLoading(true)
    setError(null)
    try {
      const response = await api.put<ProductType>(
        `/produtos/${product.id}`,
        product,
      )
      update(response.data)
      return response.data
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
