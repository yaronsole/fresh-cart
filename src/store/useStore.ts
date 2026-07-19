import { create } from 'zustand'
import { REC_BY_SKU, SKU_BY_ID, type FilterTag } from '../data/catalog'

export interface Line {
  skuId: string
  qty: number
}

export interface ActiveRec {
  forSku: string
  /** resolved at the moment the card appears (may be a cart-aware variant) */
  reason: string
}

const REC_DELAY_MS = 400
const MAX_VISIBLE_RECS = 3

interface StoreState {
  lines: Line[]
  activeRecs: ActiveRec[]
  dismissed: string[]
  swapped: string[]
  drawerOpen: boolean
  filter: FilterTag
  search: string
  checkoutToast: boolean
  swappedFlash: string | null
  aboutOpen: boolean

  addItem: (skuId: string) => void
  setQty: (skuId: string, qty: number) => void
  removeItem: (skuId: string) => void
  swap: (forSku: string) => void
  dismissRec: (forSku: string) => void
  setDrawerOpen: (open: boolean) => void
  setFilter: (filter: FilterTag) => void
  setSearch: (search: string) => void
  checkout: () => void
  setAboutOpen: (open: boolean) => void
  reset: () => void
}

const initialState = {
  lines: [] as Line[],
  activeRecs: [] as ActiveRec[],
  dismissed: [] as string[],
  swapped: [] as string[],
  drawerOpen: false,
  filter: 'featured' as FilterTag,
  search: '',
  checkoutToast: false,
  swappedFlash: null as string | null,
  aboutOpen: false,
}

export const useStore = create<StoreState>((set, get) => {
  let flashTimer: ReturnType<typeof setTimeout> | undefined
  let toastTimer: ReturnType<typeof setTimeout> | undefined

  /** After the add lands, decide whether a healthier pick should appear beneath it. */
  const scheduleRec = (skuId: string) => {
    const rec = REC_BY_SKU[skuId]
    if (!rec) return
    setTimeout(() => {
      const s = get()
      const eligible =
        s.lines.some(l => l.skuId === skuId) &&
        !s.dismissed.includes(skuId) &&
        !s.swapped.includes(skuId) &&
        !s.activeRecs.some(r => r.forSku === skuId) &&
        s.activeRecs.length < MAX_VISIBLE_RECS
      if (!eligible) return
      const variant = rec.contextVariants?.find(v =>
        s.lines.some(l => l.skuId === v.ifInCart && l.skuId !== skuId),
      )
      set({ activeRecs: [...s.activeRecs, { forSku: skuId, reason: variant?.reason ?? rec.reason }] })
    }, REC_DELAY_MS)
  }

  return {
    ...initialState,

    addItem: skuId => {
      const { lines } = get()
      const existing = lines.find(l => l.skuId === skuId)
      if (existing) {
        set({
          lines: lines.map(l => (l.skuId === skuId ? { ...l, qty: l.qty + 1 } : l)),
          drawerOpen: true,
        })
        return
      }
      set({ lines: [...lines, { skuId, qty: 1 }], drawerOpen: true })
      scheduleRec(skuId)
    },

    setQty: (skuId, qty) => {
      if (qty <= 0) {
        get().removeItem(skuId)
        return
      }
      set({ lines: get().lines.map(l => (l.skuId === skuId ? { ...l, qty } : l)) })
    },

    removeItem: skuId => {
      const s = get()
      set({
        lines: s.lines.filter(l => l.skuId !== skuId),
        activeRecs: s.activeRecs.filter(r => r.forSku !== skuId),
      })
    },

    swap: forSku => {
      const rec = REC_BY_SKU[forSku]
      if (!rec) return
      const s = get()
      const line = s.lines.find(l => l.skuId === forSku)
      if (!line) return
      const existingPick = s.lines.find(l => l.skuId === rec.pick)
      let lines: Line[]
      if (existingPick) {
        lines = s.lines
          .filter(l => l.skuId !== rec.pick)
          .map(l => (l.skuId === forSku ? { skuId: rec.pick, qty: l.qty + existingPick.qty } : l))
      } else {
        lines = s.lines.map(l => (l.skuId === forSku ? { skuId: rec.pick, qty: l.qty } : l))
      }
      set({
        lines,
        activeRecs: s.activeRecs.filter(r => r.forSku !== forSku),
        swapped: [...s.swapped, forSku],
        swappedFlash: rec.pick,
      })
      clearTimeout(flashTimer)
      flashTimer = setTimeout(() => set({ swappedFlash: null }), 2100)
    },

    dismissRec: forSku => {
      const s = get()
      set({
        activeRecs: s.activeRecs.filter(r => r.forSku !== forSku),
        dismissed: [...s.dismissed, forSku],
      })
    },

    setDrawerOpen: open => set({ drawerOpen: open }),
    setFilter: filter => set({ filter, search: '' }),
    setSearch: search => set({ search }),

    checkout: () => {
      set({ checkoutToast: true })
      clearTimeout(toastTimer)
      toastTimer = setTimeout(() => set({ checkoutToast: false }), 4000)
    },

    setAboutOpen: open => set({ aboutOpen: open }),

    reset: () => set({ ...initialState }),
  }
})

export const useSubtotal = () =>
  useStore(s => s.lines.reduce((sum, l) => sum + SKU_BY_ID[l.skuId].price * l.qty, 0))

export const useCartCount = () => useStore(s => s.lines.reduce((sum, l) => sum + l.qty, 0))
