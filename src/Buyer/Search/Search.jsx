import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import ListingItem from './ListingItem.jsx';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

export default function Search() {
	const location = useLocation();
	const navigate = useNavigate();
	const [sidebardata, setSidebardata] = useState({
		lastModifiedAt: undefined,
		price: undefined,
		sold: undefined,
		minPrice: 0,
		maxPrice: null,
		tag: [],
		discount: null,
	});
	const [loading, setLoading] = useState(true);
	const [listings, setListings] = useState([]);
	const [page, setPage] = useState(Number(new URL(window.location.href).searchParams.get('page') || '1'));
	const [newTag, setNewTag] = useState(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const requestBody = {
			tags: sidebardata.tag,
			discount: sidebardata.discount,
			minPrice: sidebardata.minPrice !== 0 ? sidebardata.minPrice : undefined,
			maxPrice: sidebardata.maxPrice !== null ? sidebardata.maxPrice : undefined,
			sort: {
				priceSort: sidebardata.price && sidebardata.price !== 'Tất cả' ? sidebardata.price : undefined,
				lastModifiedAtSort:
					sidebardata.lastModifiedAt && sidebardata.lastModifiedAt !== 'Tất cả'
						? sidebardata.lastModifiedAt
						: undefined,
				soldSort: sidebardata.sold && sidebardata.sold !== 'Tất cả' ? sidebardata.sold : undefined,
			},
		};

		const cleanedRequestBody = Object.fromEntries(
			Object.entries(requestBody).filter(([, value]) => value !== undefined)
		);

		const searchParams = new URLSearchParams(location.search);

		try {
			const response = await axios.get(import.meta.env.VITE_HOST + '/api/products', {
				params: { ...cleanedRequestBody, page: page, limit: 60, searchTerm: searchParams.get('searchTerm') },
			});

			setListings(response.data.data);
			setLoading(false);
		} catch (error) {
			console.error('Error fetching data', error);
			setLoading(false);
		}
	};

	const controller = useRef(new AbortController());
	const params = useParams('/');

	useEffect(() => {
		if (page < 1) setPage(1);
		const newUrl = new URL(window.location.href);
		newUrl.searchParams.set('page', page);
		navigate(newUrl.pathname + newUrl.search.toString(), { replace: true });
	}, [navigate, page]);

	useEffect(() => {
		if (!controller.current) {
			return;
		}

		controller.current.abort();
		controller.current = new AbortController();

		const fetchData = async () => {
			const requestBody = {
				tags: sidebardata.tag,
				discount: sidebardata.discount,
				minPrice: sidebardata.minPrice !== 0 ? sidebardata.minPrice : undefined,
				maxPrice: sidebardata.maxPrice !== null ? sidebardata.maxPrice : undefined,
				sort: {
					priceSort: sidebardata.price && sidebardata.price !== 'Tất cả' ? sidebardata.price : undefined,
					lastModifiedAtSort:
						sidebardata.lastModifiedAt && sidebardata.lastModifiedAt !== 'Tất cả'
							? sidebardata.lastModifiedAt
							: undefined,
					soldSort: sidebardata.sold && sidebardata.sold !== 'Tất cả' ? sidebardata.sold : undefined,
				},
			};

			const cleanedRequestBody = Object.fromEntries(
				Object.entries(requestBody).filter(([, value]) => value !== undefined)
			);

			try {
				const searchParams = new URLSearchParams(location.search);
				const page = Number(searchParams.get('page') || '1');
				setLoading(true);
				const response = await axios.get(import.meta.env.VITE_HOST + '/api/products', {
					params: {
						...cleanedRequestBody,
						page: page,
						limit: 60,
						searchTerm: searchParams.get('searchTerm'),
					},
					signal: controller.current.signal,
				});
				setListings(response.data.data);
				setLoading(false);
			} catch (error) {
				console.log(error);
				setLoading(false);
			}
		};

		fetchData();
		const newUrl = new URL(window.location.href);
		newUrl.searchParams.set('page', page);
		window.history.pushState({}, '', newUrl);
	}, [params]);

	const handleInputChange = (e) => {
		const newPage = e.target.value;
		if (!isNaN(newPage) && newPage > 0) {
			setPage(newPage); // Update the page state with the input value
		}
	};

	const handleTagChange = (tag) => {
		setSidebardata((prev) => {
			const updatedTags = prev.tag.includes(tag) ? prev.tag.filter((t) => t !== tag) : [...prev.tag, tag];
			return { ...prev, tag: updatedTags };
		});
	};

	const handleCustomTagChange = (e) => {
		setNewTag(e.target.value);
	};

	const handleAddCustomTag = () => {
		if (newTag && !sidebardata.tag.includes(newTag)) {
			setSidebardata((prev) => ({
				...prev,
				tag: [...prev.tag, newTag],
			}));
		}
		setNewTag(''); // Reset the input after adding
	};

	const handleRemoveTag = (tag) => {
		setSidebardata((prev) => ({
			...prev,
			tag: prev.tag.filter((t) => t !== tag),
		}));
	};

	return (
		<div className='flex flex-col md:flex-row'>
			{/* Sidebar */}
			<div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
				<form onSubmit={handleSubmit} className='flex flex-col gap-8'>
					{/* Display selected tag */}
					<div className='flex gap-2 flex-wrap items-center'>
						<label className='font-semibold'>Tags:</label>
						{sidebardata.tag.length > 0 &&
							sidebardata.tag.map((tag, index) => (
								<span key={index} className='bg-slate-200 p-1 rounded-md text-sm flex items-center gap-2'>
									{tag}
									<button type='button' onClick={() => handleRemoveTag(tag)} className=' text-xs font-semibold'>
										X
									</button>
								</span>
							))}
					</div>

					{/* Predefined Tags */}
					<div className='flex gap-2 flex-wrap items-center'>
						<label className='font-semibold'>Tag:</label>
						{['Tài liệu', 'Dụng cụ học tập', 'Trang trí'].map((tag, index) => (
							<div className='flex gap-2' key={index}>
								<input
									type='checkbox'
									className='w-5'
									checked={sidebardata.tag.includes(tag)}
									onChange={() => handleTagChange(tag)}
								/>
								<span>{tag}</span>
							</div>
						))}
					</div>

					{/* Custom Tag Input */}
					<div className='flex gap-2 flex-wrap items-center'>
						<label className='font-semibold'>Tag khác:</label>
						<input
							type='text'
							value={newTag}
							onChange={handleCustomTagChange}
							placeholder='Nhập tag khác'
							className='border-2 rounded-md px-1 border-gray-500 bg-transparent focus:outline-none w-[150px]'
						/>
						<button type='button' onClick={handleAddCustomTag} className='bg-slate-700 text-white p-1 rounded-md'>
							Thêm
						</button>
					</div>

					<div className='flex gap-2 flex-wrap items-center'>
						<label className='font-semibold'>Loại giảm giá</label>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								className='w-5'
								checked={sidebardata.discount === true}
								onChange={(e) => setSidebardata({ ...sidebardata, discount: e.target.checked ? true : null })}
							/>
							<span>Có giảm giá</span>
						</div>
						<div className='flex gap-2'>
							<input
								type='checkbox'
								className='w-5'
								checked={sidebardata.discount === null}
								onChange={(e) => setSidebardata({ ...sidebardata, discount: e.target.checked ? null : true })}
							/>
							<span>Tất cả</span>
						</div>
					</div>

					{/* Price Range */}
					<div className='flex gap-2 flex-wrap items-center'>
						<label className='font-semibold'>Khoảng giá</label>
						<input
							type='text'
							placeholder='Từ'
							className='border-2 rounded-md px-1 border-gray-500 bg-transparent focus:outline-none w-[50px]'
							onChange={(e) => setSidebardata({ ...sidebardata, minPrice: e.target.value })}
						/>
						<label className='font-semibold'>.000 VND</label>
						<input
							type='text'
							placeholder='Đến'
							className='border-2 rounded-md px-1 border-gray-500 bg-transparent focus:outline-none w-[50px]'
							onChange={(e) => setSidebardata({ ...sidebardata, maxPrice: e.target.value })}
						/>
						<label className='font-semibold'>.000 VND</label>
					</div>

					{/* Sort and Apply Button */}
					<div className='flex gap-2 flex-wrap items-center'>
						<label className='font-semibold'>Giá:</label>
						<select
							className='border rounded-md p-3'
							onChange={(e) => setSidebardata({ ...sidebardata, price: e.target.value })}
						>
							<option value=''>Tất cả</option>
							<option value='asc'>Tăng dần</option>
							<option value='desc'>Giảm dần</option>
						</select>
					</div>
					<div className='flex items-center gap-2'>
						<label className='font-semibold'>Thời gian:</label>
						<select
							className='border rounded-md p-3'
							onChange={(e) => setSidebardata({ ...sidebardata, lastModifiedAt: e.target.value })}
						>
							<option value=''>Tất cả</option>
							<option value='desc'>Mới nhất</option>
						</select>
					</div>
					<div className='flex items-center gap-2'>
						<label className='font-semibold'>Độ hot:</label>
						<select
							className='border rounded-md p-3'
							onChange={(e) => setSidebardata({ ...sidebardata, sold: e.target.value })}
						>
							<option value=''>Tất cả</option>
							<option value='desc'>Bán chạy nhất</option>
						</select>
					</div>

					<button className='bg-slate-700 text-white p-3 rounded-md uppercase hover:opacity-95' onClick={handleSubmit}>
						Áp dụng
					</button>
				</form>
			</div>

			{/* Listings */}
			<div className='flex-1'>
				<div className='flex justify-center items-center gap-4 border-b-2 md:border-r-2 p-4'>
					<FontAwesomeIcon
						className='bg-slate-700 text-white p-3 rounded-md hover:opacity-95 cursor-pointer'
						icon={Icons.faCircleLeft}
						onClick={() => {
							setPage(page - 1);
							window.scrollTo(0, 0);
						}}
					/>

					<div>Trang</div>
					<input
						value={page} // Bind the input field to the page state
						onChange={handleInputChange} // Update the page state as the user types
						className='w-20 text-center bg-slate-700 text-white p-2 rounded-md overflow-hidden'
					/>

					<FontAwesomeIcon
						className='bg-slate-700 text-white p-3 rounded-md hover:opacity-95 cursor-pointer'
						icon={Icons.faCircleRight}
						onClick={() => {
							setPage(page + 1);
							window.scrollTo(0, 0);
						}}
					/>
				</div>

				<div className='p-7 flex flex-wrap gap-4'>
					{!loading && listings.length === 0 && <p className='text-xl text-slate-700'>Không tìm thấy sản phẩm!</p>}
					{loading && <p className='text-xl text-slate-700 text-center w-full'>Loading...</p>}

					{!loading && listings && listings.map((listing) => <ListingItem key={listing._id} listing={listing} />)}
				</div>

				{/* Page Navigation */}
				<div className='flex-col justify-center items-center border-t-2 md:border-r-2'>
					<div className='flex justify-center items-center gap-4 border-b-2 md:border-r-2 p-4'>
						<FontAwesomeIcon
							className='bg-slate-700 text-white p-3 rounded-md hover:opacity-95 cursor-pointer'
							icon={Icons.faCircleLeft}
							onClick={() => {
								setPage(page - 1);
								window.scrollTo(0, 0);
							}}
						/>

						<div>Trang</div>
						<input
							value={page} // Bind the input field to the page state
							onChange={handleInputChange} // Update the page state as the user types
							className='w-20 text-center bg-slate-700 text-white p-2 rounded-md overflow-hidden'
						/>

						<FontAwesomeIcon
							className='bg-slate-700 text-white p-3 rounded-md hover:opacity-95 cursor-pointer'
							icon={Icons.faCircleRight}
							onClick={() => {
								setPage(page + 1);
								window.scrollTo(0, 0);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
