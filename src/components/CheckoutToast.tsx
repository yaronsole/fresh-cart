import { useStore } from '../store/useStore'

export default function CheckoutToast() {
  const show = useStore(s => s.checkoutToast)
  if (!show) return null

  return (
    <div className="toast-in fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-kale px-5 py-3 text-sm font-medium text-white shadow-lg">
      This is where the demo ends — thanks for shopping.
    </div>
  )
}
