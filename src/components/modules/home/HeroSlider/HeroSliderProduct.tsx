'use client';
import React, { useEffect, useState } from 'react'
import { motion, type PanInfo } from 'framer-motion'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
type Product = {
  id: string
  alt: string
  image: string
}
const PRODUCTS: Product[] = [
  {
    id: 'p1',
    alt: 'Model in cream lace blouse',
    image:
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1100&q=85',
  },
  {
    id: 'p2',
    alt: 'Model in pointelle knit',
    image:
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1100&q=85',
  },
  {
    id: 'p3',
    alt: 'Model in pleated slip dress',
    image:
      'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1100&q=85',
  },
  {
    id: 'p4',
    alt: 'Model in silk set',
    image:
      'https://images.unsplash.com/photo-1496217590455-aa63a8350eea?auto=format&fit=crop&w=1100&q=85',
  },
  {
    id: 'p5',
    alt: 'Model in tailored coat',
    image:
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=85',
  },
  {
    id: 'p6',
    alt: 'Model in cotton poplin',
    image:
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1100&q=85',
  },
  {
    id: 'p7',
    alt: 'Model in cashmere cardigan',
    image:
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1100&q=85',
  },
]
type SlotConfig = {
  x: number
  y: number
  opacity: number
  zIndex: number
  width: number
  height: number
}
// Heights step down from center; all vertically centered (y = 0)
// to match the reference alignment exactly.
const getSlotDesktop = (offset: number): SlotConfig => {
  switch (offset) {
    case 0:
      return {
        x: 0,
        y: 0,
        opacity: 1,
        zIndex: 30,
        width: 380,
        height: 520,
      }
    case -1:
      return {
        x: -360,
        y: 0,
        opacity: 1,
        zIndex: 20,
        width: 280,
        height: 400,
      }
    case 1:
      return {
        x: 360,
        y: 0,
        opacity: 1,
        zIndex: 20,
        width: 280,
        height: 400,
      }
    case -2:
      return {
        x: -640,
        y: 0,
        opacity: 1,
        zIndex: 10,
        width: 200,
        height: 290,
      }
    case 2:
      return {
        x: 640,
        y: 0,
        opacity: 1,
        zIndex: 10,
        width: 200,
        height: 290,
      }
    default:
      return {
        x: offset > 0 ? 920 : -920,
        y: 0,
        opacity: 0,
        zIndex: 0,
        width: 200,
        height: 280,
      }
  }
}
const getSlotMobile = (offset: number): SlotConfig => {
  switch (offset) {
    case 0:
      return {
        x: 0,
        y: 0,
        opacity: 1,
        zIndex: 30,
        width: 200,
        height: 280,
      }
    case -1:
      return {
        x: -160,
        y: 0,
        opacity: 1,
        zIndex: 20,
        width: 130,
        height: 190,
      }
    case 1:
      return {
        x: 160,
        y: 0,
        opacity: 1,
        zIndex: 20,
        width: 130,
        height: 190,
      }
    case -2:
      return {
        x: -270,
        y: 0,
        opacity: 0.95,
        zIndex: 10,
        width: 95,
        height: 140,
      }
    case 2:
      return {
        x: 270,
        y: 0,
        opacity: 0.95,
        zIndex: 10,
        width: 95,
        height: 140,
      }
    default:
      return {
        x: offset > 0 ? 500 : -500,
        y: 0,
        opacity: 0,
        zIndex: 0,
        width: 100,
        height: 140,
      }
  }
}
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 1024px)').matches
      : true,
  )
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return isDesktop
}
 const HeroSliderProduct = ()=> {
  const [active, setActive] = useState(2)
  const total = PRODUCTS.length
  const isDesktop = useIsDesktop()
  const getSlot = isDesktop ? getSlotDesktop : getSlotMobile
  const next = () => setActive((i) => (i + 1) % total)
  const prev = () => setActive((i) => (i - 1 + total) % total)
  const offsetOf = (idx: number) => {
    let d = idx - active
    if (d > total / 2) d -= total
    if (d < -total / 2) d += total
    return d
  }
  // Swipe handler on the stage
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 60
    if (info.offset.x < -threshold || info.velocity.x < -400) next()
    else if (info.offset.x > threshold || info.velocity.x > 400) prev()
  }
  return (
    <section className="w-full min-h-screen flex flex-col items-center bg-cream-100 px-4 pt-16 md:pt-24 pb-20 overflow-hidden">
      {/* Heading */}
      <header className="text-center mb-14 md:mb-24">
        <h1 className="text-3xl md:text-5xl lg:text-6xl text-ink leading-[1.15] tracking-wider">
          EXPRESSIVE
          <br />
          <span className="font-light">TIMELESS</span> ELEGANT
        </h1>
      </header>

      {/* Slider stage — swipe enabled */}
      <motion.div
        className="relative w-full max-w-[1400px] h-[340px] md:h-[560px] flex items-center justify-center select-none touch-pan-y"
        role="region"
        aria-label="Featured products"
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        dragElastic={0.15}
        onDragEnd={handleDragEnd}
      >
        {PRODUCTS.map((product, idx) => {
          const offset = offsetOf(idx)
          const visible = Math.abs(offset) <= 2
          const slot = getSlot(offset)
          const isActive = offset === 0
          return (
            <motion.div
              key={product.id}
              className={`absolute ${isActive ? '' : 'cursor-pointer'}`}
              style={{
                zIndex: slot.zIndex,
              }}
              initial={false}
              animate={{
                x: slot.x,
                y: slot.y,
                opacity: visible ? slot.opacity : 0,
                width: slot.width,
                height: slot.height,
                pointerEvents: visible ? 'auto' : 'none',
              }}
              transition={{
                type: 'spring',
                stiffness: 95,
                damping: 22,
                mass: 1,
                opacity: {
                  duration: 0.5,
                },
              }}
              onClick={() => {
                if (!isActive) setActive(idx)
              }}
              aria-hidden={!visible}
            >
              <div className="w-full h-full overflow-hidden bg-cream-200 shadow-[0_25px_70px_-25px_rgba(42,37,32,0.28)]">
                <img
                  src={product.image}
                  alt={product.alt}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Controls */}
      <div className="mt-12 md:mt-16 flex items-center gap-6">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous product"
          className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-ink/25 text-ink hover:bg-ink hover:text-cream-50 hover:border-ink transition-colors duration-300"
        >
          <ArrowLeftIcon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.25} />
        </button>

        <div className="font-serif text-lg text-ink tabular-nums tracking-widest min-w-[80px] text-center">
          <span className="text-ink">
            {String(active + 1).padStart(2, '0')}
          </span>
          <span className="text-ink/30 mx-2">/</span>
          <span className="text-ink/40">{String(total).padStart(2, '0')}</span>
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next product"
          className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center border border-ink/25 text-ink hover:bg-ink hover:text-cream-50 hover:border-ink transition-colors duration-300"
        >
          <ArrowRightIcon
            className="w-4 h-4 md:w-5 md:h-5"
            strokeWidth={1.25}
          />
        </button>
      </div>
    </section>
  )
}


export default HeroSliderProduct;