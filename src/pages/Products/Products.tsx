import { Header } from '@/components/custom/Header'
import { Footer } from '@/components/custom/Footer'
import { BrowseProducts } from '@/components/custom/BrowseProducts'

export function Products() {

  return (
    <>
      <Header />
      <div className='py-16'>
        <BrowseProducts />
      </div>
      <Footer />
    </>
  )
}
