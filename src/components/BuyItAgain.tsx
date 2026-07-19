import { BUY_IT_AGAIN, SKU_BY_ID } from '../data/catalog'
import ProductCard from './ProductCard'

export default function BuyItAgain() {
  return (
    <section id="buy-it-again" className="scroll-mt-24">
      <h2 className="text-xl font-bold">Buy it again</h2>
      <div className="-mx-1 mt-3 flex gap-4 overflow-x-auto px-1 pb-2">
        {BUY_IT_AGAIN.map(id => (
          <div key={id} className="w-36 shrink-0 sm:w-40">
            <ProductCard sku={SKU_BY_ID[id]} />
          </div>
        ))}
      </div>
    </section>
  )
}
