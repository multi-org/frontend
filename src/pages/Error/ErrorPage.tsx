import { Footer } from '@/components/custom/Footer'
import { Header } from '@/components/custom/Header'

export const ErrorPage = () => {
  return (
    <div>
      <Header />
      <h1>404 - Página Não Encontrada</h1>
      <p>Desculpe, a página que você está procurando não existe.</p>
      <Footer />
    </div>
  )
}
