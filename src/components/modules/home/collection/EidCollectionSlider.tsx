'use client';

import  { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
interface CollectionSlide {
  image: string
  subtitle: string
  buttonText: string
}
const collectionSlides: CollectionSlide[] = [
  {
    image:
      'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1920&q=80&auto=format&fit=crop',
    subtitle: 'Eid/26',
    buttonText: 'SHOP NOW',
  },
  {
    image:
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1920&q=80&auto=format&fit=crop',
    subtitle: 'Eid Collection',
    buttonText: 'SHOP NOW',
  },
  {
    image:
      'https://images.unsplash.com/photo-1596783074918-c84cb06531ca?w=1920&q=80&auto=format&fit=crop',
    subtitle: 'Festive Favourites',
    buttonText: 'SHOP NOW',
  },
  {
    image:
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1920&q=80&auto=format&fit=crop',
    subtitle: 'Latest Collection',
    buttonText: 'EXPLORE',
  },
]
export function EidCollectionSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState(0)
  const goToNext = useCallback(() => {
    setPrevIndex(currentIndex)
    setCurrentIndex((prev) => (prev + 1) % collectionSlides.length)
  }, [currentIndex])
  const goToPrev = useCallback(() => {
    setPrevIndex(currentIndex)
    setCurrentIndex(
      (prev) => (prev - 1 + collectionSlides.length) % collectionSlides.length,
    )
  }, [currentIndex])
  useEffect(() => {
    const timer = setInterval(goToNext, 5000)
    return () => clearInterval(timer)
  }, [goToNext])
  const currentSlide = collectionSlides[currentIndex]
  return (
    <section className="relative w-full aspect-[16/7] md:aspect-[16/6] overflow-hidden bg-neutral-900 h-[632px] md:h-full">
      {/* Previous slide underneath for seamless crossfade */}
      <div
        className="absolute inset-0 w-full  h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${collectionSlides[prevIndex].image})`,
        }}
      />

      {/* Current slide crossfades in */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentIndex}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 1,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="absolute inset-0 w-full h-full"
        >
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${currentSlide.image})`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent z-[1]" />

      {/* Center-bottom content */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent w-full inset-0 z-[2] flex flex-col items-center justify-end pb-10 md:pb-14 lg:pb-16 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="flex flex-col items-center text-center"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Subtitle */}
            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.6,
                delay: 0.4,
                ease: 'easeOut',
              }}
              className="text-3xl md:text-5xl lg:text-6xl text-white  tracking-[0.15em] mb-2 md:mb-4"
            >
              {currentSlide.subtitle}
            </motion.p>

            {/* Button */}
            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: 10,
              }}
              transition={{
                duration: 0.6,
                delay: 0.6,
                ease: 'easeOut',
              }}
            >
              <button className="px-8 md:px-10 py-2.5 md:py-3 bg-white text-gray-900 text-xs md:text-sm tracking-[0.2em] uppercase font-medium hover:bg-gray-900 hover:text-white transition-colors duration-300 cursor-pointer">
                {currentSlide.buttonText}
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left Arrow */}
      <button
        onClick={goToPrev}
        className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
        aria-label="Previous slide"
      >
        <ChevronLeftIcon className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={goToNext}
        className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-colors duration-200 cursor-pointer"
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1} />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-3 md:bottom-5 left-0 right-0 flex justify-center gap-2 z-10">
        {collectionSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setPrevIndex(currentIndex)
              setCurrentIndex(index)
            }}
            className="cursor-pointer"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={`block rounded-full transition-all duration-400 ${currentIndex === index ? 'w-6 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40'}`}
            />
          </button>
        ))}
      </div>
    </section>
  )
}
