/* ProductDetails */
import React, { ReactNode, useState } from 'react'
import { PlusIcon, MinusIcon } from 'lucide-react'
interface AccordionSectionProps {
  title: string
  children: ReactNode
  defaultOpen?: boolean
}
export function AccordionSection({
  title,
  children,
  defaultOpen = false,
}: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
        aria-expanded={isOpen}
      >
        <span className="text-sm font-bold text-gray-900">{title}</span>
        {isOpen ? (
          <MinusIcon className="w-5 h-5 text-gray-500" />
        ) : (
          <PlusIcon className="w-5 h-5 text-gray-500" />
        )}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
      >
        <div className="text-sm text-gray-600">{children}</div>
      </div>
    </div>
  )
}