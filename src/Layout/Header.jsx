import { FaSearch } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { headerLinksLeft, headerLinksRight } from './constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { LoggedinContext } from '../App';

export default function Header() {
	const { loggedin, setLoggedin } = useContext(LoggedinContext);
	const navigate = useNavigate();
	const location = useLocation();
	const [searchInp, setSearchInp] = useState(new URLSearchParams(location.search).get('searchTerm'));

	return (
		<header className='bg-slate-300 shadow-md flex-col justify-around px-3 py-5 sticky top-0 z-50'>
			{/* navigation buttons */}
			<div className='max-w-[1220px] w-full mx-auto flex justify-between'>
				{/* left side buttons*/}
				<div className='flex space-x-4'>
					{headerLinksLeft.map((link) => (
						<Link to={link.link} key={link.name} onClick={() => window.scrollTo(0, 0)}>
							<div className='text-slate-700 hover:brightness-200 cursor-pointer flex items-center space-x-2'>
								{link.icon && <FontAwesomeIcon icon={Icons[link.icon]} />}
								<div>{link.name}</div>
							</div>
						</Link>
					))}
					{JSON.parse(localStorage.getItem('account'))?.role === 'Admin' && (
						<Link to={'/admin'} onClick={() => window.scrollTo(0, 0)}>
							<div className='text-slate-700 hover:brightness-200 cursor-pointer flex items-center space-x-2'>
								<FontAwesomeIcon icon={Icons.faUserTie} />
								<div>Admin</div>
							</div>
						</Link>
					)}
				</div>

				{/* right side buttons */}
				<div className='flex space-x-4 ml-auto'>
					{headerLinksRight
						.filter((link) => !link.login == !loggedin)
						.map((link) => (
							<Link to={link.link} key={link.name}>
								<div
									className='text-slate-700 hover:brightness-200 cursor-pointer flex items-center space-x-2'
									onClick={() => {
										window.scrollTo(0, 0);
										if (link.name == 'Đăng xuất') {
											setLoggedin(false);
											localStorage.removeItem('token');
											localStorage.removeItem('account');
											navigate('/');
										}
									}}
								>
									{link.icon && <FontAwesomeIcon icon={Icons[link.icon]} />}
									<div>{link.name}</div>
								</div>
							</Link>
						))}
				</div>
			</div>

			{/* logo, search bar */}
			<div className='max-w-[1220px] w-full mx-auto flex mt-5'>
				<Link to='/' className='h-9 mx-5' onClick={() => window.scrollTo(0, 0)}>
					<h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
						<img src={logo} alt='logo' className='h-auto w-auto' />
					</h1>
				</Link>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						window.scrollTo(0, 0);
						navigate('/search' + (searchInp ? '?searchTerm=' + searchInp : ''));
					}}
					className='bg-white p-3 rounded-md flex items-center w-full'
				>
					<input
						type='text'
						placeholder='Tìm kiếm sản phẩm'
						className='bg-transparent focus:outline-none w-full'
						value={searchInp}
						onChange={(e) => setSearchInp(e.target.value)}
					/>
					<button>
						<FaSearch className='text-slate-600' />
					</button>
				</form>

				<Link to='/cart' className='p-3 rounded-md flex items-center w-auto' onClick={() => window.scrollTo(0, 0)}>
					<FontAwesomeIcon icon={Icons.faShoppingCart} className='text-2xl text-slate-700 cursor-pointer' />
				</Link>

				<Link to='/order' className='p-3 rounded-md flex items-center w-auto' onClick={() => window.scrollTo(0, 0)}>
					<FontAwesomeIcon icon={Icons.faTruckFast} className='text-2xl text-slate-700 cursor-pointer' />
				</Link>
			</div>
		</header>
	);
}
