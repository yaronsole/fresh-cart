import { useStore } from '../store/useStore'

export default function Footer() {
  const setAboutOpen = useStore(s => s.setAboutOpen)
  const reset = useStore(s => s.reset)

  return (
    <footer className="mt-20 border-t border-line py-8">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 text-xs text-sub">
        <span>Concept prototype by Yaron Sole · Not affiliated with Instacart, Inc.</span>
        <button onClick={() => setAboutOpen(true)} className="underline underline-offset-2 hover:text-ink">
          About this concept
        </button>
        <button
          onClick={() => {
            reset()
            window.scrollTo({ top: 0 })
          }}
          className="underline underline-offset-2 hover:text-ink"
        >
          Reset
        </button>
      </div>
    </footer>
  )
}
