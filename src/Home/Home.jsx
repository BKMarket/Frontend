import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

import "./home.css";
export default function Home() {
  const list_hero = [
    "https://dosi-in.com/images/detailed/42/CDL4_1.jpg",
    "https://4menshop.com/images/thumbs/2022/02/quan-jeans-tron-qj040-mau-xanh-duong-16596.JPG",
    "https://assets.adidas.com/images/w_600,f_auto,q_auto/67204a041e95415ab1fc58421baef856_9366/Giay_Superstar_82_trang_ID5961_02_standard_hover.jpg",
    "https://cdn.tgdd.vn/Products/Images/7077/310849/samsung-galaxy-watch6-40mm-vang-1-750x500.jpg",
    "https://cdn.viettelstore.vn/Images/Product/ProductImage/401676858.jpeg",
  ];
  SwiperCore.use([Navigation]);
  return (
    <div>
      {/* top */}
      <div className="flex px-28">
        <div className="flex flex-col py-20 gap-6 max-w-6xl mx-auto">
          <h1 className="text-slate-700 font-bold text-xl lg:text-6xl">
            Tất cả những gì bạn cần
          </h1>
          <h1 className="text-slate-500 font-bold text-xl lg:text-6xl">
            bán ở đây.
          </h1>
          <div className="text-gray-400 text-xs sm:text-sm">
            Với 99,99% so với sản phẩm mới. Mua bán dễ dàng hơn với BKmarket
            <br />
          </div>
          <Link
            to={"/search"}
            className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
          >
            {`Tìm kiếm ngay ...`}
          </Link>
        </div>
        <div className="w-[25%] h-[100%] flex items-center justify-center">
          <Swiper navigation className="mt-12">
            {list_hero.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="mx-[auto] w-[200px] h-[250px] rounded-[20px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}