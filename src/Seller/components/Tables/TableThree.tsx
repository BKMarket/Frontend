import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

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

const TableThree = ({ stupidString }) => {
	const [orders, setOrders] = useState([]);
	const location = useLocation();
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(import.meta.env.VITE_HOST + '/api/seller/orders/' + stupidString, {
				params: { page: currentPage },
			});
			setOrders(response.data.data);
		};

		fetchData();
	}, [location, currentPage]);

	useEffect(() => {
		setCurrentPage(1);
	}, [location]);

	return (
		<div className='rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1'>
			<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage}></Pagination>
			<div className='max-w-full overflow-x-auto'>
				<table className='w-full table-auto'>
					<thead>
						<tr className='bg-gray-2 text-left dark:bg-meta-4'>
							<th className='w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11'>Mã đơn hàng</th>
							<th className='w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11'>Tên sản phẩm</th>
							<th className='w-[200px] py-4 px-4 font-medium text-black dark:text-white'>Thông tin đơn hàng</th>
							<th className='w-[150px] py-4 px-4 font-medium text-black dark:text-white'>Ngày đặt hàng</th>
							<th className='w-[120px] py-4 px-4 font-medium text-black dark:text-white'>Trạng thái</th>
							<th className='w-[150px] py-4 px-4 font-medium text-black dark:text-white'>Hoạt động</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order, key) => (
							<tr key={key}>
								<td className='w-[220px] border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11'>
									<h5 className='text-sm truncate'>{order._id}</h5>
									<p className='text-sm truncate'>
										Thành tiền:{' '}
										{(Number(order.product.price) * Number(order.product.quantity)).toLocaleString('vi-VN', {
											style: 'currency',
											currency: 'VND',
										})}
									</p>
								</td>
								<td className='w-[220px] border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11'>
									<h5 className='font-medium text-black dark:text-white truncate'>{order.product.title}</h5>
									<p className='text-sm truncate'>Số lượng: {order.product.quantity}</p>
								</td>
								<td className='w-[200px] border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
									<p className='text-sm truncate'>Tên: {order.account.firstName + ' ' + order.account.lastName}</p>
									<p className='text-sm truncate'>Email: {order.account.email}</p>
									<p className='text-sm truncate'>Số điện thoại: {order.account.phone}</p>
								</td>
								<td className='w-[150px] border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
									<p className='text-black dark:text-white truncate'>
										{new Date(order.createdAt).toLocaleDateString('vi-en')}
									</p>
								</td>
								<td className='w-[120px] border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
									<p
										className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium truncate ${
											order.product.stage === 'received'
												? 'bg-success text-success'
												: order.product.stage === 'canceled' || order.product.stage === 'denied'
												? 'bg-danger text-danger'
												: 'bg-warning text-warning'
										}`}
									>
										{((stage) => {
											switch (stage) {
												case 'received':
													return 'Đã nhận';
												case 'canceled':
													return 'Đã hủy';
												case 'accepted':
													return 'Đồng ý';
												case 'denied':
													return 'Từ chối';
												case 'pending':
													return 'Đang chờ';
												default:
													return 'Đang chờ';
											}
										})(order.product.stage)}
									</p>
								</td>
								<td className='w-[150px] border-b border-[#eee] py-5 px-4 dark:border-strokedark'>
									<div className='flex items-center space-x-3.5'>
										{order.product.stage === 'pending' && (
											<div className='flex items-center space-x-3.5'>
												<button>
													<FontAwesomeIcon
														icon={Icons.faUserSlash}
														className='hover:text-red-500 transition-colors duration-300'
														onClick={async (e) => {
															e.preventDefault();
															const response = await axios.post(
																import.meta.env.VITE_HOST +
																	'/api/seller/orders/' +
																	order._id +
																	'/deny/' +
																	order.product._id
															);
															window.location.reload();
														}}
													/>
												</button>
												<button>
													<FontAwesomeIcon
														icon={Icons.faCheckSquare}
														className='hover:text-green-500 transition-colors duration-300'
														onClick={async (e) => {
															e.preventDefault();
															const response = await axios.post(
																import.meta.env.VITE_HOST +
																	'/api/seller/orders/' +
																	order._id +
																	'/accept/' +
																	order.product._id
															);
															window.location.reload();
														}}
													/>
												</button>
											</div>
										)}
										{order.product.stage === 'received' && (
											<button>
												<FontAwesomeIcon
													icon={Icons.faUpload}
													className='hover:text-blue-500 transition-colors duration-300'
												/>
											</button>
										)}
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default TableThree;
