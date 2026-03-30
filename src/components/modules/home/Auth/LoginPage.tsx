'use client';
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
export interface LoginPageProps {
  onNavigate: (page: string) => void
}
const ShoppingIllustration = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5EC] via-[#FFECD2] to-[#FCE4C8]" />

      {/* Decorative circles */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-16 right-16 w-48 h-48 rounded-full bg-[#E8731A]/20"
      />
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        className="absolute bottom-24 left-12 w-64 h-64 rounded-full bg-[#E8731A]/10"
      />

      <div className="relative z-10 flex flex-col items-center px-8">
        {/* Main SVG Illustration */}
        <svg
          viewBox="0 0 400 400"
          className="w-72 h-72 lg:w-80 lg:h-80"
          fill="none"
        >
          {/* Shopping bag */}
          <motion.g
            initial={{
              y: 10,
              opacity: 0,
            }}
            animate={{
              y: [0, -8, 0],
              opacity: 1,
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.2,
            }}
          >
            <rect
              x="120"
              y="140"
              width="160"
              height="180"
              rx="8"
              fill="#E8731A"
            />
            <rect
              x="130"
              y="150"
              width="140"
              height="160"
              rx="4"
              fill="#F5923A"
            />
            <path
              d="M170 140 V110 Q170 80 200 80 Q230 80 230 110 V140"
              stroke="#C45A10"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />
            {/* Bag pattern */}
            <circle cx="200" cy="210" r="25" fill="#E8731A" opacity="0.3" />
            <path
              d="M188 210 L197 219 L215 201"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.g>

          {/* Floating heart */}
          <motion.g
            animate={{
              y: [-5, -20, -5],
              x: [0, 5, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          >
            <path
              d="M310 120 C310 105 295 95 285 105 C275 95 260 105 260 120 C260 140 285 155 285 155 C285 155 310 140 310 120Z"
              fill="#E8731A"
              opacity="0.7"
            />
          </motion.g>

          {/* Floating star */}
          <motion.g
            animate={{
              y: [0, -12, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          >
            <path
              d="M100 180 L106 196 L123 196 L110 206 L115 223 L100 213 L85 223 L90 206 L77 196 L94 196Z"
              fill="#F5923A"
              opacity="0.6"
            />
          </motion.g>

          {/* Small floating dots */}
          <motion.circle
            cx="320"
            cy="250"
            r="6"
            fill="#E8731A"
            opacity="0.4"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.8,
            }}
          />
          <motion.circle
            cx="85"
            cy="280"
            r="4"
            fill="#F5923A"
            opacity="0.5"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
          />
          <motion.circle
            cx="340"
            cy="180"
            r="5"
            fill="#C45A10"
            opacity="0.3"
            animate={{
              y: [0, -8, 0],
              x: [0, 5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />

          {/* Gift tag */}
          <motion.g
            animate={{
              rotate: [-5, 5, -5],
              y: [0, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
          >
            <rect
              x="60"
              y="120"
              width="40"
              height="50"
              rx="4"
              fill="#FCD9B8"
              stroke="#E8731A"
              strokeWidth="2"
            />
            <circle
              cx="80"
              cy="120"
              r="6"
              fill="none"
              stroke="#E8731A"
              strokeWidth="2"
            />
            <line
              x1="80"
              y1="130"
              x2="80"
              y2="155"
              stroke="#E8731A"
              strokeWidth="1.5"
              opacity="0.5"
            />
          </motion.g>

          {/* Sparkles */}
          <motion.g
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0,
            }}
          >
            <line
              x1="330"
              y1="100"
              x2="330"
              y2="115"
              stroke="#E8731A"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="322"
              y1="107"
              x2="338"
              y2="107"
              stroke="#E8731A"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.g>
          <motion.g
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.2,
            }}
          >
            <line
              x1="70"
              y1="240"
              x2="70"
              y2="252"
              stroke="#F5923A"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="64"
              y1="246"
              x2="76"
              y2="246"
              stroke="#F5923A"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.g>
        </svg>

        {/* Text below illustration */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            delay: 0.4,
          }}
          className="text-center mt-6"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Welcome to Tuki  Buki
          </h2>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            Discover authentic Bangladeshi fashion, crafts & lifestyle — all in
            one place.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default ShoppingIllustration;