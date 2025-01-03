import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Cart() {
	const [cart, setCart] = useState([]);
	const [selected, setSelected] = useState([]);
	const [prodNum, setProdNum] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);
	const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState(null);

	const [deleteAllAllowed, setDeleteAllAllowed] = useState(false);

	useEffect(() => {
		if (selected.length === cart.length && cart.length) {
			setDeleteAllAllowed(true);
		} else {
			setDeleteAllAllowed(false);
		}
	}, [selected]);

	const deleteAll = () => {
		axios.post(import.meta.env.VITE_HOST + '/api/carts/delete', {
			productIds: selected.map((product) => product._id),
		});
		setCart([]);
		setSelected([]);
	};

	const incrementQuantity = (productId) => {
		axios.post(import.meta.env.VITE_HOST + '/api/carts/update', {
			productId,
			quantity: cart.find((product) => product.product === productId).quantity + 1,
		});
		setCart(
			cart.map((product) => (product.product === productId ? { ...product, quantity: product.quantity + 1 } : product))
		);
	};

	const decrementQuantity = (productId) => {
		const quantity = cart.find((product) => product.product === productId).quantity;

		axios.post(import.meta.env.VITE_HOST + '/api/carts/update', {
			productId,
			quantity: quantity - 1,
		});

		setCart(
			cart.map((product) =>
				product.product === productId && product.quantity >= 0 ? { ...product, quantity: quantity - 1 } : product
			)
		);

		if (quantity === 1) {
			toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
		}
	};

	const deleteFromCart = (productId) => {
		axios.post(import.meta.env.VITE_HOST + '/api/carts/delete', {
			productIds: [productId],
		});
		setCart(cart.filter((product) => product.product !== productId));
	};

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(import.meta.env.VITE_HOST + '/api/carts');

			setCart(response.data.data);
			setSelected(response.data.data.map((product) => product.product));
		};

		fetchData();
	}, []);

	useEffect(() => {
		const selectedId = selected.map((product) => product._id);

		setProdNum(selected.length);
		setTotalPrice(
			cart
				.filter((product) => selectedId.includes(product.product._id))
				.reduce((acc, product) => {
					return acc + (product.product.price * (100 - product.product.discountPercentage) * product.quantity) / 100;
				}, 0)
				.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
		);
	}, [selected, cart]);

	useEffect(() => {
		localStorage.setItem(
			'account',
			JSON.stringify({
				...JSON.parse(localStorage.getItem('account')),
				cart: cart.map((product) => {
					return { product: product.product._id, _id: product._id, quantity: product.quantity };
				}),
			})
		);
		window.dispatchEvent(new Event('storage'));
	}, [cart]);

	return (
		<div className='container mx-auto px-4 py-8 bg-base-200 min-h-screen'>
			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
				{/* <!-- Cart Section --> */}
				<div className='lg:col-span-2 bg-base-100 rounded-xl shadow-lg p-6'>
					<div className='flex justify-between items-center mb-6'>
						<h2 className='text-2xl font-bold text-base-content'>Giỏ hàng</h2>
						<div className='flex space-x-2'>
							{deleteAllAllowed && (
								<div className='flex items-center gap-2'>
									<button
										className='btn btn-primary btn-block text-white bg-slate-700 hover:bg-slate-800 rounded-md p-2'
										onClick={deleteAll}
									>
										Xóa tất cả
									</button>
								</div>
							)}
							<div className='flex items-center gap-2'>
								<input
									type='checkbox'
									className='checkbox checkbox-primary'
									checked={selected.length === cart.length}
									onChange={(e) => {
										if (e.target.checked) {
											setSelected(cart.map((product) => product.product));
											setDeleteAllAllowed(true);
										} else {
											setSelected([]);
											setDeleteAllAllowed(false);
										}
									}}
								/>
								<span className='text-base-content'>Chọn tất cả</span>
							</div>
						</div>
					</div>
					{/* <!-- Cart Item 1 --> */}
					{!cart?.every((product) => product.quantity == 0)
						? cart.map(
								(product) =>
									product.quantity > 0 && (
										<div
											className='cart-item flex items-center bg-base-200 p-4 rounded-lg mb-4 hover:shadow-md w-full'
											key={product.product._id}
										>
											<input
												type='checkbox'
												className='checkbox checkbox-primary mr-4 z-[49]'
												checked={selected.some((id) => id === product.product)}
												onChange={(e) => {
													if (e.target.checked) {
														setSelected([...selected, product.product]);
													} else {
														setSelected(selected.filter((id) => id !== product.product));
													}
												}}
											/>
											<button onClick={() => navigate(`/listing/${product.product.slug}`)}>
												<img
													src={product.product.thumbnail}
													alt='Product'
													className='w-20 h-20 object-cover rounded-lg mr-4'
												/>
											</button>

											<div className='flex-grow'>
												<h3 className='font-semibold text-base-content'>{product.product.title}</h3>
												<p className='text-primary font-bold'>
													{((product.product.price * (100 - product.product.discountPercentage)) / 100).toLocaleString(
														'vi-VN',
														{ style: 'currency', currency: 'VND' }
													)}
												</p>
											</div>
											<div className='flex items-center gap-3'>
												<button
													className='bg-red-500 text-white p-2 rounded-md'
													onClick={() => deleteFromCart(product.product)}
												>
													Xóa
												</button>
												<button
													className='btn btn-xs btn-circle btn-outline'
													onClick={() => decrementQuantity(product.product)}
												>
													-
												</button>
												<span className='text-base-content'>{product.quantity}</span>
												<button
													className='btn btn-xs btn-circle btn-outline'
													onClick={() => incrementQuantity(product.product)}
												>
													+
												</button>
											</div>
											{/* <button className='btn btn-ghost btn-square ml-4' onClick={() => removeProduct(product.product)}>
												<i className='fas fa-trash text-error'></i>
											</button> */}
										</div>
									)
						  )
						: 'Không có sản phẩm trong giỏ hàng'}
				</div>

				{/* <!-- Order Summary Section --> */}
				<div className='bg-base-100 rounded-xl shadow-lg p-6 h-fit'>
					<h2 className='text-2xl font-bold text-base-content mb-6'>Thông tin hóa đơn</h2>

					<div className='space-y-4'>
						<div className='divider'></div>
						<div className='flex justify-between'>
							<span className='text-xl font-bold text-base-content'>Tổng tiền</span>
							<span className='text-xl font-bold text-primary'>
								{totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
							</span>
							<span className='text-xl font-bold text-base-content'>Tổng số sản phẩm</span>
							<span className='text-xl font-bold text-primary'>{prodNum}</span>
						</div>
					</div>

					<div className='mt-6 space-y-4'>
						<button
							className='btn btn-primary btn-block text-white bg-slate-700 hover:bg-slate-800 rounded-md p-2'
							onClick={async () => {
								const response = await axios.get(import.meta.env.VITE_HOST + '/api/carts/checkout', {
									params: {
										productIds: selected.map((product) => product._id), // Pass productIds as query parameters
									},
								});

								setShowModal(true);
								setModalContent(
									response.data.data.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
								);
							}}
						>
							Thanh toán bằng VNPay
						</button>

						{/* Modal */}
						{showModal && (
							<div className='fixed inset-0  flex items-center justify-center z-50'>
								<div className='bg-white rounded-lg border-2 shadow-lg w-1/3 p-6'>
									<h2 className='text-lg font-bold mb-4'>Thông báo</h2>
									<p className='text-base mb-6'>Thanh toán số tiền {modalContent}</p>
									<div className='flex justify-between'>
										<button
											className='btn btn-primary  bg-gray-600 hover:bg-gray-700 text-white rounded-md px-4 py-2'
											onClick={async () => {
												toast.success('Đang chuyển đến trang thanh toán...');
												const { protocol, hostname, port } = window.location;
												const response = await axios.get(import.meta.env.VITE_HOST + '/api/order/purchase', {
													params: {
														money: Number(
															modalContent
																.replace(/[^\d,-]/g, '')
																.replace('.', '')
																.replace(',', '.')
														),
														returnUrl: `${protocol}//${hostname}${port ? `:${port}` : ''}/order`,
														products: selected.map((product) => ({
															product: product._id,
															quantity: cart.find((x) => x.product._id === product._id).quantity,
															price: (product.price * (100 - product.discountPercentage)) / 100,
														})),
													},
												});
												const payUrl = response.data.url;
												window.open(payUrl);

												await axios.post(import.meta.env.VITE_HOST + '/api/carts/delete', {
													productIds: selected.map((product) => product._id),
												});

												setCart(cart.filter((product) => !selected.includes(product.product)));
												setSelected([]);

												setShowModal(false);
											}}
										>
											Thanh toán
										</button>
										<button
											className='btn btn-secondary bg-red-400 hover:bg-red-500 text-white rounded-md px-4 py-2'
											onClick={() => setShowModal(false)}
										>
											Đóng
										</button>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
