import type { FilterTag } from '../data/catalog'
import { useStore } from '../store/useStore'

const PILLS: { tag: FilterTag; label: string }[] = [
  { tag: 'featured', label: 'Featured' },
  { tag: 'healthier', label: 'Healthier' },
  { tag: 'more-protein', label: 'More protein' },
  { tag: 'less-sodium', label: 'Less sodium' },
]

export default function FilterPills() {
  const filter = useStore(s => s.filter)
  const search = useStore(s => s.search)
  const setFilter = useStore(s => s.setFilter)

  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto py-4">
      {PILLS.map(({ tag, label }) => {
        const active = filter === tag && !search
        return (
          <button
            key={tag}
            onClick={() => setFilter(tag)}
            className={`h-9 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors ${
              active ? 'border-kale bg-kale text-white' : 'border-line bg-white hover:border-sub'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
