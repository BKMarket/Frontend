import { useEffect, useState } from 'react';
import axios from 'axios';
<<<<<<< Updated upstream
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ currentPage, setCurrentPage }) => {
=======
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ currentPage, setCurrentPage, setInp }) => {
	const [tmpInp, setTmpInp] = useState('');

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

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
>>>>>>> Stashed changes
		</div>
	);
};

const Modal = ({ isOpen, setIsOpen, info }) => {
	return (
		isOpen && (
			<div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
				<div className='bg-white dark:bg-boxdark rounded-lg shadow-lg w-1/3'>
					{/* Modal Header */}
					<div className='px-4 py-3 border-b border-gray-200 dark:border-strokedark flex justify-between items-center'>
						<h2 className='text-lg font-medium text-black dark:text-white'>Thông tin sản phẩm</h2>
						<button className='text-black dark:text-white hover:text-red-600'></button>
					</div>
					{/* Modal Content */}
					<div
						className='max-h-[50vh] overflow-y-auto'
						style={{
							scrollbarWidth: 'none', // Firefox
							msOverflowStyle: 'none', // Internet Explorer and Edge
						}}
					>
						<div className='p-6 rounded-md border border-stroke dark:border-strokedark bg-white dark:bg-boxdark shadow-default'>
							{/* Product Thumbnail */}
							<div className='flex justify-center mb-6'>
								<img src={info.thumbnail} alt={info.title} className='w-64 h-64 object-cover rounded-md shadow-md' />
							</div>

							{/* Product Details */}
							<div className='space-y-4 text-sm text-black dark:text-white'>
								{/* Title */}
								<div>
									<h2 className='text-lg font-medium'>{info.title}</h2>
									<p className='text-gray-600 dark:text-gray-400'>ID: {info._id}</p>
								</div>

								{/* Price and Discount */}
								<div>
									<p className='font-medium'>
										Giá sản phẩm:{' '}
										<span className='text-red-500'>
											{((info.price * (100 - info.discountPercentage)) / 100).toLocaleString('vi-VN', {
												style: 'currency',
												currency: 'VND',
											})}
										</span>
									</p>
									{info.discountPercentage > 0 && (
										<p className='text-sm text-gray-500 line-through'>
											{info.price.toLocaleString('vi-VN', {
												style: 'currency',
												currency: 'VND',
											})}
										</p>
									)}
								</div>

								{/* Tags */}
								<div>
									<p className='font-medium'>Tags:</p>
									<div className='flex flex-wrap gap-2 mt-1'>
										{info.tag.map((tag, index) => (
											<span
												key={index}
												className='px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 dark:bg-blue-700 dark:text-blue-200'
											>
												{tag}
											</span>
										))}
									</div>
								</div>

								{/* Stock and Sold */}
								<div>
									<p>
										<span className='font-medium'>Tồn kho:</span> {info.stock}
									</p>
									<p>
										<span className='font-medium'>Đã bán:</span> {info.sold}
									</p>
								</div>

								{/* Description */}
								<div>
									<p className='font-medium'>Mô tả:</p>
									<p className='text-gray-600 dark:text-gray-400 mt-1'>{info.description}</p>
								</div>

								{/* Creator */}
								<div className='flex items-center space-x-4'>
									<img
										src={info.createdBy.avatar}
										alt={`${info.createdBy.firstName} ${info.createdBy.lastName}`}
										className='w-10 h-10 rounded-full shadow-md'
									/>
									<div>
										<p className='font-medium'>
											Người tạo: {info.createdBy.firstName} {info.createdBy.lastName}
										</p>
										<p className='text-gray-600 dark:text-gray-400'>{info.createdBy.email}</p>
									</div>
								</div>

								{/* Last Modified */}
								<div>
									<p className='text-gray-600 dark:text-gray-400'>
										Cập nhật lần cuối:{' '}
										<span className='font-medium'>
											{new Date(info.lastModifiedAt).toLocaleDateString('vi-VN', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
										</span>
									</p>
								</div>
							</div>
						</div>
					</div>

					{/* Modal Footer */}
					<div className='px-4 py-3 border-t border-gray-200 dark:border-strokedark text-right'>
						<button
							onClick={(e) => {
								e.preventDefault();
								setIsOpen(false);
							}}
							className='px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600'
						>
							Đóng
						</button>
					</div>
				</div>
			</div>
		)
	);
};

<<<<<<< Updated upstream
const TableTwo = () => {
=======
const TableTwo = ({ stupidString }) => {
>>>>>>> Stashed changes
	const navigate = useNavigate();
	const [productData, setProductData] = useState([]);
	const [reload, setReload] = useState(false);
	const [page, setPage] = useState(1);
	const [openModal, setOpenModal] = useState(false);
<<<<<<< Updated upstream

	useEffect(() => {
		setPage(1);
=======
	const [name, setName] = useState('');

	const location = useLocation();

	useEffect(() => {
		setPage(1);
		setName('');
>>>>>>> Stashed changes
	}, [location]);

	useEffect(() => {
		const fetchData = async () => {
<<<<<<< Updated upstream
			const response = await axios.get(import.meta.env.VITE_HOST + '/api/admin/products/waiting', {
				params: { page },
=======
			const response = await axios.get(import.meta.env.VITE_HOST + '/api/admin/products/' + (stupidString || ''), {
				params: { page, name },
>>>>>>> Stashed changes
			});
			setProductData(response.data.data);
		};

		fetchData();
<<<<<<< Updated upstream
	}, [page, reload]);
=======
	}, [page, reload, location, name]);
>>>>>>> Stashed changes

	useEffect;

	return (
		<div className='rounded-sm border border-stroke {bg-white} shadow-default dark:border-strokedark dark:bg-boxdark'>
<<<<<<< Updated upstream
			<Pagination currentPage={page} setCurrentPage={setPage}></Pagination>
=======
			<Pagination currentPage={page} setCurrentPage={setPage} setInp={setName}></Pagination>
>>>>>>> Stashed changes
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
					<p className='font-medium'>Hành động</p>
				</div>
			</div>

			{productData?.map((product, key) => (
				<Product product={product} key={key} reload={reload} setReload={setReload}></Product>
			))}
<<<<<<< Updated upstream
			<Pagination currentPage={page} setCurrentPage={setPage}></Pagination>
=======
			<Pagination currentPage={page} setCurrentPage={setPage} setInp={setName}></Pagination>
>>>>>>> Stashed changes
		</div>
	);
};

function Product({ product, reload, setReload }) {
	const [openModal, setOpenModal] = useState(false);

	return (
		<div
			className={
				' grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5'
			}
		>
			<div className='col-span-1 flex flex-row items-center'>
				<div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
					<div className='h-[80px] w-[80px]'>
						<img src={product.thumbnail} alt='Product' className='w-full h-full object-scale-down' />
					</div>
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
			<div className='col-span-1 flex items-center space-x-3'>
				<button
					onClick={(e) => {
						e.preventDefault();
						setOpenModal(true);
					}}
					className='relative group'
				>
					<FontAwesomeIcon icon={Icons.faEye} size='2x' className='hover:brightness-125'></FontAwesomeIcon>
					<span className='w-20 absolute hidden group-hover:block text-sm text-white bg-gray-800 dark:bg-gray-700 px-2 py-1 rounded-md transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
						Xem chi tiết
					</span>
				</button>
				<Modal isOpen={openModal} setIsOpen={setOpenModal} info={product}></Modal>
				<button
					onClick={async (e) => {
						e.preventDefault();
						await axios.post(import.meta.env.VITE_HOST + `/api/admin/products/${product?._id}/approve`);
						setReload(!reload);
					}}
					className='relative group'
				>
					{' '}
					<FontAwesomeIcon icon={Icons.faCheck} size='2x' className='hover:brightness-125'></FontAwesomeIcon>
					<span className='w-20 absolute hidden group-hover:block text-sm text-white bg-gray-800 dark:bg-gray-700 px-2 py-1 rounded-md transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
						Chấp nhận
					</span>
				</button>
				<button
					onClick={async (e) => {
						e.preventDefault();
						await axios.post(import.meta.env.VITE_HOST + `/api/admin/products/${product?._id}/deny`);
						setReload(!reload);
					}}
					className='relative group'
				>
					{' '}
					<FontAwesomeIcon icon={Icons.faXmark} size='2x' className='hover:brightness-125'></FontAwesomeIcon>
					<span className='w-20 absolute hidden group-hover:block text-sm text-white bg-gray-800 dark:bg-gray-700 px-2 py-1 rounded-md transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
						Không chấp nhận
					</span>
				</button>
			</div>
		</div>
	);
}

export default TableTwo;
