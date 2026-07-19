// Fresh Cart catalog — SKUs, healthier-pick map, and reason copy.
// Nutrition values are per serving and drive the reason copy below.

export type Department =
  | 'Breakfast & Cereal'
  | 'Snacks'
  | 'Beverages'
  | 'Dairy & Eggs'
  | 'Pantry & Canned'
  | 'Produce & Fresh'

export const DEPARTMENTS: Department[] = [
  'Breakfast & Cereal',
  'Snacks',
  'Beverages',
  'Dairy & Eggs',
  'Pantry & Canned',
  'Produce & Fresh',
]

export type FilterTag = 'featured' | 'healthier' | 'more-protein' | 'less-sodium'

export interface Sku {
  id: string
  name: string
  price: number
  unit: string
  dept: Department
  /** per-serving nutrition backing the reason copy */
  nutrition: { sugar: number; protein: number; sodium: number }
  tags: FilterTag[]
  stockNote?: string
  buyItAgain?: boolean
}

export type Dimension = 'Less sugar' | 'More protein' | 'Less sodium'

export interface Rec {
  /** sku that triggers the suggestion when added */
  forSku: string
  /** the healthier pick offered as a swap */
  pick: string
  dimensions: Dimension[]
  reason: string
  /** optional reason overrides when another item is in the cart */
  contextVariants?: { ifInCart: string; reason: string }[]
}

export const SKUS: Sku[] = [
  // ── Breakfast & Cereal ────────────────────────────────────────────────
  { id: 'frosted-corn-flakes', name: 'Morningfield Frosted Corn Flakes', price: 4.49, unit: '13.5 oz box', dept: 'Breakfast & Cereal', nutrition: { sugar: 12, protein: 1, sodium: 150 }, tags: ['featured'], stockNote: 'Many in stock', buyItAgain: true },
  { id: 'oat-crunch-cereal', name: 'Hillside Oat Crunch — Low Sugar', price: 4.19, unit: '14 oz box', dept: 'Breakfast & Cereal', nutrition: { sugar: 3, protein: 5, sodium: 115 }, tags: ['healthier'], stockNote: 'Many in stock' },
  { id: 'honey-os', name: "Golden Farm Honey O's", price: 3.99, unit: '12.8 oz box', dept: 'Breakfast & Cereal', nutrition: { sugar: 9, protein: 2, sodium: 160 }, tags: [] },
  { id: 'rolled-oats', name: 'Stoneground Old-Fashioned Rolled Oats', price: 3.29, unit: '42 oz canister', dept: 'Breakfast & Cereal', nutrition: { sugar: 1, protein: 5, sodium: 0 }, tags: ['healthier'], stockNote: 'Many in stock' },
  { id: 'granola-bars-choc', name: 'Sunrise Chocolate Chip Granola Bars', price: 3.99, unit: '6 bars', dept: 'Breakfast & Cereal', nutrition: { sugar: 11, protein: 2, sodium: 95 }, tags: ['featured'] },
  { id: 'nut-bars-dark-choc', name: 'Alpine Almond & Dark Chocolate Bars', price: 4.79, unit: '6 bars', dept: 'Breakfast & Cereal', nutrition: { sugar: 4, protein: 6, sodium: 65 }, tags: ['healthier', 'more-protein'] },

  // ── Snacks ────────────────────────────────────────────────────────────
  { id: 'tortilla-chips', name: 'Crunch Bros Restaurant-Style Tortilla Chips', price: 3.99, unit: '13 oz bag', dept: 'Snacks', nutrition: { sugar: 0, protein: 2, sodium: 115 }, tags: ['featured'], stockNote: 'Many in stock' },
  { id: 'salted-nuts', name: 'Orchard Hollow Roasted & Salted Mixed Nuts', price: 8.99, unit: '16 oz jar', dept: 'Snacks', nutrition: { sugar: 1, protein: 6, sodium: 170 }, tags: ['featured'] },
  { id: 'unsalted-nuts', name: 'Orchard Hollow Unsalted Mixed Nuts', price: 8.99, unit: '16 oz jar', dept: 'Snacks', nutrition: { sugar: 1, protein: 6, sodium: 0 }, tags: ['healthier', 'less-sodium'] },
  { id: 'applesauce-sweetened', name: 'Orchard Hollow Sweetened Applesauce Cups', price: 3.29, unit: '4 oz cups, 6 ct', dept: 'Snacks', nutrition: { sugar: 22, protein: 0, sodium: 10 }, tags: ['featured'] },
  { id: 'applesauce-unsweetened', name: 'Orchard Hollow Unsweetened Applesauce Cups', price: 3.29, unit: '4 oz cups, 6 ct', dept: 'Snacks', nutrition: { sugar: 11, protein: 0, sodium: 0 }, tags: ['healthier'] },
  { id: 'hummus', name: 'Sesame & Stone Classic Hummus', price: 3.99, unit: '10 oz tub', dept: 'Snacks', nutrition: { sugar: 1, protein: 2, sodium: 130 }, tags: ['healthier'], stockNote: 'Many in stock' },
  { id: 'cheddar-crackers', name: 'Golden Farm Baked Cheddar Crackers', price: 3.49, unit: '7 oz box', dept: 'Snacks', nutrition: { sugar: 2, protein: 3, sodium: 230 }, tags: [] },
  { id: 'dark-chocolate', name: 'Noir 70% Dark Chocolate Bar', price: 2.99, unit: '3.5 oz bar', dept: 'Snacks', nutrition: { sugar: 10, protein: 2, sodium: 5 }, tags: [] },

  // ── Beverages ─────────────────────────────────────────────────────────
  { id: 'cola-12pk', name: 'Summit Classic Cola', price: 7.99, unit: '12 fl oz cans, 12 ct', dept: 'Beverages', nutrition: { sugar: 39, protein: 0, sodium: 45 }, tags: ['featured'], stockNote: 'Many in stock', buyItAgain: true },
  { id: 'lime-sparkling-12pk', name: 'Ridgewater Lime Sparkling Water', price: 5.49, unit: '12 fl oz cans, 12 ct', dept: 'Beverages', nutrition: { sugar: 0, protein: 0, sodium: 0 }, tags: ['healthier'], stockNote: 'Many in stock' },
  { id: 'orange-soda-2l', name: 'Popfizz Orange Soda', price: 2.79, unit: '2 L bottle', dept: 'Beverages', nutrition: { sugar: 44, protein: 0, sodium: 60 }, tags: ['featured'] },
  { id: 'orange-sparkling-1l', name: 'Ridgewater Orange Sparkling Water', price: 2.49, unit: '2 L bottle', dept: 'Beverages', nutrition: { sugar: 0, protein: 0, sodium: 5 }, tags: ['healthier'] },
  { id: 'cold-brew', name: 'Ridgeline Cold Brew Black Coffee', price: 4.49, unit: '32 fl oz bottle', dept: 'Beverages', nutrition: { sugar: 0, protein: 0, sodium: 10 }, tags: [] },
  { id: 'orange-juice', name: 'Sunrow 100% Orange Juice', price: 5.49, unit: '52 fl oz', dept: 'Beverages', nutrition: { sugar: 22, protein: 1, sodium: 0 }, tags: [] },

  // ── Dairy & Eggs ──────────────────────────────────────────────────────
  { id: 'strawberry-yogurt-4pk', name: 'Berry Patch Strawberry Lowfat Yogurt', price: 3.49, unit: '4 oz cups, 4 ct', dept: 'Dairy & Eggs', nutrition: { sugar: 16, protein: 5, sodium: 65 }, tags: ['featured'], buyItAgain: true },
  { id: 'greek-yogurt-4pk', name: 'Hellenic Plain Greek Yogurt Cups', price: 3.99, unit: '5.3 oz cups, 4 ct', dept: 'Dairy & Eggs', nutrition: { sugar: 5, protein: 15, sodium: 55 }, tags: ['healthier', 'more-protein'] },
  { id: 'greek-yogurt-tub', name: 'Hellenic Plain Greek Yogurt', price: 3.29, unit: '16 oz tub', dept: 'Dairy & Eggs', nutrition: { sugar: 4, protein: 6, sodium: 25 }, tags: ['healthier', 'more-protein'] },
  { id: 'sour-cream', name: 'Meadowbrook Sour Cream', price: 2.99, unit: '16 oz tub', dept: 'Dairy & Eggs', nutrition: { sugar: 2, protein: 1, sodium: 30 }, tags: ['featured'] },
  { id: 'milk-2pct', name: 'Meadowbrook 2% Reduced-Fat Milk', price: 3.49, unit: '0.5 gal', dept: 'Dairy & Eggs', nutrition: { sugar: 12, protein: 8, sodium: 120 }, tags: ['featured'], stockNote: 'Many in stock' },
  { id: 'uf-milk', name: 'Alpenglow Ultra-Filtered 2% Milk', price: 3.99, unit: '52 fl oz', dept: 'Dairy & Eggs', nutrition: { sugar: 6, protein: 13, sodium: 135 }, tags: ['healthier', 'more-protein'] },
  { id: 'eggs', name: 'Sunny Acres Large Grade A Eggs', price: 3.79, unit: '12 ct', dept: 'Dairy & Eggs', nutrition: { sugar: 0, protein: 6, sodium: 70 }, tags: ['more-protein'], stockNote: 'Many in stock', buyItAgain: true },
  { id: 'cheddar', name: 'Seacliff Sharp Cheddar', price: 4.99, unit: '8 oz block', dept: 'Dairy & Eggs', nutrition: { sugar: 0, protein: 7, sodium: 180 }, tags: [] },
  { id: 'butter', name: 'Meadowbrook Salted Butter', price: 4.49, unit: '16 oz, 4 sticks', dept: 'Dairy & Eggs', nutrition: { sugar: 0, protein: 0, sodium: 90 }, tags: [] },

  // ── Pantry & Canned ───────────────────────────────────────────────────
  { id: 'marinara', name: 'Nonna Rosa Classic Marinara', price: 3.49, unit: '24 oz jar', dept: 'Pantry & Canned', nutrition: { sugar: 6, protein: 2, sodium: 480 }, tags: ['featured'], stockNote: 'Many in stock' },
  { id: 'marinara-nsa', name: 'Nonna Rosa No-Salt-Added Marinara', price: 3.49, unit: '24 oz jar', dept: 'Pantry & Canned', nutrition: { sugar: 6, protein: 2, sodium: 40 }, tags: ['healthier', 'less-sodium'] },
  { id: 'penne', name: 'Bella Grano Penne Rigate', price: 2.49, unit: '16 oz', dept: 'Pantry & Canned', nutrition: { sugar: 1, protein: 6, sodium: 0 }, tags: ['featured'], stockNote: 'Many in stock', buyItAgain: true },
  { id: 'chickpea-penne', name: 'Verde Legume Chickpea Penne', price: 2.99, unit: '16 oz', dept: 'Pantry & Canned', nutrition: { sugar: 2, protein: 13, sodium: 45 }, tags: ['healthier', 'more-protein'] },
  { id: 'chicken-soup', name: 'Harvest Home Chicken Noodle Soup', price: 2.29, unit: '10.5 oz can', dept: 'Pantry & Canned', nutrition: { sugar: 1, protein: 3, sodium: 890 }, tags: ['featured'], buyItAgain: true },
  { id: 'chicken-soup-ls', name: 'Harvest Home Low-Sodium Chicken Noodle Soup', price: 2.29, unit: '10.5 oz can', dept: 'Pantry & Canned', nutrition: { sugar: 1, protein: 3, sodium: 410 }, tags: ['healthier', 'less-sodium'] },
  { id: 'soy-sauce', name: 'Golden Dragon Soy Sauce', price: 3.29, unit: '15 fl oz bottle', dept: 'Pantry & Canned', nutrition: { sugar: 0, protein: 1, sodium: 920 }, tags: ['featured'] },
  { id: 'soy-sauce-rs', name: 'Golden Dragon Reduced-Sodium Soy Sauce', price: 3.49, unit: '15 fl oz bottle', dept: 'Pantry & Canned', nutrition: { sugar: 0, protein: 1, sodium: 550 }, tags: ['healthier', 'less-sodium'] },
  { id: 'white-rice', name: 'Golden Harvest Long-Grain White Rice', price: 1.79, unit: '1 lb bag', dept: 'Pantry & Canned', nutrition: { sugar: 0, protein: 3, sodium: 0 }, tags: ['featured'], stockNote: 'Many in stock' },
  { id: 'quinoa', name: 'Andes Gold Tri-Color Quinoa', price: 3.99, unit: '1 lb bag', dept: 'Pantry & Canned', nutrition: { sugar: 1, protein: 8, sodium: 5 }, tags: ['healthier', 'more-protein'] },
  { id: 'black-beans', name: 'Rio Verde Black Beans', price: 1.19, unit: '15.5 oz can', dept: 'Pantry & Canned', nutrition: { sugar: 0, protein: 7, sodium: 130 }, tags: ['more-protein'] },
  { id: 'olive-oil', name: 'Aegean Grove Extra-Virgin Olive Oil', price: 8.99, unit: '16.9 fl oz bottle', dept: 'Pantry & Canned', nutrition: { sugar: 0, protein: 0, sodium: 0 }, tags: [] },
  { id: 'white-bread', name: 'Hearthloaf White Sandwich Bread', price: 2.99, unit: '20 oz loaf', dept: 'Pantry & Canned', nutrition: { sugar: 2, protein: 3, sodium: 135 }, tags: [], stockNote: 'Many in stock', buyItAgain: true },
  { id: 'wheat-bread', name: 'Hearthloaf 100% Whole-Wheat Bread', price: 3.29, unit: '20 oz loaf', dept: 'Pantry & Canned', nutrition: { sugar: 3, protein: 4, sodium: 130 }, tags: ['healthier'] },

  // ── Produce & Fresh ───────────────────────────────────────────────────
  { id: 'bananas', name: 'Bananas', price: 1.49, unit: '1 bunch (5–7 ct)', dept: 'Produce & Fresh', nutrition: { sugar: 14, protein: 1, sodium: 0 }, tags: ['featured', 'healthier'], stockNote: 'Many in stock', buyItAgain: true },
  { id: 'apples', name: 'Honeycrisp Apples', price: 5.99, unit: '3 lb bag', dept: 'Produce & Fresh', nutrition: { sugar: 19, protein: 0, sodium: 0 }, tags: ['featured', 'healthier'] },
  { id: 'spinach', name: 'Green Fields Baby Spinach', price: 3.49, unit: '5 oz clamshell', dept: 'Produce & Fresh', nutrition: { sugar: 0, protein: 1, sodium: 65 }, tags: ['healthier'] },
  { id: 'avocados', name: 'Hass Avocados', price: 2.99, unit: '2 ct', dept: 'Produce & Fresh', nutrition: { sugar: 0, protein: 1, sodium: 0 }, tags: ['healthier'] },
  { id: 'baby-carrots', name: 'Baby Carrots', price: 1.99, unit: '1 lb bag', dept: 'Produce & Fresh', nutrition: { sugar: 5, protein: 1, sodium: 65 }, tags: ['healthier'], stockNote: 'Many in stock' },
  { id: 'cherry-tomatoes', name: 'Cherry Tomatoes', price: 3.49, unit: '1 pint', dept: 'Produce & Fresh', nutrition: { sugar: 4, protein: 1, sodium: 5 }, tags: ['healthier'] },
  { id: 'chicken-breast', name: 'Fresh Boneless Skinless Chicken Breast', price: 5.99, unit: 'approx. 1 lb', dept: 'Produce & Fresh', nutrition: { sugar: 0, protein: 26, sodium: 75 }, tags: ['featured', 'more-protein'], stockNote: 'Many in stock' },
]

/** Order of the "Buy it again" row. */
export const BUY_IT_AGAIN: string[] = [
  'cola-12pk',
  'strawberry-yogurt-4pk',
  'bananas',
  'frosted-corn-flakes',
  'eggs',
  'chicken-soup',
  'white-bread',
  'penne',
]

// A pick exists only where the alternative is clearly better on at least one
// dimension, comes in a comparable package size, and any price gap is visible
// to the shopper. Reason copy leads with the concrete benefit, uses the real
// numbers above, and never moralizes.
export const RECS: Rec[] = [
  {
    forSku: 'frosted-corn-flakes',
    pick: 'oat-crunch-cereal',
    dimensions: ['Less sugar'],
    reason: 'Same crunch, 9g less sugar per bowl — and it’s 30¢ cheaper.',
  },
  {
    forSku: 'cola-12pk',
    pick: 'lime-sparkling-12pk',
    dimensions: ['Less sugar'],
    reason: 'All the fizz, none of the 39g of sugar per can — and it’s $2.50 less.',
  },
  {
    forSku: 'strawberry-yogurt-4pk',
    pick: 'greek-yogurt-4pk',
    dimensions: ['Less sugar', 'More protein'],
    reason: 'You get these most weeks — the Greek ones have 3× the protein and a third of the sugar.',
  },
  {
    forSku: 'granola-bars-choc',
    pick: 'nut-bars-dark-choc',
    dimensions: ['Less sugar'],
    reason: '7g less sugar per bar, and the dark chocolate keeps it feeling like a treat.',
  },
  {
    forSku: 'applesauce-sweetened',
    pick: 'applesauce-unsweetened',
    dimensions: ['Less sugar'],
    reason: 'Half the sugar per cup — 11g, down from 22 — just from skipping the added sweetener.',
  },
  {
    forSku: 'orange-soda-2l',
    pick: 'orange-sparkling-1l',
    dimensions: ['Less sugar'],
    reason: 'Keeps the orange and the bubbles, drops all 44g of sugar per glass.',
  },
  {
    forSku: 'penne',
    pick: 'chickpea-penne',
    dimensions: ['More protein'],
    reason: '13g of protein per serving instead of 6 — under sauce you honestly can’t tell.',
    contextVariants: [
      {
        ifInCart: 'marinara',
        reason: 'You’ve got marinara in here — chickpea penne underneath it adds 7g of protein, and nobody notices the difference.',
      },
      {
        ifInCart: 'marinara-nsa',
        reason: 'You’ve got marinara in here — chickpea penne underneath it adds 7g of protein, and nobody notices the difference.',
      },
    ],
  },
  {
    forSku: 'white-rice',
    pick: 'quinoa',
    dimensions: ['More protein'],
    reason: '8g of protein per cup to rice’s 3 — it runs pricier, but cooks in the same 15 minutes.',
  },
  {
    forSku: 'milk-2pct',
    pick: 'uf-milk',
    dimensions: ['More protein'],
    reason: 'Five more grams of protein in every glass — 13g, up from 8 — and it still drinks exactly like 2%.',
  },
  {
    forSku: 'sour-cream',
    pick: 'greek-yogurt-tub',
    dimensions: ['More protein'],
    reason: 'Swaps one-for-one in tacos and dips, with six times the protein of sour cream in every scoop.',
    contextVariants: [
      {
        ifInCart: 'tortilla-chips',
        reason: 'Next to those tortilla chips, plain Greek dips just as well — six times the protein in every scoop.',
      },
    ],
  },
  {
    forSku: 'chicken-soup',
    pick: 'chicken-soup-ls',
    dimensions: ['Less sodium'],
    reason: 'The same soup you’ve been getting, with about half the salt — 410mg a can instead of 890.',
  },
  {
    forSku: 'soy-sauce',
    pick: 'soy-sauce-rs',
    dimensions: ['Less sodium'],
    reason: '40% less sodium, same brew — you’d need the label to tell them apart.',
  },
  {
    forSku: 'salted-nuts',
    pick: 'unsalted-nuts',
    dimensions: ['Less sodium'],
    reason: 'Same nuts, same roast — just without the 170mg of sodium per handful.',
  },
  {
    forSku: 'marinara',
    pick: 'marinara-nsa',
    dimensions: ['Less sodium'],
    reason: 'Barely any salt — 40mg of sodium per serving next to the regular jar’s 480 — with the tomatoes and basil untouched.',
    contextVariants: [
      {
        ifInCart: 'penne',
        reason: 'Goes under the penne in your cart — same tomatoes and basil, 40mg of sodium instead of 480.',
      },
      {
        ifInCart: 'chickpea-penne',
        reason: 'Goes under the penne in your cart — same tomatoes and basil, 40mg of sodium instead of 480.',
      },
    ],
  },
]

export const SKU_BY_ID: Record<string, Sku> = Object.fromEntries(SKUS.map(s => [s.id, s]))
export const REC_BY_SKU: Record<string, Rec> = Object.fromEntries(RECS.map(r => [r.forSku, r]))

export const productImage = (id: string) => `${import.meta.env.BASE_URL}products/${id}.jpg`

export const formatPrice = (n: number) => `$${n.toFixed(2)}`
