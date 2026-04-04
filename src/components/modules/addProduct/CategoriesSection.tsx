import React, { useState, useRef } from 'react'
import {
    X,
    Plus,
    Tag,
} from 'lucide-react'
import { motion } from 'framer-motion'

const CategoriesSection = () => {
    //============== Categories ===============//
    const [categories, setCategories] = useState<string[]>([]);
    const [newCategory, setNewCategory] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    //=============== Subcategories ============// 
    const [subcategories, setSubcategories] = useState<string[]>([]);
    const [newSubcategory, setNewSubcategory] = useState('');
    const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
        [])
    const addCategory = () => {
        if (newCategory.trim() && !categories.includes(newCategory.trim())) {
            setCategories([...categories, newCategory.trim()])
            setNewCategory('')
        }
    }
    const addSubcategory = () => {
        if (
            newSubcategory.trim() &&
            !subcategories.includes(newSubcategory.trim())
        ) {
            setSubcategories([...subcategories, newSubcategory.trim()])
            setNewSubcategory('')
        }
    }
    const toggleCategory = (cat: string) => {
        setSelectedCategories((prev) =>
            prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
        )
    }
    const toggleSubcategory = (sub: string) => {
        setSelectedSubcategories((prev) =>
            prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub],
        )
    }
    const removeCategory = (cat: string) => {
        setCategories(categories.filter((c) => c !== cat))
        setSelectedCategories(selectedCategories.filter((c) => c !== cat))
    }
    const removeSubcategory = (sub: string) => {
        setSubcategories(subcategories.filter((s) => s !== sub))
        setSelectedSubcategories(selectedSubcategories.filter((s) => s !== sub))
    }
    return (
        <div>
            {/* Categories */}
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
                    delay: 0.25,
                }}
                className="bg-white rounded-xl border border-slate-200 p-5 mb-8"
            >
                <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#FF5000]" /> Categories
                </h3>
                <div className="flex gap-2 mb-3">
                    <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === 'Enter' && (e.preventDefault(), addCategory())
                        }
                        placeholder="New category..."
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5000]/30 focus:border-[#FF5000]"
                    />
                    <button
                        onClick={addCategory}
                        className="px-3 py-2 bg-[#FF5000] text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {categories.map((cat) => (
                        <div
                            key={cat}
                            className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(cat)}
                                onChange={() => toggleCategory(cat)}
                                className="w-4 h-4 rounded border-slate-300 accent-[#FF5000] cursor-pointer"
                            />
                            <span
                                className={`text-sm font-medium flex-1 cursor-pointer'}`}
                                onClick={() => toggleCategory(cat)}
                            >
                                {cat}
                            </span>
                            <button
                                onClick={() => removeCategory(cat)}
                                className="p-1 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Sub Categories */}
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
                    delay: 0.3,
                }}
                className="bg-white rounded-xl border border-slate-200 p-5"
            >
                <h3 className="text-sm font-bold text-slate-900 mb-3">
                    Sub Categories
                </h3>
                <div className="flex gap-2 mb-3">
                    <input
                        type="text"
                        value={newSubcategory}
                        onChange={(e) => setNewSubcategory(e.target.value)}
                        onKeyDown={(e) =>
                            e.key === 'Enter' && (e.preventDefault(), addSubcategory())
                        }
                        placeholder="New subcategory..."
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5000]/30 focus:border-[#FF5000]"
                    />
                    <button
                        onClick={addSubcategory}
                        className="px-3 py-2 bg-[#FF5000] text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto">
                    {subcategories.map((sub) => (
                        <div
                            key={sub}
                            className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                            <input
                                type="checkbox"
                                checked={selectedSubcategories.includes(sub)}
                                onChange={() => toggleSubcategory(sub)}
                                className="w-4 h-4 rounded border-slate-300 accent-[#FF5000] cursor-pointer"
                            />
                            <span
                                className={`text-sm font-medium flex-1 cursor-pointer}`}
                                onClick={() => toggleSubcategory(sub)}
                            >
                                {sub}
                            </span>
                            <button
                                onClick={() => removeSubcategory(sub)}
                                className="p-1 text-slate-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

export default CategoriesSection;