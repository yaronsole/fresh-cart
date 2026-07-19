import { formatPrice, productImage, type Sku } from '../data/catalog'
import { useStore } from '../store/useStore'
import { MinusIcon, PlusIcon, TrashIcon } from './Icons'

function AddControl({ sku }: { sku: Sku }) {
  const qty = useStore(s => s.lines.find(l => l.skuId === sku.id)?.qty ?? 0)
  const addItem = useStore(s => s.addItem)
  const setQty = useStore(s => s.setQty)
  const removeItem = useStore(s => s.removeItem)

  if (qty === 0) {
    return (
      <button
        onClick={() => addItem(sku.id)}
        aria-label={`Add ${sku.name}`}
        className="flex h-9 items-center gap-1 rounded-full bg-brand pl-2.5 pr-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-dark"
      >
        <PlusIcon className="h-3.5 w-3.5" />
        Add
      </button>
    )
  }

  return (
    <div className="flex h-9 items-center rounded-full bg-brand px-1 text-white shadow-sm">
      <button
        onClick={() => (qty === 1 ? removeItem(sku.id) : setQty(sku.id, qty - 1))}
        aria-label={qty === 1 ? `Remove ${sku.name}` : `Decrease quantity of ${sku.name}`}
        className="grid h-7 w-7 place-items-center rounded-full hover:bg-brand-dark"
      >
        {qty === 1 ? <TrashIcon className="h-3.5 w-3.5" /> : <MinusIcon className="h-3.5 w-3.5" />}
      </button>
      <span className="min-w-6 text-center text-sm font-semibold">{qty}</span>
      <button
        onClick={() => addItem(sku.id)}
        aria-label={`Increase quantity of ${sku.name}`}
        className="grid h-7 w-7 place-items-center rounded-full hover:bg-brand-dark"
      >
        <PlusIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  )
}

export default function ProductCard({ sku }: { sku: Sku }) {
  return (
    <div className="flex flex-col">
      <div className="relative mb-2">
        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white">
          <img
            src={productImage(sku.id)}
            alt={sku.name}
            loading="lazy"
            className="max-h-[88%] max-w-[88%] object-contain"
          />
        </div>
        <div className="absolute right-2 top-2">
          <AddControl sku={sku} />
        </div>
      </div>
      <div className="text-[15px] font-semibold">{formatPrice(sku.price)}</div>
      <div className="mt-0.5 line-clamp-2 text-sm leading-snug">{sku.name}</div>
      <div className="mt-0.5 text-xs text-sub">{sku.unit}</div>
      {sku.stockNote && <div className="mt-0.5 text-xs text-sub">{sku.stockNote}</div>}
    </div>
  )
}
