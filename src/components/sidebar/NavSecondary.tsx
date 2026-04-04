"use client";

export function NavSecondary({ items }: { items: any[] }) {
  return (
    <div className="px-4 py-4 border-t border-slate-100 space-y-1">
      {items.map((item) => (
        <button
          key={item.id}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-orange-50 hover:text-[#FF5000]"
        >
          <item.icon className="w-5 h-5 text-slate-400" />
          {item.label}
        </button>
      ))}
    </div>
  );
}