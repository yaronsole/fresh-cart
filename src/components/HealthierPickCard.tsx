import { formatPrice, productImage, REC_BY_SKU, SKU_BY_ID } from '../data/catalog'
import { useStore } from '../store/useStore'

export default function HealthierPickCard({ forSku, reason }: { forSku: string; reason: string }) {
  const swap = useStore(s => s.swap)
  const dismissRec = useStore(s => s.dismissRec)
  const rec = REC_BY_SKU[forSku]
  if (!rec) return null
  const pick = SKU_BY_ID[rec.pick]
  const original = SKU_BY_ID[forSku]
  const delta = pick.price - original.price

  return (
    <div className="rec-enter mx-4 mb-4 rounded-xl border border-tint-line bg-tint p-3">
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span aria-hidden className="text-sm leading-none text-brand">✦</span>
        <span className="text-[13px] font-semibold text-kale">Healthier pick</span>
        {rec.dimensions.map(d => (
          <span
            key={d}
            className="rounded-full border border-tint-line bg-white px-2 py-0.5 text-[11px] font-medium text-kale"
          >
            {d}
          </span>
        ))}
      </div>

      <div className="mt-2.5 flex items-center gap-3">
        <img
          src={productImage(pick.id)}
          alt={pick.name}
          className="h-11 w-11 shrink-0 rounded-lg border border-line bg-white object-contain p-0.5"
        />
        <div className="min-w-0 flex-1">
          <div className="line-clamp-2 text-sm font-medium leading-snug">{pick.name}</div>
          <div className="text-xs text-sub">{pick.unit}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold">{formatPrice(pick.price)}</div>
          {delta < -0.001 && (
            <div className="text-xs font-semibold text-brand">{formatPrice(-delta)} less</div>
          )}
        </div>
      </div>

      <p className="mt-2 text-sm leading-snug">{reason}</p>

      <div className="mt-3 flex items-center gap-2">
        <button
          onClick={() => swap(forSku)}
          className="h-8 rounded-full bg-brand px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Swap
        </button>
        <button
          onClick={() => dismissRec(forSku)}
          className="h-8 rounded-full px-3 text-sm font-medium text-sub transition-colors hover:bg-white hover:text-ink"
        >
          No thanks
        </button>
      </div>
    </div>
  )
}
