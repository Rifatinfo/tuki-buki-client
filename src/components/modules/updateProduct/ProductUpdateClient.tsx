
"use client";

import { serverFetch } from "@/lib/server-fetch";
import { Toast } from "@/components/shared/Toast/Toast";
import CategoriesSection from "@/components/modules/addProduct/CategoriesSection";
import ImageUploadSection from "@/components/modules/addProduct/ImageUploadSection";
import { TagsSection } from "@/components/modules/addProduct/TagsSection";
import {
    AdditionalInfoSection,
    InfoItem,
} from "@/components/modules/addProduct/AdditionalInfoSection";
import {
    Variant,
    VariantsSection,
} from "@/components/modules/addProduct/VariantsSection";
import {
    BasicDetailsCard,
    StockStatus,
} from "@/components/modules/addProduct/BasicDetailsCard";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/shared/Spinner";
import { ArrowLeft, Eye, Save } from "lucide-react";
import { useEffect, useState } from "react";


/* ================= TYPES ================= */
type CategoryPayload = {
    categories: { categoryId: string }[];
    subCategories: { subCategoryId: string }[];
};

const ProductUpdateClient = ({ product, slug }: any) => {
    const [isSaving, setIsSaving] = useState(false);

    /* ================= BASIC DETAILS ================= */
    const [basicDetails, setBasicDetails] = useState({
        name: "",
        regularPrice: "",
        salePrice: "",
        shortDescription: "",
        fullDescription: "",
        sku: "",
        stockQuantity: 0,
        stockStatus: StockStatus.IN_STOCK,
    });

    /* ================= PRODUCT PARTS ================= */
    const [variants, setVariants] = useState<Variant[]>([]);
    const [additionalInfo, setAdditionalInfo] = useState<InfoItem[]>([]);
    const [tags, setTags] = useState<string[]>([]);

    /* ================= IMAGES ================= */
    const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
    const [sizeGuideImage, setSizeGuideImage] = useState<File | null>(null);
    const [galleryImages, setGalleryImages] = useState<File[]>([]);

    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [sizeGuidePreview, setSizeGuidePreview] = useState<string | null>(null);
    const [galleryPreview, setGalleryPreview] = useState<string[]>([]);

    /* ================= CATEGORY STATE (FIXED) ================= */

    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
    const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState<string[]>([]);
    const [categoryPayload, setCategoryPayload] = useState<any>({
        categories: [],
        subCategories: []
    });
    console.log("selectedCategoryIds", selectedCategoryIds);
    console.log("selectedSubCategoryIds", selectedSubCategoryIds);
    console.log("categoryPayload", categoryPayload);
    /* ================= HYDRATE PRODUCT ================= */
    useEffect(() => {
        if (!product) return;

        setBasicDetails({
            name: product.name ?? "",
            regularPrice: product.regularPrice ?? "",
            salePrice: product.salePrice ?? "",
            shortDescription: product.shortDescription ?? "",
            fullDescription: product.fullDescription ?? "",
            sku: product.sku ?? "",
            stockQuantity: product.stockQuantity ?? 0,
            stockStatus: product.stockStatus ?? StockStatus.IN_STOCK,
        });

        setVariants(product.variants || []);
        setAdditionalInfo(product.additionalInformation || []);
        setTags(product.tags || []);

        setCategoryPayload({
            categories:
                product.categories?.map((c: any) => ({
                    categoryId: c.id,
                })) || [],
            subCategories:
                product.subCategories?.map((s: any) => ({
                    subCategoryId: s.id,
                })) || [],
        });

        setThumbnailPreview(product.thumbnailImage || null);
        setSizeGuidePreview(product.sizeGuideImage || null);
        setGalleryPreview(product.images?.map((img: any) => img.url) || []);
    }, [product]);

    /* ================= UPDATE ================= */
    const handleUpdate = async () => {
        setIsSaving(true);

        try {
            const payload = {
                name: basicDetails.name,
                sku: basicDetails.sku,
                regularPrice: Number(basicDetails.regularPrice),
                salePrice: Number(basicDetails.salePrice),
                stockQuantity: basicDetails.stockQuantity,
                stockStatus: basicDetails.stockStatus,
                shortDescription: basicDetails.shortDescription,
                fullDescription: basicDetails.fullDescription,

                categories: categoryPayload.categories.map((c: any) => c.categoryId),
                subCategories: categoryPayload.subCategories.map((s: any) => s.subCategoryId),

                tags,

                variants: variants.map((v) => ({
                    color: v.color,
                    size: v.size,
                    quantity: Number(v.quantity),
                })),

                additionalInformation: additionalInfo,
            };

            const formData = new FormData();
            formData.append("data", JSON.stringify(payload));

            if (thumbnailImage) formData.append("thumbnailImage", thumbnailImage);
            if (sizeGuideImage) formData.append("sizeGuidImage", sizeGuideImage);

            galleryImages.forEach((img) => formData.append("file", img));

            const res = await serverFetch.patch(`/api/v1/product/${slug}`, {
                credentials: "include",
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data?.message || "Update failed");

            Toast.fire({
                icon: "success",
                title: "Product updated successfully!",
            });
        } catch (err) {
            console.error(err);
            Toast.fire({
                icon: "error",
                title: "Failed to update product.",
            });
        } finally {
            setIsSaving(false);
        }
    };

    /* ================= UI ================= */
    return (
        <div className="min-h-screen bg-slate-50/50 pb-20">
            {/* HEADER */}
            <header className="sticky top-0 z-30 bg-white border-b px-4 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl font-bold">Update Product</h1>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline">
                        <Eye className="h-4 w-4" /> Preview
                    </Button>

                    <Button onClick={handleUpdate}>
                        {isSaving && <Spinner />}
                        <Save className="h-4 w-4 ml-2" /> Update
                    </Button>
                </div>
            </header>

            {/* MAIN */}
            <main className="max-w-[1600px] mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-9 space-y-8">
                        <BasicDetailsCard
                            data={basicDetails}
                            onChange={(f, v) =>
                                setBasicDetails((prev) => ({ ...prev, [f]: v }))
                            }
                        />

                        <VariantsSection variants={variants} onChange={setVariants} />

                        <AdditionalInfoSection
                            items={additionalInfo}
                            onChange={setAdditionalInfo}
                        />

                        <TagsSection tags={tags} onChange={setTags} />
                    </div>

                    <div className="lg:col-span-3 space-y-8">
                        
                        <ImageUploadSection
                            thumbnailImage={thumbnailImage} setThumbnailImage={setThumbnailImage}
                            sizeGuideImage={sizeGuideImage} setSizeGuideImage={setSizeGuideImage}
                            galleryImages={galleryImages} setGalleryImages={setGalleryImages}
                        />
                        <CategoriesSection onChange={setCategoryPayload} />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProductUpdateClient;