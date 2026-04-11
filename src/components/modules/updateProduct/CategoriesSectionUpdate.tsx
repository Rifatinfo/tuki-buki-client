"use client";

import { useEffect, useState } from "react";
import { Tag } from "lucide-react";
import { serverFetch } from "@/lib/server-fetch";
import ListSkeleton from "@/components/shared/skeleton/ListSkeleton";

type Category = { id: string; name: string };
type SubCategory = { id: string; name: string };

type Props = {
  selectedCategoryIds: string[];
  onCategoryChange: (ids: string[]) => void;

  selectedSubCategoryIds: string[];
  onSubCategoryChange: (ids: string[]) => void;

  onPayloadChange: (payload: {
    categories: { categoryId: string; name: string }[];
    subCategories: { subCategoryId: string; name: string }[];
  }) => void;
};

const CategoriesSectionUpdate = ({
  selectedCategoryIds,
  onCategoryChange,
  selectedSubCategoryIds,
  onSubCategoryChange,
  onPayloadChange,
}: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const cRes = await serverFetch.get("/api/v1/product/category");
      const sRes = await serverFetch.get("/api/v1/product/sub-category");

      const cJson = await cRes.json();
      const sJson = await sRes.json();

      setCategories(cJson.data || []);
      setSubCategories(sJson.data || []);
      setLoading(false);
    };

    load();
  }, []);

  useEffect(() => {
    onPayloadChange({
      categories: selectedCategoryIds.map((id) => ({
        categoryId: id,
        name: categories.find((c) => c.id === id)?.name || "",
      })),
      subCategories: selectedSubCategoryIds.map((id) => ({
        subCategoryId: id,
        name: subCategories.find((s) => s.id === id)?.name || "",
      })),
    });
  }, [selectedCategoryIds, selectedSubCategoryIds, categories, subCategories]);

  return (
    <div className="bg-white p-4 border rounded-xl space-y-4">

      <div className="font-bold flex items-center gap-2">
        <Tag className="w-4 h-4" />
        Categories
      </div>

      {loading ? (
        <ListSkeleton count={5} />
      ) : (
        categories.map((c) => (
          <label key={c.id} className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={selectedCategoryIds.includes(c.id)}
              onChange={() =>
                onCategoryChange(
                  selectedCategoryIds.includes(c.id)
                    ? selectedCategoryIds.filter((i) => i !== c.id)
                    : [...selectedCategoryIds, c.id]
                )
              }
            />
            {c.name}
          </label>
        ))
      )}

      <div className="font-bold mt-4">Sub Categories</div>

      {loading ? (
        <ListSkeleton count={5} />
      ) : (
        subCategories.map((s) => (
          <label key={s.id} className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={selectedSubCategoryIds.includes(s.id)}
              onChange={() =>
                onSubCategoryChange(
                  selectedSubCategoryIds.includes(s.id)
                    ? selectedSubCategoryIds.filter((i) => i !== s.id)
                    : [...selectedSubCategoryIds, s.id]
                )
              }
            />
            {s.name}
          </label>
        ))
      )}
    </div>
  );
};

export default CategoriesSectionUpdate;