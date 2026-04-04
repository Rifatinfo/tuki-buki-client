'use client';
import React, { useState, useRef } from 'react'
import {
    ArrowLeft,
    Eye,
    Save,
    Upload,
    ImageIcon,
    X,
    Plus,
    Trash2,
    FolderOpen,
    Tag,
    Ruler,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const ImageUploadSection = () => {
    const [coverImage, setCoverImage] = useState<string | null>(null)
    const [galleryImages, setGalleryImages] = useState<string[]>([])
    const [sizeGuideImage, setSizeGuideImage] = useState<string | null>(null)

    // Image refs
    const coverInputRef = useRef<HTMLInputElement>(null)
    const galleryInputRef = useRef<HTMLInputElement>(null)
    const sizeGuideInputRef = useRef<HTMLInputElement>(null)

    const handleCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (ev) => {
                setCoverImage(ev.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }
    const handleGalleryImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files) {
            const remaining = 6 - galleryImages.length
            const toAdd = Array.from(files).slice(0, remaining)
            toAdd.forEach((file) => {
                const reader = new FileReader()
                reader.onload = (ev) => {
                    setGalleryImages((prev) => {
                        if (prev.length < 6) {
                            return [...prev, ev.target?.result as string]
                        }
                        return prev
                    })
                }
                reader.readAsDataURL(file)
            })
        }
        if (e.target) e.target.value = ''
    }
    const handleSizeGuideImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = (ev) => {
                setSizeGuideImage(ev.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }
    return (
        <div className='space-y-6'>
            {/* Cover Image */}
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.1,
                }}
                className="bg-white rounded-xl border border-slate-200 p-5 mb-10"
            >
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4 text-[#FF5000]" /> Cover Image
                </h3>
                <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImage}
                    className="hidden"
                />
                {coverImage ? (
                    <div className="relative group">
                        <img
                            src={coverImage}
                            alt="Cover"
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                            onClick={() => setCoverImage(null)}
                            className="absolute top-2 right-2 p-1 bg-white/90 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4 text-slate-600" />
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => coverInputRef.current?.click()}
                        className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-[#FF5000] hover:bg-orange-50/30 transition-all"
                    >
                        <Upload className="w-8 h-8 text-slate-300 mb-2" />
                        <span className="text-sm font-medium text-slate-500">
                            Click to upload
                        </span>
                        <span className="text-xs text-slate-400 mt-1">
                            SVG, PNG, JPG (max. 800×400px)
                        </span>
                    </div>
                )}
            </motion.div>

            {/* Gallery Images */}
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.15,
                }}
                className="bg-white rounded-xl border border-slate-200 p-5"
            >
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <FolderOpen className="w-4 h-4 text-[#FF5000]" /> Gallery Images
                    <span className="text-xs text-slate-400 font-normal ml-auto">
                        {galleryImages.length}/6
                    </span>
                </h3>
                <input
                    ref={galleryInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryImages}
                    className="hidden"
                />
                <div className="grid grid-cols-3 gap-2">
                    {galleryImages.map((img, i) => (
                        <div key={i} className="relative group aspect-square">
                            <img
                                src={img}
                                alt={`Gallery ${i}`}
                                className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                                onClick={() =>
                                    setGalleryImages(
                                        galleryImages.filter((_, idx) => idx !== i),
                                    )
                                }
                                className="absolute top-1 right-1 p-0.5 bg-white/90 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-3 h-3 text-slate-600" />
                            </button>
                        </div>
                    ))}
                    {galleryImages.length < 6 && (
                        <div
                            onClick={() => galleryInputRef.current?.click()}
                            className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-[#FF5000] hover:bg-orange-50/30 transition-all"
                        >
                            <Plus className="w-5 h-5 text-slate-300" />
                            <span className="text-[10px] text-slate-400 mt-1">Add</span>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Size Guide Image */}
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: 0.2,
                }}
                className="bg-white rounded-xl border border-slate-200 p-5"
            >
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-[#FF5000]" /> Size Guide Image
                </h3>
                <input
                    ref={sizeGuideInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleSizeGuideImage}
                    className="hidden"
                />
                {sizeGuideImage ? (
                    <div className="relative group">
                        <img
                            src={sizeGuideImage}
                            alt="Size Guide"
                            className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                            onClick={() => setSizeGuideImage(null)}
                            className="absolute top-2 right-2 p-1 bg-white/90 rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4 text-slate-600" />
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={() => sizeGuideInputRef.current?.click()}
                        className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-slate-200 rounded-lg cursor-pointer hover:border-[#FF5000] hover:bg-orange-50/30 transition-all"
                    >
                        <Upload className="w-6 h-6 text-slate-300 mb-1" />
                        <span className="text-xs text-slate-500">
                            Upload size chart
                        </span>
                    </div>
                )}
            </motion.div>
        </div>
    )
}

export default ImageUploadSection;