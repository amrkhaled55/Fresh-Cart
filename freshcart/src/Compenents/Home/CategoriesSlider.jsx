import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import style from "./categorySlider.module.css";

export default function CategoriesSlider() {

  function getCategorySlider() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data } = useQuery({
    queryKey: ["categorySlider"],
    queryFn: getCategorySlider,
  });

  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 2000 }}
      spaceBetween={20}
      loop={true}
      breakpoints={{
        0: {
          slidesPerView: 1,   // 📱 موبايل
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 7,   // 🖥️ شاشات كبيرة
        },
      }}
    >
      {data?.data.data.map((cata, idx) => (
        <SwiperSlide key={idx}>
          <div className={style.slideWrapper}>
            <img src={cata.image} alt="category" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
