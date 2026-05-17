import React from 'react'
import { CheckCircleIcon, ArrowRightIcon } from 'lucide-react'
interface SuccessPageProps {
  onContinueShopping: () => void
}
const SuccessPage = ({ onContinueShopping }: SuccessPageProps) => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircleIcon className="w-10 h-10 text-green-500" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been received and is being
          processed. We will contact you shortly to confirm the delivery.
        </p>

        <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-gray-900 mb-2">What's next?</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
              You will receive a confirmation call within 24 hours.
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 flex-shrink-0" />
              Your items will be dispatched according to your selected delivery
              method.
            </li>
          </ul>
        </div>

        <button
          onClick={onContinueShopping}
          className="w-full bg-gray-900 text-white py-4 px-6 rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
        >
          Continue Shopping
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default SuccessPage;