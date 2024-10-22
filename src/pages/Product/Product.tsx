import { Footer } from '@/components/custom/Footer'
import { Header } from '@/components/custom/Header'
import { useProducts } from '@/hooks/products-hooks'
import { useParams } from 'react-router-dom'

export function Product() {
  const { id } = useParams()
  const { getProductById } = useProducts()
  if (!id) {
    throw new Error('Id is not defined')
  }
  const product = getProductById(id)
  return (
    <div>
      <Header />
      {/* PAGINA DE PRODUTO */}
      {product?.nome}
      <Footer />
    </div>
  )
}
