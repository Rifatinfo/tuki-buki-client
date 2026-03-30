"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
const categories = [
  {
    id: "women",
    title: "WOMEN",
    image:
      "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772964151/Bangladesh_s-homegrown-brands-shape-the-fast-fashion-scene-_hxtbtk.jpg",
    link: "/women",
  },
  {
    id: "kids",
    title: "KIDS",
    image:
      "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772964151/Res-KIDS-Dept-EID1-09-02-2026-SM_duu4ig.webp",
    link: "/kids",
  },
  {
    id: "jewelry",
    title: "JEWELRY",
    image: "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772964151/images_1_srifgv.jpg",
    link: "/jewelry",
  },
  {
    id: "home-decor",
    title: "HOME DECOR",
    image: "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772964151/R-aarong-home-decor-dept-thumb-24-07-2025_pn8nsh.webp",
    link: "/home-decor",
  },
  {
    id: "wedding",
    title: "WEDDING",
    image: "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1760315026/file-1760315023725-863617137.jpg",
    link: "/wedding",
  },
  {
    id: "beauty",
    title: "BEAUTY",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348",
    link: "/beauty",
  },
  {
    id: "women-clothing",
    title: "WOMEN CLOTHING",
    image: "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1761207315/bveb1khyj9-1761207315094-05-png.png.png",
    link: "/women-clothing",
  },
  {
    id: "women-bags",
    title: "WOMEN BAGS",
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e",
    link: "/women-bags",
  },
];
export function CategorySection() {
  return (
    <section>
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {categories.map((category, index) => (
            <Link key={category.id} href={category.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group relative h-[180px] sm:h-[220px] md:h-[300px] lg:h-[380px] xl:h-[420px] overflow-hidden cursor-pointer funnel-display"
              >
                <Image
                  fill
                  src={category.image}
                  alt={category.title}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent w-full p-3 sm:p-4 md:p-6">
                  <div className="flex items-end justify-between text-white">
                    {/* title */}
                    <h3 className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-bold tracking-wide uppercase">
                      {category.title}
                    </h3>

                    {/* arrow button */}
                    <div className="bg-[#E8731A] p-1.5 sm:p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
