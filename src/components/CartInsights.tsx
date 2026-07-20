import { MIN_ITEMS_FOR_INSIGHTS } from '../data/insights'
import { useStore } from '../store/useStore'
import { XIcon } from './Icons'

export default function CartInsights() {
  const lineCount = useStore(s => s.lines.length)
  const status = useStore(s => s.insightsStatus)
  const insights = useStore(s => s.insights)
  const stale = useStore(s => s.insightsStale)
  const generateInsights = useStore(s => s.generateInsights)
  const closeInsights = useStore(s => s.closeInsights)
  const revealRec = useStore(s => s.revealRec)

  if (lineCount < MIN_ITEMS_FOR_INSIGHTS) return null

  const showSwap = (skuId: string) => {
    revealRec(skuId)
    // if the card can no longer be delivered (item removed, rec dismissed
    // since generation), regenerate instead of doing nothing
    if (!useStore.getState().activeRecs.some(r => r.forSku === skuId)) {
      generateInsights()
      return
    }
    setTimeout(() => {
      document
        .getElementById(`cart-line-${skuId}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 120)
  }

  return (
    <div className="shrink-0 border-t border-line px-4 py-3">
      {status === 'idle' && (
        <button
          onClick={generateInsights}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-full border border-tint-line bg-tint text-sm font-semibold text-kale transition-colors hover:bg-[#e7f5e7]"
        >
          <span aria-hidden className="text-brand">✦</span>
          How healthy is my cart?
        </button>
      )}

      {status === 'loading' && (
        <div className="rounded-xl border border-tint-line bg-tint p-3" aria-label="Generating cart insights">
          <div className="flex items-center gap-2">
            <span aria-hidden className="text-sm text-brand">✦</span>
            <span className="text-[13px] font-semibold text-kale">Looking at your cart…</span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="h-2.5 w-4/5 animate-pulse rounded-full bg-tint-line" />
            <div className="h-2.5 w-3/5 animate-pulse rounded-full bg-tint-line" />
          </div>
        </div>
      )}

      {status === 'ready' && (
        <div className="rounded-xl border border-tint-line bg-tint p-3">
          <div className="flex items-center gap-2">
            <span aria-hidden className="text-sm text-brand">✦</span>
            <span className="text-[13px] font-semibold text-kale">Cart insights</span>
            <button
              onClick={closeInsights}
              aria-label="Close cart insights"
              className="ml-auto grid h-7 w-7 place-items-center rounded-full text-sub hover:bg-white hover:text-ink"
            >
              <XIcon className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="mt-2 space-y-2.5">
            {insights.map((insight, i) => (
              <div key={i}>
                <p className="text-sm leading-snug">{insight.text}</p>
                {insight.action && !stale && (
                  <button
                    onClick={() => showSwap(insight.action!.skuId)}
                    className="mt-1.5 h-7 rounded-full bg-brand px-3 text-xs font-semibold text-white transition-colors hover:bg-brand-dark"
                  >
                    {insight.action.label}
                  </button>
                )}
              </div>
            ))}
          </div>
          {stale && (
            <button
              onClick={generateInsights}
              className="mt-2.5 text-xs font-medium text-sub underline underline-offset-2 hover:text-ink"
            >
              Cart changed — refresh insights
            </button>
          )}
        </div>
      )}
    </div>
  )
}
