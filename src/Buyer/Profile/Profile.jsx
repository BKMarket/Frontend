import axios from 'axios';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { LoggedinContext } from '../../App';

const Profile = () => {
	const { setLoggedin } = useContext(LoggedinContext);
	const [user, setUser] = useState(JSON.parse(localStorage.getItem('account')) || '');
	const [tmpUser, setTmpUser] = useState({ ...user });
	const [showModal, setShowModal] = useState(false);

	const handleFileChange = async (e) => {
		const imgAPIkey = import.meta.env.VITE_IMGBB_API;

		const img = e.target.files[0];
		console.log(img);

		const url = (
			await axios.post(
				'https://api.imgbb.com/1/upload',
				(() => {
					const formData = new FormData();
					formData.append('image', img);
					formData.set('key', imgAPIkey);
					return formData;
				})()
			)
		).data.data.url;

		setTmpUser({ ...tmpUser, avatar: url });
	};

	return (
		<div className='container mx-auto p-6'>
			<div className='max-w-4xl mx-auto bg-white shadow-lg rounded-md p-8'>
				<div className='flex flex-col md:flex-row items-center space-x-6'>
					{/* Avatar Section */}
					<button className='flex-shrink-0' onClick={() => document.getElementById('file-input').click()}>
						<img
							src={tmpUser.avatar}
							alt='User Avatar'
							className='w-32 h-32 rounded-full border-2 border-gray-300 hover:brightness-75'
						/>
						<input
							id='file-input'
							type='file'
							accept='image/*'
							className='hidden'
							onChange={(e) => handleFileChange(e)}
						/>
					</button>

					{/* User Info Section */}
					<div className='flex-1'>
						<h1 className='text-3xl font-semibold text-gray-800'>
							{tmpUser.firstName} {tmpUser.lastName}
						</h1>
					</div>
				</div>

				{/* Edit Info Section */}
				<div className='mt-8'>
					<h2 className='text-xl font-medium text-gray-800'>Hồ sơ của tôi</h2>
					<form className='space-y-6 mt-4'>
						<div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
							<div>
								<label htmlFor='firstName' className='block text-gray-700'>
									Tên
								</label>
								<input
									id='firstName'
									type='text'
									value={tmpUser.firstName}
									onChange={(e) => setTmpUser({ ...tmpUser, firstName: e.target.value })}
									className='mt-1 p-2 border rounded w-full'
								/>
							</div>
							<div>
								<label htmlFor='lastName' className='block text-gray-700'>
									Họ
								</label>
								<input
									id='lastName'
									type='text'
									value={tmpUser.lastName}
									onChange={(e) => setTmpUser({ ...tmpUser, lastName: e.target.value })}
									className='mt-1 p-2 border rounded w-full'
								/>
							</div>
						</div>
						<div>
							<label htmlFor='email' className='block text-gray-700'>
								Email
							</label>
							<input
								id='email'
								type='email'
								value={tmpUser.email}
								onChange={(e) => setTmpUser({ ...tmpUser, email: e.target.value })}
								className='mt-1 p-2 border rounded w-full'
								disabled
							/>
						</div>
						<div>
							<label htmlFor='phone' className='block text-gray-700'>
								Số điện thoại
							</label>
							<input
								id='phone'
								type='text'
								value={tmpUser.phone}
								onChange={(e) => setTmpUser({ ...tmpUser, phone: e.target.value })}
								className='mt-1 p-2 border rounded w-full'
							/>
						</div>
						<div className='flex space-x-4'>
							<button
								type='submit'
								className='mt-4 py-2 px-4 bg-slate-700 text-white rounded hover:shadow-2xl'
								onClick={async (e) => {
									e.preventDefault();
									try {
										const response = await axios.put(import.meta.env.VITE_HOST + '/api/profile/update', tmpUser);
										setUser(tmpUser);
										localStorage.setItem('account', JSON.stringify(response.data.account));

										window.dispatchEvent(new Event('storage'));
										toast.success('Cập nhật thông tin thành công');
									} catch (err) {
										console.log(err);
										toast.error('Đã xảy ra lỗi, vui lòng thử lại sau');
									}
								}}
							>
								Lưu thay đổi
							</button>
							<button
								type='delete'
								className='mt-4 py-2 px-4 bg-red-500 text-white rounded hover:shadow-2xl'
								onClick={(e) => {
									e.preventDefault(), setShowModal(true);
								}}
							>
								Xóa tài khoản
							</button>
							<button
								type='button'
								className='mt-4 py-2 px-4 bg-slate-300 text-gray-700 rounded hover:shadow-2xl'
								onClick={() => setTmpUser({ ...user })}
							>
								Thoát
							</button>

							{/* Modal */}
							{showModal && (
								<div className='fixed inset-0  flex items-center justify-center z-50'>
									<div className='bg-white rounded-lg border-2 shadow-lg w-1/3 p-6'>
										<h2 className='text-lg font-bold mb-4'>Thông báo</h2>
										<p className='text-base mb-6'>Bạn chắc chắn muốn xóa tài khoản?</p>
										<div className='flex justify-between'>
											<button
												className='btn btn-primary  bg-gray-600 hover:bg-gray-700 text-white rounded-md px-4 py-2'
												onClick={async (e) => {
													e.preventDefault();
													try {
														await axios.delete(import.meta.env.VITE_HOST + '/api/profile/delete');
														localStorage.removeItem('account');
														localStorage.removeItem('token');
														setLoggedin(false);
													} catch (err) {
														console.log(err);
														toast.error('Đã xảy ra lỗi, vui lòng thử lại sau');
													}
												}}
											>
												Đồng ý
											</button>
											<button
												className='btn btn-secondary bg-red-400 hover:bg-red-500 text-white rounded-md px-4 py-2'
												onClick={() => setShowModal(false)}
											>
												Hủy
											</button>
										</div>
									</div>
								</div>
							)}
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Profile;
