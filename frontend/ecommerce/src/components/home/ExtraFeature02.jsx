// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import img2 from "../../assets/adnan.jpg";
import img1 from "../../assets/vecteezy_black-friday-and-cyber-monday-banner-super-sale-at-the-end_11527735.jpg";
import img3 from "../../assets/apple-black-friday-promo-ezgif.com-webp-to-jpg-converter.jpg";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

import { Scrollbar, Autoplay } from "swiper/modules";

const Feature = () => {
  return (
    <div>
      <Swiper
        scrollbar={{ hide: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Scrollbar, Autoplay]}
        className="mySwiper  overflow-hidden"
      >
        <SwiperSlide>
          <img src={img1} alt="img1" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img3} alt="img2" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={img1} alt="img3" className="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Feature;
