import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoggedinContext } from '../App';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Login() {
	const [formData, setFormData] = useState({});
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
		try {
			const response = await axios.post(import.meta.env.VITE_HOST + '/api/auth/login', formData, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const { token, account } = response.data;
			localStorage.setItem('token', token);
			localStorage.setItem('account', JSON.stringify(account));

			window.dispatchEvent(new Event('storage'));
			setLoggedin(true);
			navigate('/');
		} catch (err) {
			console.log(err);
			toast.error('Đăng nhập thất bại');
		}
	};

	return (
		<div className='my-10'>
			<div className='p-3 max-w-lg mx-auto w-96 '>
				<h1 className='text-3xl text-center font-semibold my-7 text-[#042b92]	'>Đăng nhập</h1>
				<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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

					<button className='bg-slate-700 text-white p-3 rounded-md uppercase hover:opacity-95 disabled:opacity-80'>
						{'Đăng nhập'}
					</button>
				</form>
				<div className='flex gap-2 mt-5'>
					<p>Chưa có tài khoản?</p>
					<Link to={'/signup'}>
						<span className='text-blue-700'>Đăng kí ngay</span>
					</Link>
				</div>
			</div>
		</div>
	);
}
