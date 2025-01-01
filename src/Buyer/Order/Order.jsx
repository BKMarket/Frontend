import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

const Button = ({ children, variant = 'default', onClick }) => {
	const baseClasses = 'px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';
	const variantClasses =
		variant === 'outline'
			? 'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500'
			: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';

	return (
		<button className={`${baseClasses} ${variantClasses}`} onClick={onClick}>
			{children}
		</button>
	);
};

const OrderItem = ({ item, order }) => {
	const navigate = useNavigate();
	const [flag, setFlag] = useState(false);
	const [reportReason, setReportReason] = useState('');
	return (
		<div className='flex items-center py-2'>
			<button
				className='flex-shrink-0 w-16 h-16 mr-4'
				onClick={() => {
					navigate(`/listing/${item.product.slug}`);
				}}
			>
				<img src={item.product.thumbnail} alt={item.product.title} className='w-full h-full object-cover rounded-md' />
			</button>
			<div className='flex-grow'>
				<button
					className='text-sm font-semibold'
					onClick={() => {
						navigate(`/listing/${item.product.slug}`);
					}}
				>
					{item.product.title}
				</button>
				<p className='text-sm text-gray-500'>Số lượng: {item.quantity}</p>
				<p className='text-sm text-gray-500'>
					Trạng thái:{' '}
					{(() => {
						switch (item.stage) {
							case 'pending':
								return 'Đang chờ xử lý';

							case 'canceled':
								return 'Đã hủy';

							case 'accepted':
								return 'Người bán đã chấp nhận';

							case 'denied':
								return 'Người bán đã từ chối';

							case 'received':
								return 'Đã nhận hàng';

							default:
								// Default case when the value doesn't match any cases
								return 'Đang chờ xử lý';
						}
					})()}
				</p>
			</div>

			{item.stage === 'accepted' && (
				<Button
					variant='outline'
					onClick={async () => {
						const response = await axios.post(
							import.meta.env.VITE_HOST + `/api/order/${order._id}/received/${item.product._id}`
						);
						if (response.status === 200) {
							toast.success('Đã nhận được hàng');
							window.location.reload();
						}
					}}
				>
					Đã nhận được hàng
				</Button>
			)}

			<div className='text-sm font-medium mx-3'>
				{(item.price * item.quantity).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
			</div>
			<button
				onClick={() => {
					setFlag(true);
				}}
			>
				<FontAwesomeIcon icon={Icons.faFlag} size='lg' color='red' />
			</button>

			{flag && (
				<div className='fixed inset-0  flex items-center justify-center z-50'>
					<div className='bg-white rounded-lg border-2 shadow-lg w-1/3 p-6 space-y-3'>
						<h2 className='text-lg font-bold mb-4 '>Báo cáo sản phẩm {item.product.title}</h2>
						<img
							src={item.product.thumbnail}
							alt={item.product.title}
							className='w-[20vh] h-[20vh] object-contain rounded-md mx-auto'
						/>

						<h2 className='text-2xl font-semibold text-gray-800 mb-4'>Lý do báo cáo</h2>

						<div className='space-y-4'>
							<label htmlFor='reportReason' className='block text-gray-700 font-medium'>
								Mô tả lý do báo cáo:
							</label>
							<textarea
								id='reportReason'
								name='reportReason'
								rows='6'
								className='w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700'
								placeholder='Nhập lý do báo cáo ở đây...'
								value={reportReason}
								onChange={(e) => setReportReason(e.target.value)}
								required={true}
							></textarea>
						</div>

						<div className='flex justify-between'>
							<button
								className='btn btn-secondary bg-red-400 hover:bg-red-500 text-white rounded-md px-4 py-2'
								onClick={() => setFlag(false)}
							>
								Đóng
							</button>
							<button
								className='btn btn-primary bg-blue-400 hover:bg-blue-500 text-white rounded-md px-4 py-2'
								onClick={async () => {
									if (reportReason.trim() === '') {
										toast.error('Vui lòng nhập lý do báo cáo');
										return;
									}
									await axios.post(import.meta.env.VITE_HOST + `/api/order/${order._id}/report/${item.product._id}`, {
										orderID: order._id,
										reason: reportReason,
									});

									toast.success('Đã gửi báo cáo');
									setFlag(false);
									setReportReason('');
								}}
							>
								Gửi báo cáo
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

const Order = ({ order }) => {
	const [modalAppear, setModalAppear] = useState(false);
	const stageToStep = (stage) => {
		console.log(stage);
		switch (stage) {
			case 'pending':
				return 1;

			case 'canceled':
				return 1;

			case 'accepted':
				return 2;

			case 'denied':
				return 2;

			case 'received':
				return 3;

			default:
				// Default case when the value doesn't match any cases
				return 1;
		}
	};

	const [currentStep, setCurrentStep] = useState(order.products.map((product) => stageToStep(product.stage)));

	return (
		<div className={` rounded-lg shadow-md p-6 mb-4 ${order.completed ? 'bg-white' : 'bg-red-50'}`}>
			<div className='flex justify-between items-center'>
				<div className='flex justify-between items-center mb-4'>
					<div>
						<span className='text-sm text-gray-500'>Đơn hàng: {order._id}</span>
						{order.transactionID && <div className='text-sm text-gray-500'>Mã giao dịch: {order.transactionID}</div>}
					</div>
					<span className='text-sm text-gray-500'>{order.date}</span>
				</div>

				<div>
					<span className='text-sm text-gray-500 ml-au'>
						Ngày giao dịch:{' '}
						{new Date(order.createdAt).toLocaleDateString('vi-en', {
							weekday: 'long',
							year: 'numeric',
							month: 'long',
							day: 'numeric',
							hour: 'numeric',
							minute: 'numeric',
						})}
					</span>
					{!order.completed && <div className='text-md font-semibold text-red-500'>Đơn chưa thanh toán</div>}
				</div>
			</div>
			<div className='border-t border-gray-200 pt-4'>
				{order.products.map((item, index) => (
					<OrderItem key={index} item={item} order={order} />
				))}
			</div>
			<div className='border-t border-gray-200 pt-4 mt-4'>
				<div className='flex justify-between items-center font-medium'>
					<span>Tổng tiền</span>
					<span className='text-lg text-red-500'>
						{order.money.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
					</span>
				</div>
			</div>
			<div className='flex justify-end space-x-2 mt-4'>
				<Button variant='outline' className='bg-slate-600' onClick={() => setModalAppear(true)}>
					Theo dõi trạng thái đơn hàng
				</Button>
				{(order.products.every((item) => item.stage === 'pending') ||
					order.products.every((item) => item.stage === 'accepted')) && (
					<Button
						variant='outline'
						className='bg-slate-600'
						onClick={async () => {
							const response = await axios.post(import.meta.env.VITE_HOST + `/api/order/${order._id}/cancel`);
							if (response.status === 200) {
								toast.success('Đã hủy đơn hàng');
								window.location.reload();
							}
						}}
					>
						Hủy đơn hàng
					</Button>
				)}
				{modalAppear && (
					<div className='fixed inset-0  flex items-center justify-center z-50'>
						<div className='bg-white rounded-lg border-2 shadow-lg w-1/3 p-6 space-y-3'>
							<h2 className='text-lg font-bold mb-4 '>Lịch sử trạng thái</h2>

							<div
								className='overflow-y-scroll max-h-[50vh] space-y-3'
								style={{
									scrollbarWidth: 'none', // Firefox
									msOverflowStyle: 'none', // Internet Explorer and Edge
								}}
							>
								{order.products.map((item, index) => (
									<div
										className='w-full max-w-3xl mx-auto px-4 py-8 bg-gray-50 rounded-lg shadow-md space-y-3'
										key={index}
									>
										<div>{item.product.title}</div>
										<div className='relative'>
											{/* Progress Bar */}
											<div className='absolute top-1/2 left-0 w-full h-2 bg-gray-200 transform -translate-y-1/2 rounded-full'></div>
											<div
												className='absolute top-1/2 left-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500 transform -translate-y-1/2 rounded-full transition-all duration-500 ease-in-out'
												style={{ width: `${((currentStep[index] - 1) / (3 - 1)) * 100}%` }}
											></div>

											{/* Steps */}
											<div className='relative flex justify-between'>
												{[
													{ id: 1, name: 'Order Placed', icon: '📦' },
													{ id: 2, name: 'In Transit', icon: '🚚' },
													{ id: 3, name: 'Delivered', icon: '🏠' },
												].map((step) => (
													<div key={step.id} className='flex flex-col items-center'>
														<div
															className={`w-12 h-12 rounded-full ${
																step.id <= currentStep[index]
																	? 'bg-gradient-to-r from-blue-500 to-purple-500'
																	: 'bg-white border-2 border-gray-300'
															} flex items-center justify-center mb-2 transition-all duration-500 ease-in-out shadow-lg`}
														>
															<span className='text-xl' role='img' aria-label={step.name}>
																{step.icon}
															</span>
														</div>
													</div>
												))}
											</div>
										</div>
										{/* Logs */}
										<div className='space-y-6 '>
											{item.log.map((log, index) => (
												<div
													key={index}
													className='flex items-start justify-between space-x-4 p-4 bg-white border rounded-lg shadow-sm'
												>
													<div className='text-gray-500 font-medium'>
														{/* Date Field */}
														{new Date(log.time).toLocaleDateString('vi-en', {
															year: 'numeric',
															month: 'long',
															day: 'numeric',
															hour: 'numeric',
															minute: 'numeric',
														})}
													</div>
													<div className='flex-1'>
														{/* Description Field */}
														<p className='text-gray-800'>
															{((x) => {
																switch (x.stage) {
																	case 'pending':
																		return 'Đang chờ xử lý';

																	case 'canceled':
																		return 'Đã hủy';

																	case 'accepted':
																		return 'Người bán đã chấp nhận';

																	case 'denied':
																		return 'Người bán đã từ chối';

																	case 'received':
																		return 'Đã nhận hàng';

																	default:
																		// Default case when the value doesn't match any cases
																		return 'Đang chờ xử lý';
																}
															})(log)}
														</p>
													</div>
												</div>
											))}
										</div>
									</div>
								))}
							</div>
							<div className='flex justify-between'>
								<button
									className='btn btn-secondary bg-red-400 hover:bg-red-500 text-white rounded-md px-4 py-2'
									onClick={() => setModalAppear(false)}
								>
									Đóng
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const OrderHistoryPage = () => {
	const [orders, setOrders] = React.useState([]);

	React.useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(import.meta.env.VITE_HOST + '/api/order');

			setOrders(response.data.data);
		};

		fetchData();
	}, []);

	return (
		<div className='container mx-auto px-4 py-8 bg-base-200 min-h-screen'>
			<h1 className='text-2xl font-bold mb-6'>Theo dõi đơn hàng</h1>
			<div className='space-y-4'>
				{orders.map((order) => (
					<Order key={order.id} order={order} />
				))}
			</div>
		</div>
	);
};

export default OrderHistoryPage;
