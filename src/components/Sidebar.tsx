import { DEPARTMENTS } from '../data/catalog'
import { useStore } from '../store/useStore'
import { RepeatIcon } from './Icons'

export const deptSlug = (dept: string) => `dept-${dept.toLowerCase().replace(/[^a-z]+/g, '-')}`

const DEPT_EMOJI: Record<string, string> = {
  'Breakfast & Cereal': '🥣',
  Snacks: '🍿',
  Beverages: '🥤',
  'Dairy & Eggs': '🥚',
  'Pantry & Canned': '🥫',
  'Produce & Fresh': '🥬',
}

export default function Sidebar() {
  const filter = useStore(s => s.filter)
  const search = useStore(s => s.search)
  const setFilter = useStore(s => s.setFilter)

  const goTo = (id: string) => {
    // Sections only exist in the default browse view; restore it first if needed.
    if (filter !== 'featured' || search) {
      setFilter('featured')
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ block: 'start' }), 60)
    } else {
      document.getElementById(id)?.scrollIntoView({ block: 'start' })
    }
  }

  return (
    <aside className="sticky top-20 hidden max-h-[calc(100vh-5rem)] w-64 shrink-0 self-start overflow-y-auto py-6 pl-4 pr-2 lg:block">
      <nav className="space-y-1">
        <button
          onClick={() => goTo('buy-it-again')}
          className="flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-left text-[15px] font-semibold hover:bg-field"
        >
          <RepeatIcon className="h-4 w-4 text-kale" />
          Buy it again
        </button>
        {DEPARTMENTS.map(dept => (
          <button
            key={dept}
            onClick={() => goTo(deptSlug(dept))}
            className="flex w-full items-center gap-3 rounded-full px-4 py-2.5 text-left text-[15px] font-medium hover:bg-field"
          >
            <span className="text-base leading-none">{DEPT_EMOJI[dept]}</span>
            {dept}
          </button>
        ))}
      </nav>
    </aside>
  )
}
