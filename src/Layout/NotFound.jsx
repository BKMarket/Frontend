import { Link } from 'react-router-dom';

const NotFoundPage = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-transparent text-slate-800 p-6'>
			<h1 className='text-7xl font-extrabold'>404</h1>
			<h2 className='mt-4 text-2xl md:text-3xl font-semibold'>Không thể tìm thấy trang</h2>
			<p className='mt-2 text-center text-gray-600 max-w-md'>
				Có thể trang này đã được dời đi hoặc bị xóa bỏ. Hãy kiểm tra lại URL hoặc quay về trang chủ.
			</p>
			<Link
				to='/'
				className='mt-6 px-6 py-3 text-white bg-slate-800 rounded-md shadow hover:brightness-200 transition-all'
			>
				Về trang chủ
			</Link>
		</div>
	);
};

export default NotFoundPage;
