import { useEffect } from 'react'
import { formatPrice, productImage, REC_BY_SKU, SKU_BY_ID } from '../data/catalog'
import { useCartCount, useStore, useSubtotal } from '../store/useStore'
import CartInsights from './CartInsights'
import HealthierPickCard from './HealthierPickCard'
import { CartIcon, LogoGlyph, MinusIcon, PlusIcon, TrashIcon, XIcon } from './Icons'

// ✦ burst when a swap lands — a handful of brand-green sparks, then gone
const SPARKS: { dx: number; dy: number; size: number; delay: number; color: string }[] = [
  { dx: -30, dy: -38, size: 13, delay: 0, color: '#108910' },
  { dx: 8, dy: -50, size: 10, delay: 60, color: '#2ba82b' },
  { dx: 34, dy: -32, size: 12, delay: 30, color: '#003d29' },
  { dx: -48, dy: -14, size: 9, delay: 90, color: '#2ba82b' },
  { dx: 52, dy: -10, size: 10, delay: 110, color: '#108910' },
  { dx: -12, dy: -56, size: 8, delay: 40, color: '#003d29' },
  { dx: 22, dy: -20, size: 9, delay: 130, color: '#108910' },
]

function SparkleBurst() {
  return (
    <span aria-hidden className="pointer-events-none absolute left-8 top-1">
      {SPARKS.map((p, i) => (
        <span
          key={i}
          className="sparkle absolute"
          style={{
            '--dx': `${p.dx}px`,
            '--dy': `${p.dy}px`,
            fontSize: p.size,
            color: p.color,
            animationDelay: `${p.delay}ms`,
          } as React.CSSProperties}
        >
          ✦
        </span>
      ))}
    </span>
  )
}

/** rows that arrived via a swap keep a small ✦ for the session */
const swappedInPick = (skuId: string, swapped: string[]) =>
  swapped.some(forSku => REC_BY_SKU[forSku].pick === skuId)

function CartItemRow({ skuId, qty }: { skuId: string; qty: number }) {
  const setQty = useStore(s => s.setQty)
  const addItem = useStore(s => s.addItem)
  const removeItem = useStore(s => s.removeItem)
  const isSwapWin = useStore(s => swappedInPick(skuId, s.swapped))
  const sku = SKU_BY_ID[skuId]

  return (
    <div className="flex gap-3 px-4 py-4">
      <img
        src={productImage(sku.id)}
        alt={sku.name}
        className="h-14 w-14 shrink-0 rounded-lg border border-line bg-white object-contain p-1"
      />
      <div className="min-w-0 flex-1">
        <div className="line-clamp-2 text-sm font-medium leading-snug">
          {sku.name}
          {isSwapWin && (
            <span aria-label="Swapped to a healthier pick" title="Swapped to a healthier pick" className="ml-1.5 text-xs text-brand">
              ✦
            </span>
          )}
        </div>
        <div className="mt-0.5 text-xs text-sub">{sku.unit}</div>
        <div className="mt-2 flex h-8 w-fit items-center rounded-full border border-line">
          <button
            onClick={() => (qty === 1 ? removeItem(skuId) : setQty(skuId, qty - 1))}
            aria-label={qty === 1 ? `Remove ${sku.name}` : `Decrease quantity of ${sku.name}`}
            className="grid h-8 w-8 place-items-center rounded-full text-sub hover:text-ink"
          >
            {qty === 1 ? <TrashIcon className="h-3.5 w-3.5" /> : <MinusIcon className="h-3.5 w-3.5" />}
          </button>
          <span className="min-w-5 text-center text-sm font-semibold">{qty}</span>
          <button
            onClick={() => addItem(skuId)}
            aria-label={`Increase quantity of ${sku.name}`}
            className="grid h-8 w-8 place-items-center rounded-full text-sub hover:text-ink"
          >
            <PlusIcon className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="whitespace-nowrap text-sm font-semibold">{formatPrice(sku.price * qty)}</div>
    </div>
  )
}

export default function CartDrawer() {
  const open = useStore(s => s.drawerOpen)
  const setDrawerOpen = useStore(s => s.setDrawerOpen)
  const lines = useStore(s => s.lines)
  const activeRecs = useStore(s => s.activeRecs)
  const swappedFlash = useStore(s => s.swappedFlash)
  const checkout = useStore(s => s.checkout)
  const subtotal = useSubtotal()
  const count = useCartCount()

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-200 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-out sm:w-[420px] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-line px-4">
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close cart"
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-field"
          >
            <XIcon />
          </button>
          <LogoGlyph className="h-7 w-7" />
          <div>
            <div className="text-[15px] font-semibold leading-tight">Fresh Cart</div>
            <div className="text-xs text-sub">
              Personal cart · {count} {count === 1 ? 'item' : 'items'}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {lines.length === 0 ? (
            <div className="px-8 pt-24 text-center">
              <CartIcon className="mx-auto h-12 w-12 text-line" />
              <div className="mt-4 font-semibold">Your cart is empty</div>
              <p className="mt-1 text-sm text-sub">Add groceries and they’ll show up here.</p>
            </div>
          ) : (
            <div className="divide-y divide-line">
              {lines.map(line => {
                const rec = activeRecs.find(r => r.forSku === line.skuId)
                return (
                  <div key={line.skuId} id={`cart-line-${line.skuId}`}>
                    <CartItemRow skuId={line.skuId} qty={line.qty} />
                    {rec && <HealthierPickCard forSku={rec.forSku} reason={rec.reason} />}
                    {swappedFlash?.skuId === line.skuId && (
                      <div className="flash-fade relative mx-4 mb-3 text-sm font-semibold text-brand">
                        <SparkleBurst />
                        ✦ <span className="font-medium text-kale">{swappedFlash.text}</span>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {lines.length > 0 && <CartInsights />}

        {lines.length > 0 && (
          <div className="shrink-0 border-t border-line p-4">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-sub">Subtotal</span>
              <span className="font-bold">{formatPrice(subtotal)}</span>
            </div>
            <button
              onClick={checkout}
              className="relative h-12 w-full rounded-full bg-brand font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Go to checkout
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-semibold">
                {formatPrice(subtotal)}
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  )
}
