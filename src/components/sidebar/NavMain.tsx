"use client";

import Link from "next/link";   // ✅ ADD THIS
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function NavMain({ items }: { items: any[] }) {
  const pathname = usePathname();

  return (
    <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
      {items.map((item) => {
        const isActive = pathname === item.path;

        return (
          <Link   // CHANGE button → Link
            href={item.path || "#"}   // prevent undefined error
            key={item.id}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
              isActive
                ? "bg-[#FF5000] text-white shadow-md"
                : "text-slate-600 hover:bg-orange-50 hover:text-[#FF5000]"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}