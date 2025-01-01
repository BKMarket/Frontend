import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ListingItem from '../Buyer/Search/ListingItem';

const list_hero = [
	'https://down-vn.img.susercontent.com/file/74ca517e1fa74dc4d974e5d03c3139de@resize_w320_nl.webp',
	'https://down-vn.img.susercontent.com/file/36013311815c55d303b0e6c62d6a8139@resize_w320_nl.webp',
	'https://down-vn.img.susercontent.com/file/ce8f8abc726cafff671d0e5311caa684@resize_w320_nl.webp',
	'https://down-vn.img.susercontent.com/file/7abfbfee3c4844652b4a8245e473d857@resize_w320_nl.webp',
	'https://down-vn.img.susercontent.com/file/e4fbccba5e1189d1141b9d6188af79c0@resize_w320_nl.webp',
];
const list_promo = [
	// 'https://scontent.fsgn6-1.fna.fbcdn.net/v/t39.30808-6/465463935_1018108880362838_2006333117837981097_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHwgyLL8kHoFIIo9C20dEEZXFdQsj5zyitcV1CyPnPKKxTF073qWMVsqqZFrApkmdHSLVzk9IpFBLBzrZ0vubSV&_nc_ohc=L8sy4OwnaTUQ7kNvgHj67Xr&_nc_oc=AdiBmRVweMJ0Kq7nHmiJNLosRmFeTgNfp46v_n7D82IAcdm1Bfq6vS5nQo3KIzUtWg_l6OtxLkvoEApeW5QEkHk_&_nc_zt=23&_nc_ht=scontent.fsgn6-1.fna&_nc_gid=AucvZDWx_lNdkhNjTLYMAk0&oh=00_AYCf-eLXt3ZJGK4fFwb22TDg79i1sGw-Uw_472124l8p-A&oe=677370CC',
	// 'https://scontent.fsgn6-2.fna.fbcdn.net/v/t39.30808-6/380140302_727313939224361_6028821492375882917_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=100&ccb=1-7&_nc_sid=2285d6&_nc_eui2=AeHh6zF8ccVcF72i_OLQzTBYVLRdpjqlYahUtF2mOqVhqPArNxLeAN2GrPg0H5LJTazpW52FPhVikyqcePkwUuZt&_nc_ohc=rG1Z_kDnLH0Q7kNvgFVtE5F&_nc_oc=AdjIH_TCn8czrPVV5TMiimkjCOmTVssgYiMkYnHA0dCtdpd-SY-fcOAtntu7hVffS5FX-ZZSDjU_vOJHMZv1LPbZ&_nc_zt=23&_nc_ht=scontent.fsgn6-2.fna&_nc_gid=A45_GJFHlr_8vRQTrLwwQYo&oh=00_AYD-4V2eDqboIGynBUVtWQD60vvIUzNbMsYdrF1P5epBYA&oe=67737091',
	// 'https://nplaw.vn/upload/images/quang-cao-thuong-mai-min.jpg',
	'kit.jpg',
	'https://hust.edu.vn/assets/sys/su-kien-noi-bat/2023_10/concept-bkntv2023-cover-skien.png',
	// "https://digistar.vn/wp-content/uploads/2015/11/khuyen-mai-mua-1-tang-1-BANNER-900x400.png",
	'momo.png',
];

export default function Home() {
	const [offerListings, setOfferListings] = useState([]);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(import.meta.env.VITE_HOST + '/api/products', {
					params: {
						page: 1,
						limit: 5,
					},
				});
				setOfferListings(response.data.data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);
	SwiperCore.use([Navigation]);
	return (
		<div>
			{/* top */}
			<div className='flex px-28'>
				<div className='flex flex-col py-20 gap-6 max-w-6xl mx-auto'>
					<h1 className='text-slate-700 font-bold text-xl lg:text-6xl'>Tất cả những gì bạn cần</h1>
					<h1 className='text-slate-500 font-bold text-xl lg:text-6xl'>bán ở đây.</h1>
					<div className='text-gray-400 text-xs sm:text-sm'>
						Với 99,99% so với sản phẩm mới. Mua bán dễ dàng hơn với BKmarket
						<br />
					</div>
					<Link to={'/search'} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
						{`Tìm kiếm ngay ...`}
					</Link>
				</div>
				<div className='w-[25%] h-[100%] flex items-center justify-center'>
					<Swiper navigation className='mt-12'>
						{list_hero.map((url) => (
							<SwiperSlide key={url}>
								<div
									className='mx-[auto] w-[200px] h-[250px] rounded-[20px]'
									style={{
										background: `url(${url}) center no-repeat`,
										backgroundSize: 'cover',
									}}
								></div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
			<div className='bg-slate-300 flex flex-col max-w-6xl mx-auto my-10 rounded-md overflow-hidden shadow-sm'>
				<h2 className='text-2xl text-slate-600 m-3 font-bold '>CHƯƠNG TRÌNH KHUYẾN MÃI</h2>
				<div className='flex my-5'>
					{list_promo.map((item) => (
						<div
							key={item}
							className='flex-1 mx-3 hover:shadow-lg hover:scale-[1.1] hover:mx-5 hover:z-49 transition-scale duration-300 ease-in-out'
						>
							<img src={item} alt='Promo' className='w-full h-48 object-cover' />
						</div>
					))}
				</div>
			</div>

			<div className='bg-slate-300 max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 rounded-md shadow-sm'>
				{offerListings && offerListings.length > 0 && (
					<div className=''>
						<Link to={'/search'} onClick={() => window.scrollTo(0, 0)}>
							<h2 className='text-2xl text-slate-600 mb-5 font-bold'>SẢN PHẨM NỔI BẬT</h2>
						</Link>
						<div className='flex flex-wrap gap-4 justify-around'>
							{offerListings.slice(0, 5).map((listing) => (
								<ListingItem listing={listing} key={listing._id} />
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
