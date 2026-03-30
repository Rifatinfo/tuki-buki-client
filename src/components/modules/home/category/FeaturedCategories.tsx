"use client";
import { motion, Variants } from 'framer-motion'

interface CategoryCard {
  image: string
  heading: string
  subtext: string
  buttonText: string
}

const categories: CategoryCard[] = [
  {
    image:
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=900&q=80&auto=format&fit=crop',
    heading: 'Delicate shine',
    subtext: 'Explore jewellery',
    buttonText: 'SHOP NOW',
  },
  {
    image:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=80&auto=format&fit=crop',
    heading: 'Festive companion',
    subtext: 'Explore accessories',
    buttonText: 'SHOP NOW',
  },
]

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.25,
      ease: [0.25, 0.46, 0.45, 0.94], // correct easing format
    },
  }),
}

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: "easeOut" as const, // fix
    },
  }),
}

export function FeaturedCategories() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        {categories.map((category, index) => (
          <motion.div
            key={category.heading}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative group overflow-hidden cursor-pointer"
          >
            <div className="relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden">
              <img
                src={category.image}
                alt={category.heading}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10">
              <motion.h2
                custom={0.3 + index * 0.25}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-5xl text-white  font-serif leading-tight mb-1"
              >
                {category.heading}
              </motion.h2>

              <motion.p
                custom={0.5 + index * 0.25}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-sm md:text-base text-white/80 tracking-wide mb-4"
              >
                {category.subtext}
              </motion.p>

              <motion.div
                custom={0.7 + index * 0.25}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <button className="px-6 py-2.5 bg-black text-white text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-300">
                  {category.buttonText}
                </button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}