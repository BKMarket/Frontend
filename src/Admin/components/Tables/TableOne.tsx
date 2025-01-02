import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

const Pagination = ({ currentPage, setCurrentPage }) => {
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
						className='max-h-[50vh] overflow-y-auto p-4 bg-white dark:bg-boxdark shadow-lg rounded-lg'
						style={{
							scrollbarWidth: 'none', // Firefox
							msOverflowStyle: 'none', // Internet Explorer and Edge
						}}
					>
						{/* Product Thumbnail */}
						<div className='flex justify-center mb-6'>
							<img
								src={info.product.thumbnail}
								alt={info.product.title}
								className='w-64 h-64 object-cover rounded-md shadow-md'
							/>
						</div>

						{/* Product Details */}
						<div className='space-y-4 text-sm text-black dark:text-white'>
							{/* Product Title */}
							<div>
								<h3 className='text-lg font-medium'>{info.product.title}</h3>
								<p className='text-gray-600 dark:text-gray-400'>ID: {info.product._id}</p>
							</div>

							{/* Creator Information */}
							<p className='text-gray-600 dark:text-gray-400'>Người bán </p>
							<div className='flex items-center space-x-4'>
								<img
									src={info.product.createdBy.avatar}
									alt={`${info.product.createdBy.firstName} ${info.product.createdBy.lastName}`}
									className='w-10 h-10 rounded-full shadow-md'
								/>
								<div>
									<p className='font-medium'>
										{info.product.createdBy.firstName} {info.product.createdBy.lastName}
									</p>
									<p className='text-gray-600 dark:text-gray-400'>{info.product.createdBy.email}</p>
									<p className='text-gray-600 dark:text-gray-400'>Số vi phạm: {info.guiltyReportsCount}</p>
									{info.guiltyReportsCount > 0 && !info.product.createdBy.deleted && (
										<button
											onClick={async (e) => {
												e.preventDefault();
												await axios.post(
													import.meta.env.VITE_HOST + `/api/admin/accounts/${info.product.createdBy._id}/suspend`
												);
												toast.success('Tài khoản đã bị khóa');
												setIsOpen(false);
												window.location.reload();
											}}
										>
											<FontAwesomeIcon icon={Icons.faBan}></FontAwesomeIcon> Khóa tài khoản này?
										</button>
									)}
								</div>
							</div>

							{/* Reporter Information */}
							<p className='text-gray-600 dark:text-gray-400'>Người báo cáo </p>
							<div className='flex items-center space-x-4'>
								<img
									src={info.account.avatar}
									alt={`${info.account.firstName} ${info.account.lastName}`}
									className='w-10 h-10 rounded-full shadow-md'
								/>
								<div>
									<p className='font-medium'>
										{info.account.firstName} {info.account.lastName}
									</p>
									<p className='text-gray-600 dark:text-gray-400'>{info.account.email}</p>
								</div>
							</div>

							{/* Additional Details */}
							<div>
								<p className='font-medium'>Lý do:</p>
								<p className='text-gray-600 dark:text-gray-400'>{info.reason}</p>
							</div>
							<div>
								<p className='font-medium'>Trạng thái:</p>
								<p className='text-gray-600 dark:text-gray-400 capitalize'>
									{((verdict) => {
										switch (verdict) {
											case 'pending':
												return 'Đang chờ xử lý';
											case 'innocent':
												return 'Không vi phạm';
											case 'guilty':
												return 'Phát hiện vi phạm';
											default:
												return 'Không xác định';
										}
									})(info.verdict)}
								</p>
							</div>

							{/* Timestamps */}
							<div>
								<p className='text-gray-600 dark:text-gray-400'>
									Ngày tạo:{' '}
									<span className='font-medium'>
										{new Date(info.createdAt).toLocaleDateString('vi-VN', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
									</span>
								</p>
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

const TableOne = ({ stupidString }) => {
	const location = useLocation();
	const navigate = useNavigate();
	const [reportsData, setReportsData] = useState([]);
	const [reload, setReload] = useState(false);
	const [page, setPage] = useState(1);
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		setPage(1);
	}, [location]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(import.meta.env.VITE_HOST + '/api/admin/reports/' + (stupidString || ''), {
				params: { page },
			});
			setReportsData(response.data.data);
		};

		fetchData();
	}, [page, reload, location]);

	useEffect;

	return (
		<div className='rounded-sm border border-stroke {bg-white} shadow-default dark:border-strokedark dark:bg-boxdark'>
			<Pagination currentPage={page} setCurrentPage={setPage}></Pagination>
			<div className='grid grid-cols-9 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5'>
				<div className='col-span-3 flex items-center'>
					<p className='font-medium'>Người báo cáo</p>
				</div>

				<div className='col-span-1 hidden items-center sm:flex'>
					<p className='font-medium'>Ngày tạo</p>
				</div>
				<div className='col-span-3 flex justify-center items-center'>
					<p className='font-medium'>Lý do</p>
				</div>
				<div className='col-span-1 flex items-center'>
					<p className='font-medium'>Hành động</p>
				</div>
			</div>

			{reportsData?.map((report, key) => (
				<Report report={report} key={key} reload={reload} setReload={setReload}></Report>
			))}
			<Pagination currentPage={page} setCurrentPage={setPage}></Pagination>
		</div>
	);
};

function Report({ report, reload, setReload }) {
	const [openModal, setOpenModal] = useState(false);

	return (
		<div
			className={
				'grid grid-cols-9 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 ' +
				(report.guiltyReportsCount > 0 ? 'bg-red-100 dark:bg-red-500' : '')
			}
		>
			<div className='col-span-3 flex flex-row items-center'>
				<div className='flex flex-col gap-4 sm:flex-col sm:items-center'>
					<div className='h-[80px] w-[80px]'>
						<img src={report.account.avatar} alt='Product' className='w-full h-full object-scale-down' />
					</div>
					<div className='flex flex-col'>
						<p className='text-sm text-black dark:text-white'>{report.account.email}</p>
					</div>
				</div>
			</div>

			<div className='col-span-1 hidden items-center sm:flex'>
				<p className='text-sm text-black dark:text-white'>
					{new Date(report?.createdAt).toLocaleDateString('vi-en', {
						year: 'numeric',
						month: 'long',
						day: 'numeric',
					})}
				</p>
			</div>

			<div className='flex flex-row items-center justify-center col-span-3 '>
				<button
					onClick={(e) => {
						e.preventDefault();
						setOpenModal(true);
					}}
					className='group relative'
				>
					<FontAwesomeIcon icon={Icons.faEye} size='2x' className='hover:brightness-125'></FontAwesomeIcon>
					<span className='w-20 absolute hidden group-hover:block text-sm text-white bg-gray-800 dark:bg-gray-700 px-2 py-1 rounded-md transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
						Xem chi tiết
					</span>
				</button>

				<Modal isOpen={openModal} setIsOpen={setOpenModal} info={report}></Modal>
			</div>
			<div className='col-span-1 flex items-center space-x-3'>
				<button
					onClick={async (e) => {
						e.preventDefault();
						await axios.post(import.meta.env.VITE_HOST + `/api/admin/reports/${report?._id}/guilty`);
						setReload(!reload);
					}}
					className='group relative'
				>
					{' '}
					<FontAwesomeIcon icon={Icons.faCheck} size='2x' className='hover:brightness-125'></FontAwesomeIcon>
					<span className='w-20 absolute hidden group-hover:block text-sm text-white bg-gray-800 dark:bg-gray-700 px-2 py-1 rounded-md transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
						Chấp nhận báo cáo
					</span>
				</button>
				<button
					onClick={async (e) => {
						e.preventDefault();
						await axios.post(import.meta.env.VITE_HOST + `/api/admin/reports/${report?._id}/innocent`);
						setReload(!reload);
					}}
					className='group relative'
				>
					{' '}
					<FontAwesomeIcon icon={Icons.faXmark} size='2x' className='hover:brightness-125'></FontAwesomeIcon>
					<span className='w-20 absolute hidden group-hover:block text-sm text-white bg-gray-800 dark:bg-gray-700 px-2 py-1 rounded-md transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
						Bỏ báo cáo
					</span>
				</button>
			</div>
		</div>
	);
}

export default TableOne;
