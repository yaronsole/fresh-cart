import { useStore, useCartCount } from '../store/useStore'
import { CartIcon, LogoGlyph, PinIcon, SearchIcon } from './Icons'

export default function Header() {
  const search = useStore(s => s.search)
  const setSearch = useStore(s => s.setSearch)
  const setDrawerOpen = useStore(s => s.setDrawerOpen)
  const count = useCartCount()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto flex h-20 max-w-[1440px] items-center gap-3 px-4 lg:px-8">
        <a
          href="#top"
          className="flex shrink-0 items-center gap-2"
          onClick={e => {
            e.preventDefault()
            window.scrollTo({ top: 0 })
          }}
        >
          <LogoGlyph />
          <span className="hidden text-[22px] font-bold tracking-tight text-kale sm:block">Fresh Cart</span>
        </a>

        <div className="relative mx-auto w-full max-w-3xl">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-sub" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search groceries"
            aria-label="Search groceries"
            className="h-12 w-full rounded-full bg-field pl-11 pr-4 text-[15px] outline-none placeholder:text-sub focus:ring-2 focus:ring-kale/20"
          />
        </div>

        <button className="hidden shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium hover:bg-field lg:flex">
          <PinIcon className="h-4 w-4 text-kale" />
          94110 · Fast delivery
        </button>

        <button
          onClick={() => setDrawerOpen(true)}
          aria-label={`Open cart, ${count} items`}
          className="flex h-12 shrink-0 items-center gap-2 rounded-full bg-brand px-4 font-semibold text-white transition-colors hover:bg-brand-dark sm:px-5"
        >
          <CartIcon />
          <span className="text-sm">{count}</span>
        </button>
      </div>
    </header>
  )
}
