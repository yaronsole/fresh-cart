// Cart insights — deterministic, invited-only analysis of the whole basket.
// Same voice rules as the reason copy: lead with what's working, name real
// items with real numbers, never moralize, never claim more than the data
// supports. Picks we suggested are never criticized.

import { PERSONA_NAME, PICK_SKUS, REC_BY_SKU, SKU_BY_ID, type Sku } from './catalog'

/** lowercase a sentence's first letter so it can follow "Alex, …" or "Good call — …" */
export const decap = (s: string) => (/^[A-Z][a-z]/.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s)

export interface InsightAction {
  label: string
  /** trigger sku whose healthier pick the chip reveals */
  skuId: string
}

export interface Insight {
  kind: 'strength' | 'improve' | 'note'
  text: string
  action?: InsightAction
}

export const MIN_ITEMS_FOR_INSIGHTS = 4

/** conversational handles for sentences; falls back to the full name */
const SHORT_NAMES: Record<string, string> = {
  'cola-12pk': 'the cola',
  'orange-soda-2l': 'the orange soda',
  'strawberry-yogurt-4pk': 'the strawberry yogurt',
  'applesauce-sweetened': 'the sweetened applesauce',
  'frosted-corn-flakes': 'the frosted flakes',
  'granola-bars-choc': 'the granola bars',
  'orange-juice': 'the orange juice',
  'chicken-soup': 'the chicken noodle soup',
  'soy-sauce': 'the soy sauce',
  'marinara': 'the marinara',
  'salted-nuts': 'the salted nuts',
  'milk-2pct': 'the 2% milk',
  'white-rice': 'the white rice',
  'penne': 'the penne',
  'sour-cream': 'the sour cream',
  'chicken-breast': 'the chicken breast',
  'eggs': 'the eggs',
  'greek-yogurt-4pk': 'the Greek yogurt cups',
  'greek-yogurt-tub': 'the Greek yogurt',
  'chickpea-penne': 'the chickpea penne',
  'uf-milk': 'the ultra-filtered milk',
  'black-beans': 'the black beans',
  'quinoa': 'the quinoa',
  'bananas': 'the bananas',
  'apples': 'the apples',
  'spinach': 'the spinach',
  'avocados': 'the avocados',
  'baby-carrots': 'the baby carrots',
  'cherry-tomatoes': 'the cherry tomatoes',
  'wheat-bread': 'the whole-wheat bread',
  'white-bread': 'the white bread',
  'hummus': 'the hummus',
  'lime-sparkling-12pk': 'the sparkling water',
  'orange-sparkling-1l': 'the orange sparkling water',
  'nut-bars-dark-choc': 'the nut bars',
  'cheddar': 'the cheddar',
  'soy-sauce-rs': 'the reduced-sodium soy sauce',
  'chicken-soup-ls': 'the reduced-sodium soup',
  'marinara-nsa': 'the no-salt marinara',
  'applesauce-unsweetened': 'the unsweetened applesauce',
  'oat-crunch-cereal': 'the oat-crunch cereal',
  'rolled-oats': 'the oats',
  'cold-brew': 'the cold brew',
  'honey-os': 'the Honey O’s',
  'cheddar-crackers': 'the cheddar crackers',
  'dark-chocolate': 'the dark chocolate',
  'tortilla-chips': 'the tortilla chips',
  'unsalted-nuts': 'the unsalted nuts',
  'olive-oil': 'the olive oil',
  'butter': 'the butter',
}

const shortName = (sku: Sku) => SHORT_NAMES[sku.id] ?? sku.name

interface BuildOpts {
  dismissed: string[]
  swapped: string[]
  activeRecSkus: string[]
  maxVisibleRecs: number
}

/**
 * A chip is offered only when tapping it can actually show a card, and only
 * for items the surrounding sentence actually names — it must never surprise.
 */
function recAction(named: (Sku | undefined)[], opts: BuildOpts): InsightAction | undefined {
  for (const sku of named) {
    if (!sku || !REC_BY_SKU[sku.id]) continue
    if (opts.dismissed.includes(sku.id) || opts.swapped.includes(sku.id)) continue
    const alreadyVisible = opts.activeRecSkus.includes(sku.id)
    if (alreadyVisible || opts.activeRecSkus.length < opts.maxVisibleRecs) {
      return { label: 'Show a swap', skuId: sku.id }
    }
  }
  return undefined
}

export function buildInsights(lineSkuIds: string[], opts: BuildOpts): Insight[] {
  const skus = lineSkuIds.map(id => SKU_BY_ID[id])
  const insights: Insight[] = []

  const proteinSources = skus.filter(s => s.nutrition.protein >= 6).sort((a, b) => b.nutrition.protein - a.nutrition.protein)
  const produce = skus.filter(s => s.dept === 'Produce & Fresh')
  // items that arrived via our own swap don't count as the shopper's find;
  // "we'd have suggested" is only claimed for skus the swap cards really offer
  const swappedInPicks = new Set(opts.swapped.map(f => REC_BY_SKU[f].pick))
  const ownFinds = skus.filter(s => PICK_SKUS.has(s.id) && !swappedInPicks.has(s.id))

  // whole produce is never a sugar offender — fruit sugar isn't added sugar
  const improvable = (s: Sku) => !PICK_SKUS.has(s.id) && s.dept !== 'Produce & Fresh' && !s.tags.includes('healthier')
  const sugarHeavy = skus.filter(s => s.nutrition.sugar >= 15 && improvable(s)).sort((a, b) => b.nutrition.sugar - a.nutrition.sugar)
  const sodiumHeavy = skus.filter(s => s.nutrition.sodium >= 400 && improvable(s)).sort((a, b) => b.nutrition.sodium - a.nutrition.sodium)

  // strength first — and the shopper's own choices get credit before ours
  if (proteinSources.length >= 2) {
    const [a, b] = proteinSources
    insights.push({
      kind: 'strength',
      text: `Good protein backbone — ${shortName(a)} (${a.nutrition.protein}g per serving) and ${shortName(b)} (${b.nutrition.protein}g) are carrying it.`,
    })
  } else if (produce.length >= 2) {
    const [a, b] = produce
    insights.push({
      kind: 'strength',
      text: `Nice fresh base — ${shortName(a)} and ${shortName(b)} anchor this cart.`,
    })
  } else if (ownFinds.length >= 2) {
    const [a, b] = ownFinds
    insights.push({
      kind: 'strength',
      text: `${capitalize(shortName(a))} and ${shortName(b)} are exactly what we’d have suggested — you got there first.`,
    })
  } else if (opts.swapped.length >= 1) {
    const lastRec = REC_BY_SKU[opts.swapped[opts.swapped.length - 1]]
    insights.push({
      kind: 'strength',
      text: `Your ${opts.swapped.length > 1 ? 'latest swap' : 'earlier swap'} to ${shortName(SKU_BY_ID[lastRec.pick])} is still paying off: ${lastRec.payoff.toLowerCase()}`,
    })
  }

  // when the offender is one of the shopper's weekly regulars, say so — the
  // inference comes from order history, never from a stated preference
  const regularNote = (x: Sku) =>
    x.buyItAgain ? ' It’s in your cart most weeks — a swap there pays off every week.' : ''

  // biggest single source first, said the way a person would say it
  if (sugarHeavy.length > 0 && sugarHeavy.length >= sodiumHeavy.length) {
    const [x, y] = sugarHeavy
    insights.push({
      kind: 'improve',
      text: y
        ? `Most of the sugar here is ${shortName(x)} (${x.nutrition.sugar}g per serving) and ${shortName(y)} (${y.nutrition.sugar}g).${regularNote(x)}`
        : `Most of the sugar here is ${shortName(x)} — ${x.nutrition.sugar}g per serving.${regularNote(x)}`,
      action: recAction([x, y], opts),
    })
  } else if (sodiumHeavy.length > 0) {
    const [x, y] = sodiumHeavy
    insights.push({
      kind: 'improve',
      text: `Most of the sodium is ${shortName(x)} — ${x.nutrition.sodium}mg a serving${y ? ` (${shortName(y)} adds ${y.nutrition.sodium}mg more)` : ''}.${regularNote(x)}`,
      action: recAction([x, y], opts),
    })
  }

  // what's missing matters as much as what's heavy
  const noProtein = proteinSources.length === 0
  const noProduce = produce.length === 0
  if (noProtein && noProduce) {
    insights.push({
      kind: 'improve',
      text: 'Also: no protein and nothing fresh in here yet — eggs or Greek yogurt for one, bananas or spinach for the other.',
    })
  } else if (noProtein) {
    insights.push({
      kind: 'improve',
      text: 'One gap: protein. Eggs, Greek yogurt, or chicken breast would cover it.',
    })
  } else if (noProduce) {
    insights.push({
      kind: 'improve',
      text: 'One gap: nothing fresh in here. Bananas, spinach, or a couple of avocados would fix that.',
    })
  }

  // nothing heavy, nothing missing — but never say "nothing to change"
  // while a swap card is (or could be) offering a change
  if (!insights.some(i => i.kind === 'improve')) {
    const upgradable = skus.find(
      s => REC_BY_SKU[s.id] && !opts.swapped.includes(s.id) && !opts.dismissed.includes(s.id),
    )
    if (upgradable) {
      insights.push({
        kind: 'improve',
        text: `Nothing major here — though there’s an easy upgrade for ${shortName(upgradable)} if you want it.`,
        action: recAction([upgradable], opts),
      })
    } else {
      insights.push({
        kind: 'note',
        text: 'Nothing here we’d change — sugar, sodium, and protein all check out.',
      })
    }
  }

  // the shopper is addressed by name exactly once, on the opening line
  if (insights.length > 0) {
    insights[0] = { ...insights[0], text: `${PERSONA_NAME}, ${decap(insights[0].text)}` }
  }

  return insights
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
