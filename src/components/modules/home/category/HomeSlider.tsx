"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

const HomeSlider = () => {
  const [image] = useState([
    {
      _id: 1,
      name: "Classic Denim Jacket",
      price: "3,200 TK",
      poster:
        "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975769/0660000105971_aj9z3s.webp",
    },
    {
      _id: 2,
      name: "Red Summer Dress",
      price: "2,750 TK",
      poster:
        "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975767/0430000121008_zq6vso.webp",
    },
    {
      _id: 3,
      name: "Leather Boots",
      price: "4,500 TK",
      poster:
        "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975765/0660000105903_uwcy9g.webp",
    },
    {
      _id: 4,
      name: "Casual White Shirt",
      price: "1,200 TK",
      poster:
        "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975763/0550000165231_fmdfjm.webp",
    },
    {
      _id: 5,
      name: "Black Hoodie",
      price: "2,000 TK",
      poster:
        "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975762/0540000026433_y8ptmu.webp",
    },
    {
      _id: 6,
      name: "Blue Skinny Jeans",
      price: "2,800 TK",
      poster:
        "https://res.cloudinary.com/dgp5rqeqh/image/upload/v1772975760/0660000105885_4_oigcdc.webp",
    },
  ]);

  return (
    <div className="flex flex-col items-center py-8">
      {/* Heading */}
      <h2 className="text-4xl font-bold text-gray-900 mb-6">Top Selling</h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 150,
          modifier: 1,
          slideShadows: true,
        }}
        // pagination={{ clickable: false }}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="w-full max-w-7xl h-[600px] "
      >
        {image.map((item) => (
          <SwiperSlide key={item._id} className="relative flex justify-center">
            <Image
              width={500}
              height={600}
              src={item.poster}
              alt={`Movie ${item._id}`}
              className="object-cover w-[500px] h-[600px]"
            />
            <div className="absolute text-center bottom-0 left-0 right-0  bg-gradient-to-t from-black/90 via-black/70 to-transparent w-full p-3 sm:p-4 md:p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="md:text-2xl text-lg font-medium leading-tight text-white ">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <span className="md:text-xl text-base font-semibold text-white">
                  {item.price}
                </span>
              </div>

              <div className="flex justify-center mt-4">
                <button className="px-8 w-full py-3 border border-white text-white text-sm tracking-widest uppercase transition-colors duration-300 hover:bg-white hover:text-gray-900 cursor-pointer">
                  Buy Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeSlider;
