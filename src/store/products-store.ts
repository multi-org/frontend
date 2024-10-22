import { ProductType } from '@/types/Product'
import { create } from 'zustand'

interface productStoreProps {
  products: ProductType[]
  create: (product: ProductType) => void
  update: (product: ProductType) => void
  delete: (id: string) => void
  setProducts: (products: ProductType[]) => void
  getProductById: (id: string) => ProductType | null
}

export const useProductStore = create<productStoreProps>()((set, get) => ({
  products: [],
  create: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),

  update: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product,
      ),
    })),

  delete: (id) =>
    set((state) => ({
      products: state.products.filter((product) => product._id !== id),
    })),

  setProducts: (products) =>
    set(() => ({
      products,
    })),

  getProductById: (id: string) => {
    const state = get()
    const product = state.products.find(
      (product: ProductType) => product._id === id,
    )
    return product || null
  },
}))
