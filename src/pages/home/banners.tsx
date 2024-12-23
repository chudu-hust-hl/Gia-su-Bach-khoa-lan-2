import React, { FC } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box } from "zmp-ui";

function getDummyImage(filename: string) {
  return `https://stc-zmp.zadn.vn/templates/zaui-coffee/dummy/${filename}`;
}

export const Banners: FC = () => {
  return (
    <Box className="bg-white" pb={4}>
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
        autoplay
        loop
        cssMode
      >
        {[1, 2, 3]
          .map((i) => getDummyImage(`banner-${i}.webp`))
          .map((banner, i) => (
            <SwiperSlide key={i} className="p-0">
              <Box
                className="w-full rounded-none aspect-[2/1] bg-cover bg-center bg-skeleton"
                style={{ backgroundImage: `url(${banner})` }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};