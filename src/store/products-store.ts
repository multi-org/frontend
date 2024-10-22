import { ProductType } from "@/types/Product";
import { create } from 'zustand';

interface productStoreProps {
  products: ProductType[];
  create: (product: ProductType) => void;
  update: (product: ProductType) => void;
  delete: (id: string) => void; 
}

export const useProductStore = create<productStoreProps>()((set) => ({
  products: [],
  create: (product) => set((state) => ({
    products: [...state.products, product]
  })),
  
  update: (updatedProduct) => set((state) => ({
    products: state.products.map(product =>
      product.id === updatedProduct.id ? updatedProduct : product
    )
  })),

  delete: (id) => set((state) => ({
    products: state.products.filter(product => product.id !== id)
  })),
}));
