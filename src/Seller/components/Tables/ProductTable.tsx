import { Product } from '../../types/product';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ currentPage, setCurrentPage, setInp }) => {
	const [tmpInp, setTmpInp] = useState('');

	return (
		<div className='flex items-center justify-center space-x-2 mt-4 mb-4'>
			{/* Previous Button */}
			<button
				className={`px-4 py-2 rounded-md border border-stroke dark:border-strokedark bg-white dark:bg-boxdark text-sm text-black dark:text-white shadow-default hover:brightness-125 ${
					currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''
				}`}
				onClick={() => setCurrentPage(currentPage - 1)}
				disabled={currentPage === 1}
			>
				&lt;
			</button>

			{/* Current Page */}
			<input
				className='w-16 text-center px-4 py-2 rounded-md border border-stroke dark:border-strokedark bg-white dark:bg-boxdark text-sm text-black dark:text-white shadow-default'
				value={currentPage}
				onChange={(e) => e.target.value && setCurrentPage(Number(e.target.value))}
				min='1'
			/>

			{/* Next Button */}
			<button
				className={`px-4 py-2 rounded-md border border-stroke dark:border-strokedark bg-white dark:bg-boxdark text-sm text-black dark:text-white shadow-default hover:brightness-125`}
				onClick={() => setCurrentPage(currentPage + 1)}
			>
				&gt;
			</button>

			{/* Text Inp */}
			<input
				className='w-500 text-center px-4 py-2 rounded-md border border-stroke dark:border-strokedark bg-white dark:bg-boxdark text-sm text-black dark:text-white shadow-default'
				value={tmpInp}
				placeholder={'Tìm kiếm bằng tên'}
				onChange={(e) => setTmpInp(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						setInp(tmpInp);
					}
				}}
			/>
		</div>
	);
};

const TableTwo = ({ stupidString }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const [productData, setProductData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [name, setName] = useState('');

	useEffect(() => {
		setCurrentPage(1);
		setName('');
	}, [location]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(import.meta.env.VITE_HOST + '/api/seller/products/' + stupidString, {
				params: { page: currentPage, name },
			});
			setProductData(response.data.data);
		};

		fetchData();
	}, [location, name, currentPage]);

	return (
		<div className='rounded-sm border border-stroke {bg-white} shadow-default dark:border-strokedark dark:bg-boxdark'>
			<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} setInp={setName}></Pagination>
			<div className='grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5'>
				<div className='col-span-1 flex items-center'>
					<p className='font-medium'>Sản phẩm</p>
				</div>
				<div className='col-span-2 flex items-center'>
					<p className='font-medium'>Tên</p>
				</div>
				<div className='col-span-2 hidden items-center sm:flex'>
					<p className='font-medium'>Cập nhật lần cuối</p>
				</div>
				<div className='col-span-1 flex items-center'>
					<p className='font-medium'>Giá</p>
				</div>
				<div className='col-span-1 flex items-center'>
					<p className='font-medium'>Đã bán</p>
				</div>
				<div className='col-span-1 flex items-center'>
					<p className='font-medium'>Đang còn</p>
				</div>
			</div>

			{productData?.map((product, key) => (
				<div
					className={
						' grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5'
					}
					key={key}
				>
					<div className='col-span-1 flex flex-row items-center'>
						<div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
							<button className='h-[80px] w-[80px]' onClick={() => navigate(`/seller/products/update/${product.slug}`)}>
								<img src={product.thumbnail} alt='Product' className='w-full h-full object-scale-down' />
							</button>
						</div>
					</div>

					<div className='col-span-2  flex flex-col justify-center'>
						<p className='text-sm text-black dark:text-white'>{product.title}</p>
					</div>

					<div className='col-span-2 hidden items-center sm:flex'>
						<p className='text-sm text-black dark:text-white'>
							{new Date(product?.lastModifiedAt).toLocaleDateString('vi-en', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</p>
						<div className='flex flex-row items-center'>
							{product.deleted && (
								<div className='relative group'>
									<FontAwesomeIcon icon={Icons.faUsersSlash} className='mx-3' color='red' />
									<span className='absolute left-0 bottom-10 hidden group-hover:block text-sm text-white bg-gray-800 dark:bg-gray-700 px-2 py-1 rounded-md transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
										Đang bị ẩn
									</span>
								</div>
							)}
							{product.approved ? (
								<div className='relative group'>
									<FontAwesomeIcon icon={Icons.faCircleCheck} className='mx-3' color='green' />
									<span className='absolute left-0 bottom-10 hidden group-hover:block text-sm text-white bg-gray-800 dark:bg-gray-700 px-2 py-1 rounded-md transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
										Đã kiểm duyệt
									</span>
								</div>
							) : (
								<div className='relative group'>
									<FontAwesomeIcon icon={Icons.faStopwatch} className='mx-3' color='grey' />
									<span className='absolute left-0 bottom-10 hidden group-hover:block text-sm text-white bg-gray-800 dark:bg-gray-700 px-2 py-1 rounded-md transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
										Chờ kiểm duyệt
									</span>
								</div>
							)}
						</div>
					</div>

					<div className='flex flex-col col-span-1 justify-center'>
						{Number(product?.discountPercentage) != 0 && (
							<p className='text-sm text-red dark:text-red line-through'>
								{Number(product?.price).toLocaleString('vi-VN', {
									style: 'currency',
									currency: 'VND',
								})}
							</p>
						)}
						<p className='text-sm text-black dark:text-white'>
							{((Number(product?.price) * (100 - Number(product?.discountPercentage))) / 100).toLocaleString('vi-VN', {
								style: 'currency',
								currency: 'VND',
							})}
						</p>
					</div>
					<div className='col-span-1 flex items-center'>
						<p className='text-sm text-black dark:text-white'>{product?.sold}</p>
					</div>
					<div className='col-span-1 flex items-center'>
						<p className='text-sm text-black  dark:text-white'>{product?.stock}</p>
					</div>
				</div>
			))}
			<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} setInp={setName}></Pagination>
		</div>
	);
};

export default TableTwo;
