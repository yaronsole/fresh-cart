import { DEPARTMENTS, SKUS, type FilterTag, type Sku } from '../data/catalog'
import { useStore } from '../store/useStore'
import ProductCard from './ProductCard'
import { deptSlug } from './Sidebar'

const FILTER_HEADINGS: Record<Exclude<FilterTag, 'featured'>, string> = {
  healthier: 'Healthier picks around the store',
  'more-protein': 'More protein',
  'less-sodium': 'Less sodium',
}

function Grid({ skus }: { skus: Sku[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {skus.map(sku => (
        <ProductCard key={sku.id} sku={sku} />
      ))}
    </div>
  )
}

export default function ProductGrid() {
  const filter = useStore(s => s.filter)
  const search = useStore(s => s.search)

  if (search.trim()) {
    const q = search.trim().toLowerCase()
    const matches = SKUS.filter(s => s.name.toLowerCase().includes(q) || s.dept.toLowerCase().includes(q))
    return (
      <section className="mt-2">
        <h2 className="mb-4 text-xl font-bold">
          {matches.length ? `Results for “${search.trim()}”` : `No results for “${search.trim()}”`}
        </h2>
        <Grid skus={matches} />
      </section>
    )
  }

  if (filter !== 'featured') {
    return (
      <section className="mt-2">
        <h2 className="mb-4 text-xl font-bold">{FILTER_HEADINGS[filter]}</h2>
        <Grid skus={SKUS.filter(s => s.tags.includes(filter))} />
      </section>
    )
  }

  return (
    <>
      {DEPARTMENTS.map(dept => (
        <section key={dept} id={deptSlug(dept)} className="mt-10 scroll-mt-24">
          <h2 className="mb-4 text-xl font-bold">{dept}</h2>
          <Grid skus={SKUS.filter(s => s.dept === dept)} />
        </section>
      ))}
    </>
  )
}
