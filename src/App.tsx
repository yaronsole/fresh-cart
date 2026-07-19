import { useEffect } from 'react'
import AboutModal from './components/AboutModal'
import BuyItAgain from './components/BuyItAgain'
import CartDrawer from './components/CartDrawer'
import CheckoutToast from './components/CheckoutToast'
import FilterPills from './components/FilterPills'
import Footer from './components/Footer'
import Header from './components/Header'
import ProductGrid from './components/ProductGrid'
import Sidebar from './components/Sidebar'
import { useStore } from './store/useStore'

export default function App() {
  const filter = useStore(s => s.filter)
  const search = useStore(s => s.search)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const s = useStore.getState()
        if (s.aboutOpen) s.setAboutOpen(false)
        else if (s.drawerOpen) s.setDrawerOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const browsing = filter === 'featured' && !search.trim()

  return (
    <div id="top" className="min-h-screen">
      <Header />
      <div className="mx-auto flex max-w-[1440px] items-start px-0 lg:px-4">
        <Sidebar />
        <main className="min-w-0 flex-1 px-4 pb-8 lg:px-8">
          <FilterPills />
          {browsing && <BuyItAgain />}
          <ProductGrid />
        </main>
      </div>
      <Footer />
      <CartDrawer />
      <AboutModal />
      <CheckoutToast />
    </div>
  )
}
