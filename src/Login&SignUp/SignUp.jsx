import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoggedinContext } from '../App';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SignUp() {
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { loggedin, setLoggedin } = useContext(LoggedinContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (loggedin) navigate('/');
	}, [loggedin, navigate]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post(import.meta.env.VITE_HOST + '/api/auth/signup', formData, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const { token, account } = response.data;
			localStorage.setItem('token', token);
			localStorage.setItem('account', JSON.stringify(account));
			window.dispatchEvent(new Event('storage'));
			setLoggedin(true);
			setLoading(false);
			navigate('/');
		} catch (err) {
			console.log(err);
			setLoading(false);
			setError('Đăng kí thất bại');
			toast.error(err.response.data.message);
		}
	};

	return (
		<div className='p-3 max-w-lg mx-auto my-10 w-96'>
			<h1 className='text-3xl text-center font-semibold my-7 text-[#042b92]'>Đăng kí</h1>
			<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
				<input
					type='text'
					placeholder='Họ'
					className='border p-3 rounded-md'
					id='lastName'
					onChange={handleChange}
					required
				/>
				<input
					type='text'
					placeholder='Tên'
					className='border p-3 rounded-md'
					id='firstName'
					onChange={handleChange}
					required
				/>
				<input
					type='email'
					placeholder='Email (đuôi @hcmut.edu.vn)'
					className='border p-3 rounded-md'
					id='email'
					onChange={handleChange}
					required
				/>
				<input
					type='password'
					placeholder='Mật khẩu'
					className='border p-3 rounded-md'
					id='password'
					onChange={handleChange}
					required
				/>

				<button
					disabled={loading}
					className='bg-slate-700 text-white p-3 rounded-md uppercase hover:opacity-95 disabled:opacity-80'
				>
					{loading ? 'Loading...' : 'Đăng kí'}
				</button>
			</form>
			<div className='flex gap-2 mt-5'>
				<p>Đã có tài khoản?</p>
				<Link to={'/login'}>
					<span className='text-blue-700'>Đăng nhập ngay</span>
				</Link>
			</div>
			{error && <p className='text-red-500 mt-5'>{error}</p>}
		</div>
	);
}
