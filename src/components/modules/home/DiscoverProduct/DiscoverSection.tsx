'use client';
import { motion } from "framer-motion";
import Image from "next/image";

interface DiscoverCard {
    title: string;
    image: string;
    price: string;
}

const cards: DiscoverCard[] = [
    {
        title: "Classic Denim Jacket",
        price: "3,200 TK",
        image:
            "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1773214329/women-2_vlvqwe.jpg",
    },
    {
        title: "Red Summer Dress",
        price: "2,750 TK",
        image:
            "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1773214328/kids_zrh0nj.jpg",
    },
    {
        title: "Leather Handbag",
        price: "4,100 TK",
        image:
            "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1773214328/kid2_z8ss8z.jpg",
    },
    {
        title: "Modern Sneakers",
        price: "3,600 TK",
        image:
            "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1773214328/women_qcejmn.jpg",
    },
];

const cardVariants = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.12,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
    }),
};

export function DiscoverSection() {
    return (
        <section className="w-full bg-white pt-4">
            <div className="grid grid-cols-1 md:grid-cols-4 ">
                {cards.map((card, index) => (
                    <motion.a
                        key={card.title}
                        href="#"
                        custom={index}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="relative group overflow-hidden cursor-pointer block"
                    >
                        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] overflow-hidden">

                            {/* Image */}
                            <Image
                                width={360}
                                height={250}
                                src={card.image}
                                alt={card.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />


                            {/* Content */}
                            <div className="absolute inset-0 
                                bg-gradient-to-t from-black/90 via-black/40 to-transparent
                                flex flex-col justify-end pb-5 text-white px-4 text-center">

                                {/* Product Name */}
                                <h3 className="text-xl font-semibold tracking-wide">
                                    {card.title}
                                </h3>

                                {/* Price */}
                                <p className="text-sm opacity-90">
                                    {card.price}
                                </p>

                                {/* Shop Now */}
                                <span className="text-xs md:text-sm border-b border-white pb-[2px] hover:tracking-widest transition-all duration-300">
                                    SHOP NOW
                                </span>
                            </div>
                        </div>
                    </motion.a>
                ))}
            </div>
        </section>
    );
}