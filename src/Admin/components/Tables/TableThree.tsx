import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

const Pagination = ({ currentPage, setCurrentPage, mail, setMail }) => {
	const [tmpMail, setTmpMail] = useState('');
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

			{/* Current Page */}
			<input
				className='w-16 text-center px-4 py-2 rounded-md border border-stroke dark:border-strokedark bg-white dark:bg-boxdark text-sm text-black dark:text-white shadow-default'
				value={tmpMail}
				defaultValue={'Nhập mail'}
				onChange={(e) => setTmpMail(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						setMail(tmpMail);
					}
				}}
			/>
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
						<h2 className='text-lg font-medium text-black dark:text-white'>Thông tin người dùng</h2>
					</div>

					{/* Modal Content */}
					<div
						className='max-h-[50vh] overflow-y-auto p-4 bg-white dark:bg-boxdark shadow-lg rounded-lg'
						style={{
							scrollbarWidth: 'none', // Firefox
							msOverflowStyle: 'none', // Internet Explorer and Edge
						}}
					>
						{/* User Details */}
						<div className='space-y-4 text-sm text-black dark:text-white'>
							{/* Avatar and Name */}
							<div className='flex justify-center items-center space-x-4'>
								<img
									src={info.avatar}
									alt={`${info.firstName} ${info.lastName}`}
									className='w-10 h-10 rounded-full shadow-md'
								/>
								<div>
									<p className='font-medium'>{`${info.firstName} ${info.lastName}`}</p>
									<p className='text-gray-600 dark:text-gray-400'>{info.email}</p>
								</div>
							</div>

							{/* Phone */}
							<div>
								<p className='text-gray-600 dark:text-gray-400'>
									Số điện thoại: <span className='font-medium'>{info.phone}</span>
								</p>
							</div>

							{/* Role and Status */}

							<div>
								<p className='text-gray-600 dark:text-gray-400'>
									Vai trò: <span className='font-medium'>{info.role}</span>
								</p>
							</div>
							<div>
								<p className='text-gray-600 dark:text-gray-400'>
									Trạng thái:
									<span className='font-medium'>
										{info.deleted ? ' Đã bị khóa' : info.status === 'Active' ? ' Đang hoạt động' : ' Đã dừng dịch vụ'}
									</span>
								</p>
							</div>

							{/* Deleted Date */}
							{info.deleted && (
								<div>
									<p className='text-gray-600 dark:text-gray-400'>
										Ngày khóa:{' '}
										<span className='font-medium'>
											{new Date(info.deletedAt).toLocaleDateString('vi-VN', {
												year: 'numeric',
												month: 'long',
												day: 'numeric',
											})}
										</span>
									</p>
								</div>
							)}
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
	const [accountData, setAccountData] = useState([]);
	const [reload, setReload] = useState(false);
	const [page, setPage] = useState(1);
	const [openModal, setOpenModal] = useState(false);
	const [mail, setMail] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(import.meta.env.VITE_HOST + '/api/admin/accounts/', {
				params: {
					page,
					email: mail,
					deleted: '',
					...((stupidString && {
						deleted: true,
						deletedAtSort: 'asc',
					}) || {
						lastNameSort: 'asc',
					}),
				},
			});
			setAccountData(response.data.data);
		};

		fetchData();
	}, [page, reload, location, mail]);

	useEffect(() => {
		setMail('');
		setPage(1);
	}, [location]);

	return (
		<div className='rounded-sm border border-stroke {bg-white} shadow-default dark:border-strokedark dark:bg-boxdark'>
			<Pagination currentPage={page} setCurrentPage={setPage} mail={mail} setMail={setMail}></Pagination>
			<div className='grid grid-cols-9 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5'>
				<div className='col-span-3 flex items-center'>
					<p className='font-medium'>Email</p>
				</div>

				<div className='col-span-1 hidden items-center sm:flex'>
					<p className='font-medium'>Trạng thái</p>
				</div>
				<div className='col-span-3 flex justify-center items-center'>
					<p className='font-medium'>Thông tin</p>
				</div>
				<div className='col-span-1 flex items-center'>
					<p className='font-medium'>Hành động</p>
				</div>
			</div>

			{accountData?.map((account, key) => (
				<Account account={account} key={key} reload={reload} setReload={setReload}></Account>
			))}
			<Pagination currentPage={page} setCurrentPage={setPage} mail={mail} setMail={setMail}></Pagination>
		</div>
	);
};

function Account({ account, reload, setReload }) {
	const [openModal, setOpenModal] = useState(false);

	return (
		<div
			className={
				'grid grid-cols-9 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5 '
			}
		>
			<div className='col-span-3 flex flex-row items-center'>
				<div className='flex flex-col gap-4'>
					<div className='h-[80px] w-[80px]'>
						<img src={account.avatar} alt='Product' className='w-full h-full object-scale-down' />
					</div>
					<p className='text-sm text-black dark:text-white'>{account.email}</p>
				</div>
			</div>

			<div className='col-span-1 hidden items-center sm:flex'>
				<p className='text-sm text-black dark:text-white'>
					{account?.deleted
						? 'Bị khóa ' +
						  new Date(account?.deletedAt).toLocaleDateString('vi-en', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
								weekday: 'long',
								hour: 'numeric',
								minute: 'numeric',
						  })
						: 'Đang hoạt động'}
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

				<Modal isOpen={openModal} setIsOpen={setOpenModal} info={account}></Modal>
			</div>
			<div className='col-span-1 flex items-center space-x-3'>
				{account.deleted ? (
					<button
						onClick={async (e) => {
							e.preventDefault();
							await axios.post(import.meta.env.VITE_HOST + `/api/admin/accounts/${account._id}/unsuspend`);
							setReload(!reload);
						}}
						className='group relative'
					>
						{' '}
						<FontAwesomeIcon icon={Icons.faLockOpen} size='2x' className='hover:brightness-125'></FontAwesomeIcon>
						<span className='w-20 absolute hidden group-hover:block text-sm text-white bg-gray-800 dark:bg-gray-700 px-2 py-1 rounded-md transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
							Mở khóa tài khoản
						</span>
					</button>
				) : (
					<button
						onClick={async (e) => {
							e.preventDefault();
							await axios.post(import.meta.env.VITE_HOST + `/api/admin/accounts/${account._id}/suspend`);
							setReload(!reload);
						}}
						className='group relative'
					>
						{' '}
						<FontAwesomeIcon icon={Icons.faLock} size='2x' className='hover:brightness-125'></FontAwesomeIcon>
						<span className='w-20 absolute hidden group-hover:block text-sm text-white bg-gray-800 dark:bg-gray-700 px-2 py-1 rounded-md transform translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
							Khóa tài khoản
						</span>
					</button>
				)}
			</div>
		</div>
	);
}

export default TableOne;
