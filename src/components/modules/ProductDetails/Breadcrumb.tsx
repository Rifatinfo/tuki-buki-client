'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="w-full">
      <div className="px-4 sm:px-6 lg:px-10">
        <nav
          className="
            flex flex-wrap items-center justify-end
            gap-y-1
            md:h-20 h-12
            font-light uppercase tracking-widest
            px-4
            text-[10px] sm:text-sm
          "
        >
          <Link href="/" className="hover:text-black transition">
            Home
          </Link>

          {segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/");
            const label = segment.replace(/-/g, " ");
            const isLast = index === segments.length - 1;

            return (
              <span key={href} className="flex items-center">
                <span className="mx-2 text-gray-400">|</span>

                {isLast ? (
                  <span className="text-black break-words">
                    {label}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className="hover:text-black transition break-words"
                  >
                    {label}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>


      </div>
    </div>
  );
};

export default Breadcrumb;