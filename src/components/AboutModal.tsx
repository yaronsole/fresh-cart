import { useStore } from '../store/useStore'
import { XIcon } from './Icons'

export default function AboutModal() {
  const open = useStore(s => s.aboutOpen)
  const setAboutOpen = useStore(s => s.setAboutOpen)
  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-black/40 p-4"
      onClick={() => setAboutOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="About this concept"
        onClick={e => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-bold">About this concept</h2>
          <button
            onClick={() => setAboutOpen(false)}
            aria-label="Close"
            className="-mr-2 -mt-1 grid h-9 w-9 place-items-center rounded-full hover:bg-field"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-3 space-y-3 text-sm leading-relaxed">
          <p>
            Fresh Cart is a concept prototype: as you shop, an embedded assistant quietly suggests a
            healthier pick — with a specific reason — for items where a clearly better option exists.
          </p>
          <p>
            Most items won’t prompt a suggestion at all. That restraint is deliberate: one appears
            only when a swap is genuinely worth your attention.
          </p>
          <p>
            You’re shopping as Alex — a demo account with an order history (that’s the “Buy it
            again” row, and why the assistant sometimes references what Alex usually buys).
          </p>
          <p>
            This storefront shows a first slice of a broader embedded-assistant strategy — the full
            journey map is in the accompanying deck.
          </p>
          <p className="font-semibold">Add a few things to your cart and see what happens.</p>
          <p className="text-xs text-sub">
            Concept prototype by Yaron Sole. Not affiliated with Instacart, Inc. Product photography
            via Open Food Facts (CC BY-SA) and other open sources.
          </p>
        </div>
        <button
          onClick={() => setAboutOpen(false)}
          className="mt-4 h-11 w-full rounded-full bg-brand font-semibold text-white transition-colors hover:bg-brand-dark"
        >
          Start shopping
        </button>
      </div>
    </div>
  )
}
