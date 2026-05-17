"use client";
import React, { useEffect, useState, useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image';

interface ImageGalleryProps {
    images: string[]
}

export function ImageGallery({ images }: ImageGalleryProps) {
    console.log("Image : ", images);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

    const imageContainerRef = useRef<HTMLDivElement>(null)

    const ZOOM_LEVEL = 2.5
    const LENS_SIZE = 150
    const LENS_RADIUS = LENS_SIZE / 2

    useEffect(() => {
        const updateSize = () => {
            if (imageContainerRef.current) {
                const { width, height } =
                    imageContainerRef.current.getBoundingClientRect()
                setContainerSize({ width, height })
            }
        }
        updateSize();
        window.addEventListener('resize', updateSize)
        return () => window.removeEventListener('resize', updateSize)
    }, [])

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!imageContainerRef.current) return
        const { left, top } = imageContainerRef.current.getBoundingClientRect()
        const x = e.clientX - left
        const y = e.clientY - top
        setMousePos({ x, y })
    }

    return (
        <div className="flex justify-center w-full">

            {/* Wrapper */}
            <div className="relative w-full max-w-[400px]">

                {/* LEFT BUTTON */}
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        prevSlide()
                    }}
                    className="absolute -left-8 md:-left-12 top-1/2 -translate-y-1/2 z-20 px-1.5 md:px-0"
                >
                    <ChevronLeftIcon className="w-8 h-8 md:w-10 md:h-10 text-gray-800 cursor-pointer" />
                </button>

                {/* RIGHT BUTTON */}
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        nextSlide()
                    }}
                    className="absolute -right-8 md:-right-12 top-1/2 -translate-y-1/2 z-20 px-1.5 md:px-0"
                >
                    <ChevronRightIcon className="w-8 h-8 md:w-10 md:h-10 text-gray-800 cursor-pointer" />
                </button>

                {/* Image Container */}
                <div
                    ref={imageContainerRef}
                    className="relative w-full h-[420px] sm:h-[480px] md:h-[540px] bg-gray-50 overflow-hidden cursor-none group"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onMouseMove={handleMouseMove}
                >

                    <Image
                        fill
                        unoptimized
                        src={images[currentIndex]}
                        alt={`Product view ${currentIndex + 1}`}
                        className="object-cover object-center"
                    />

                    {/* Zoom Lens */}
                {isHovering && containerSize.width > 0 && (
                    <div
                        className="absolute pointer-events-none rounded-full border border-gray-200 shadow-xl bg-no-repeat z-10 hidden md:block"
                        style={{
                            width: `${LENS_SIZE}px`,
                            height: `${LENS_SIZE}px`,
                            left: `${mousePos.x - LENS_RADIUS}px`,
                            top: `${mousePos.y - LENS_RADIUS}px`,
                            backgroundImage: `url(${images[currentIndex]})`,
                            backgroundSize: `${containerSize.width * ZOOM_LEVEL}px ${containerSize.height * ZOOM_LEVEL}px`,
                            backgroundPosition: `${-(mousePos.x * ZOOM_LEVEL) + LENS_RADIUS}px ${-(mousePos.y * ZOOM_LEVEL) + LENS_RADIUS}px`,
                        }}
                    />
                )}


                    {/* Dots */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-start gap-2 px-2">
                        {images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setCurrentIndex(idx)
                                }}
                                className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-orange-500' : 'bg-gray-300'}`}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}