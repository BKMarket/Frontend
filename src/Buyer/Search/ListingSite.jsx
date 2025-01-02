import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaShare } from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

export default function Listing() {
	SwiperCore.use([Navigation]);
	const [listings, setListing] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [copied, setCopied] = useState(false);
	const params = useParams();
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		const fetchListing = async () => {
			try {
				setLoading(true);
				const response = await axios.get(import.meta.env.VITE_HOST + '/api/products/' + params.slug);
				setListing(response.data.data);
				setLoading(false);
			} catch (err) {
				setLoading(false);
				console.log(err);
				setError(true);
			}
		};
		fetchListing();
	}, [params.slug]);

	return (
		<main>
			{loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
			{error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
			{listings && !loading && !error && (
				<div>
					<Swiper navigation>
						{[listings.thumbnail].concat(listings.images).map((url) => (
							<SwiperSlide key={url}>
								<div
									className='h-[550px]'
									style={{
										background: `url(${url}) center no-repeat`,
										backgroundSize: 'contain', // Use contain to ensure the image fits within the container
										backgroundPosition: 'center',
										backgroundColor: '#f0f0f0', // Optional, in case the image doesn't fill the area
									}}
								></div>
							</SwiperSlide>
						))}
					</Swiper>

					<div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-sky-50 cursor-pointer'>
						<FaShare
							className='text-slate-500'
							onClick={() => {
								navigator.clipboard.writeText(window.location.href);
								setCopied(true);
								setTimeout(() => {
									setCopied(false);
								}, 2000);
							}}
						/>
					</div>
					{copied && <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-sky-50 p-2'>Link copied!</p>}
					<div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
						<p className='text-2xl font-semibold'>{listings.title}</p>
						<p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>{listings.address}</p>
						<div className='flex gap-4'>
							<p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
								{listings.stock === 0 ? 'Hết hàng' : 'Đang bán'}
							</p>

							{listings.discountPercentage != 0 && (
								<p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
									GIẢM GIÁ {listings.discountPercentage}%
								</p>
							)}
						</div>
						<div>
							<p className='text-2xl font-semibold text-red-900'>
								{((listings.price * (100 - listings.discountPercentage)) / 100).toLocaleString('vi-VN', {
									style: 'currency',
									currency: 'VND',
								})}
							</p>
							{listings.discountPercentage != 0 && (
								<p className='text-sm text-gray-500 line-through'>
									{listings.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
								</p>
							)}
						</div>
						<p className='text-slate-800'>
							<span className='font-semibold text-black'>Mô tả sản phẩm: </span>
							{listings.description}
						</p>
						<ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
							{listings.tag.map((tg) => (
								<li className='flex items-center gap-1 whitespace-nowrap ' key={tg}>
									<FontAwesomeIcon icon={Icons.faTag} />
									{tg}
								</li>
							))}
						</ul>
						<div className=' p-4 border rounded-lg shadow-lg bg-white flex flex-row text-wrap'>
							<img
								src={listings.createdBy.avatar}
								alt='User Avatar'
								className='w-24 h-24 rounded-full object-cover mb-4'
							/>
							<div className='flex flex-col mx-2'>
								<h3 className='text-xl font-semibold'>
									{listings.createdBy.firstName + ' ' + listings.createdBy.lastName}
								</h3>
								<p className='text-gray-500'>{listings.createdBy.email}</p>
							</div>
						</div>

						<div className='flex space-x-3'>
							<button
								onClick={async (e) => {
									e.preventDefault();
									try {
										const account = JSON.parse(localStorage.getItem('account'));
										const response = await axios.post(import.meta.env.VITE_HOST + '/api/carts/update', {
											productId: listings._id,
											quantity:
												(account.cart.find((x) => x.product === listings._id)?.quantity || 0) + Number(quantity),
										});
										account.cart = response.data.data;
										localStorage.setItem('account', JSON.stringify(account));
										toast.success('Đã thêm vào giỏ hàng');
									} catch (err) {
										console.log(err);
										toast.error('Có lỗi xảy ra');
									}
								}}
								className='w-3/4 bg-slate-700 text-white rounded-md uppercase hover:opacity-95 p-3'
							>
								Thêm vào giỏ hàng
							</button>

							<div className='flex-1 flex justify-between items-center border border-gray-300 rounded-md overflow-hidden'>
								<button
									type='button'
									className='px-4 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300'
									id='decrement'
									onClick={() => setQuantity(String(Number(quantity) - 1))}
								>
									-
								</button>
								<input
									type='string'
									id='quantity'
									value={quantity}
									onChange={(e) => setQuantity(e.target.value)}
									min='1'
									className='w-16 text-center text-xl font-semibold py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500'
								/>
								<button
									type='button'
									className='px-4 py-2 bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300'
									id='increment'
									onClick={() => setQuantity(String(Number(quantity) + 1))}
								>
									+
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</main>
	);
}
