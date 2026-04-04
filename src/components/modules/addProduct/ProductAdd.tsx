/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { ArrowLeft, Save, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BasicDetailsCard, StockStatus } from "./BasicDetailsCard"
import { Variant, VariantsSection } from "./VariantsSection"
import { AdditionalInfoSection, InfoItem } from "./AdditionalInfoSection"
import { TagsSection } from "./TagsSection"

import { Toast } from "@/components/shared/Toast/Toast"
import { serverFetch } from "@/lib/server-fetch"
import ImageUploadSection from "./ImageUploadSection"
import CategoriesSection from "./CategoriesSection"

export default function ProductAddPage() {
  const [basicDetails, setBasicDetails] = useState({
    name: "",
    regularPrice: "",
    salePrice: "",
    shortDescription: "",
    fullDescription: "",
    sku: "",
    stockQuantity: 0,
    stockStatus: StockStatus.IN_STOCK
  })

  const [variants, setVariants] = useState<Variant[]>([])
  const [additionalInfo, setAdditionalInfo] = useState<InfoItem[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [images, setImages] = useState<any[]>([])
  const [isSaving, setIsSaving] = useState(false)

  const [categoryPayload, setCategoryPayload] = useState<{
    categories: { categoryId: string; name: string }[]
    subCategories: { subCategoryId: string; name: string }[]
  }>({
    categories: [],
    subCategories: [],
  });
  const validateForm = () => {
    if (!basicDetails.name) {
      Toast.fire({ icon: "warning", title: "Product Name is required!" });
      return false;
    }
    if (!basicDetails.regularPrice) {
      Toast.fire({ icon: "warning", title: "Regular Price is required!" });
      return false;
    }
    if (!basicDetails.sku) {
      Toast.fire({ icon: "warning", title: "SKU is required!" });
      return false;
    }
    // Optional: Stock quantity >= 0
    if (basicDetails.stockQuantity < 0) {
      Toast.fire({ icon: "warning", title: "Stock Quantity cannot be negative!" });
      return false;
    }
    // Optional: Short description
    if (!basicDetails.shortDescription) {
      Toast.fire({ icon: "warning", title: "Short Description is required!" });
      return false;
    }
    return true; 
  }

  const resetForm = () => {
    setBasicDetails({
      name: "",
      regularPrice: "",
      salePrice: "",
      shortDescription: "",
      fullDescription: "",
      sku: "",
      stockQuantity: 0,
      stockStatus: StockStatus.IN_STOCK
    })
    setVariants([])
    setAdditionalInfo([])
    setTags([])
    setImages([])
    setCategoryPayload({
      categories: [],
      subCategories: [],
    })
  }

  const handleSave = async () => {
    if (!validateForm()) return; 

    setIsSaving(true);
    try {
  // Prepare payload
  const payload = {
    name: basicDetails.name,
    sku: basicDetails.sku,
    regularPrice: Number(basicDetails.regularPrice),
    salePrice: Number(basicDetails.salePrice),
    stockQuantity: basicDetails.stockQuantity,
    stockStatus: basicDetails.stockStatus,
    shortDescription: basicDetails.shortDescription,
    fullDescription: basicDetails.fullDescription,

    categories: categoryPayload.categories.map(c => c.name),
    subCategories: categoryPayload.subCategories.map(s => s.name),

    tags,

    variants: variants.map(v => ({
      color: v.color,
      size: v.size,
      quantity: Number(v.quantity),
    })),

    additionalInformation: additionalInfo,
  };

  // Convert payload and files into FormData
  const formData = new FormData();
  formData.append("data", JSON.stringify(payload));

  images.forEach(img => {
    if (img.file) formData.append("file", img.file);
  });

  //  Use serverFetch.post instead of fetch
  const res = await serverFetch.post("/api/v1/product/create", {
    credentials: "include",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data?.message || "Create failed");

  // Success toast
  Toast.fire({
    icon: "success",
    title: "Product saved successfully!",
  });

  // Reset form
  resetForm();
} catch (error: any) {
  console.error(error);

  Toast.fire({
    icon: "error",
    title: error.message || "Failed to save product.",
  });
} finally {
  setIsSaving(false);
}
  }

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <header className="sticky top-0 z-30 bg-white border-b px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold">Add New Product</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Eye className="h-4 w-4" /> Preview
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4" /> Save
          </Button>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-9 space-y-8">
            <BasicDetailsCard
              data={basicDetails}
              onChange={(field, value) =>
                setBasicDetails(prev => ({ ...prev, [field]: value }))
              }
            />
            <VariantsSection variants={variants} onChange={setVariants} />
            <AdditionalInfoSection items={additionalInfo} onChange={setAdditionalInfo} />
            <TagsSection tags={tags} onChange={setTags} />
          </div>

          <div className="lg:col-span-3 space-y-8">
            <ImageUploadSection />
            <CategoriesSection />
          </div>
        </div>
      </main>
    </div>
  )
}