'use client';
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
export interface RegisterPageProps {
  onNavigate: (page: string) => void
}
const RegisterIllustration = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5EC] via-[#FFECD2] to-[#FCE4C8]" />

      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.12, 0.22, 0.12],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-16 w-52 h-52 rounded-full bg-[#E8731A]/15"
      />
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.08, 0.18, 0.08],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute bottom-16 right-20 w-40 h-40 rounded-full bg-[#F5923A]/15"
      />

      <div className="relative z-10 flex flex-col items-center px-8">
        <svg
          viewBox="0 0 400 400"
          className="w-72 h-72 lg:w-80 lg:h-80"
          fill="none"
        >
          {/* Person silhouette with fashion */}
          <motion.g
            initial={{
              y: 10,
              opacity: 0,
            }}
            animate={{
              y: [0, -6, 0],
              opacity: 1,
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* Dress form / mannequin */}
            <ellipse
              cx="200"
              cy="120"
              rx="30"
              ry="32"
              fill="#E8731A"
              opacity="0.8"
            />
            <path
              d="M170 150 Q170 180 155 240 L245 240 Q230 180 230 150 Z"
              fill="#F5923A"
            />
            <rect x="175" y="240" width="50" height="8" rx="4" fill="#C45A10" />
            <rect
              x="190"
              y="248"
              width="20"
              height="60"
              rx="2"
              fill="#D4670F"
            />
            <rect x="180" y="308" width="40" height="6" rx="3" fill="#C45A10" />
            {/* Necklace detail */}
            <path
              d="M180 148 Q200 165 220 148"
              stroke="#FCD9B8"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="200" cy="160" r="4" fill="#FCD9B8" />
          </motion.g>

          {/* Floating fabric swatch 1 */}
          <motion.g
            animate={{
              y: [-3, -18, -3],
              rotate: [-5, 8, -5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          >
            <rect
              x="290"
              y="130"
              width="50"
              height="60"
              rx="6"
              fill="#E8731A"
              opacity="0.25"
            />
            <rect
              x="295"
              y="135"
              width="40"
              height="50"
              rx="4"
              fill="#F5923A"
              opacity="0.4"
            />
            <line
              x1="300"
              y1="145"
              x2="330"
              y2="145"
              stroke="#E8731A"
              strokeWidth="1.5"
              opacity="0.5"
            />
            <line
              x1="300"
              y1="155"
              x2="325"
              y2="155"
              stroke="#E8731A"
              strokeWidth="1.5"
              opacity="0.3"
            />
          </motion.g>

          {/* Floating fabric swatch 2 */}
          <motion.g
            animate={{
              y: [0, -14, 0],
              rotate: [3, -6, 3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.5,
            }}
          >
            <rect
              x="60"
              y="160"
              width="45"
              height="55"
              rx="6"
              fill="#FCD9B8"
              opacity="0.6"
            />
            <rect x="65" y="165" width="35" height="45" rx="4" fill="#FFECD2" />
            <circle cx="82" cy="187" r="8" fill="#E8731A" opacity="0.2" />
          </motion.g>

          {/* Scissors */}
          <motion.g
            animate={{
              rotate: [-3, 3, -3],
              x: [0, 3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.8,
            }}
          >
            <ellipse
              cx="320"
              cy="260"
              rx="12"
              ry="8"
              fill="none"
              stroke="#C45A10"
              strokeWidth="2"
            />
            <ellipse
              cx="320"
              cy="280"
              rx="12"
              ry="8"
              fill="none"
              stroke="#C45A10"
              strokeWidth="2"
            />
            <line
              x1="308"
              y1="260"
              x2="290"
              y2="240"
              stroke="#C45A10"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="308"
              y1="280"
              x2="290"
              y2="240"
              stroke="#C45A10"
              strokeWidth="2"
              strokeLinecap="round"
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
            }}
          >
            <line
              x1="110"
              y1="110"
              x2="110"
              y2="122"
              stroke="#E8731A"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="104"
              y1="116"
              x2="116"
              y2="116"
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
              delay: 1,
            }}
          >
            <line
              x1="280"
              y1="90"
              x2="280"
              y2="100"
              stroke="#F5923A"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="275"
              y1="95"
              x2="285"
              y2="95"
              stroke="#F5923A"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </motion.g>

          {/* Floating dots */}
          <motion.circle
            cx="340"
            cy="320"
            r="5"
            fill="#E8731A"
            opacity="0.3"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
          <motion.circle
            cx="75"
            cy="300"
            r="4"
            fill="#F5923A"
            opacity="0.4"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1.8,
            }}
          />
          <motion.circle
            cx="130"
            cy="340"
            r="6"
            fill="#C45A10"
            opacity="0.15"
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.3,
            }}
          />
        </svg>

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
            Join Our Community
          </h2>
          <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
            Create an account to unlock exclusive collections, rewards &
            personalized recommendations.
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default RegisterIllustration;
