import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useState } from "react";
import "./home.css";
import listing from "../Search/data";
import ListingItem from "../Search/ListingItem";

export default function Home() {
  const list_product = [
    "https://dosi-in.com/images/detailed/42/CDL4_1.jpg",
    "https://4menshop.com/images/thumbs/2022/02/quan-jeans-tron-qj040-mau-xanh-duong-16596.JPG",
    "https://assets.adidas.com/images/w_600,f_auto,q_auto/67204a041e95415ab1fc58421baef856_9366/Giay_Superstar_82_trang_ID5961_02_standard_hover.jpg",
    "https://cdn.tgdd.vn/Products/Images/7077/310849/samsung-galaxy-watch6-40mm-vang-1-750x500.jpg",
    "https://cdn.viettelstore.vn/Images/Product/ProductImage/401676858.jpeg",
  ];
  const list_promo = [
    "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2024_2_20_638440648953026094_cach-san-sale-shopee.jpg",
    "https://nplaw.vn/upload/images/quang-cao-thuong-mai-min.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8700uXXKGTNcxeAKC5FjGkpPeejMv8TD8Bw&s",
    "https://digistar.vn/wp-content/uploads/2015/11/khuyen-mai-mua-1-tang-1-BANNER-900x400.png",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiR5dT31Tvt4DcKDA69EeoYxbNf1oogkp27w&s",
  ];
   const [offerListings, setOfferListings] = useState(listing);
  SwiperCore.use([Navigation]);
  return (
    <div>
      <div className="home-container">
        <div className="home-content">
          <h1 className="title-primary">Tất cả những gì bạn cần</h1>
          <h1 className="title-secondary">bán ở đây.</h1>
          <div className="description">
            Với 99,99% so với sản phẩm mới. Mua bán dễ dàng hơn với BKmarket
            <br />
          </div>
          <Link to={"/search"} className="search-link">
            {`Tìm kiếm ngay ...`}
          </Link>
        </div>
      </div>
      <h2 className="swiper-title">Danh mục sản phẩm</h2>
      <div className="swiper-container">
        <Swiper
          spaceBetween={10}      /* Space between slides */
          slidesPerView={4}      /* Number of slides visible at the same time */
          navigation            /* Show navigation arrows */
          loop                  /* Enable infinite looping */
          className="mt-12"
        >
          {list_product.map((url) => (
            <SwiperSlide key={url}>
              <div
                className="product-image"
                style={{
                  background: `url(${url}) center no-repeat`,
                  backgroundSize: "cover",
                }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
        {offerListings && offerListings.length > 0 && (
          <div className="">
              <h2 className="listing-title">
                Sản phẩm nổi bật
              </h2>
              <div className="listing-box">
                {offerListings.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
          </div>
        )}
  </div>
  );
}
