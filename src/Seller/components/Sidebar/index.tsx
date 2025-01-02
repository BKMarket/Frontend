import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

interface SidebarProps {
	sidebarOpen: boolean;
	setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
	const location = useLocation();
	const { pathname } = location;

	const trigger = useRef<any>(null);
	const sidebar = useRef<any>(null);

	const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
	const [sidebarExpanded, setSidebarExpanded] = useState(
		storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
	);

	// close on click outside
	useEffect(() => {
		const clickHandler = ({ target }: MouseEvent) => {
			if (!sidebar.current || !trigger.current) return;
			if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target)) return;
			setSidebarOpen(false);
		};
		document.addEventListener('click', clickHandler);
		return () => document.removeEventListener('click', clickHandler);
	});

	// close if the esc key is pressed
	useEffect(() => {
		const keyHandler = ({ keyCode }: KeyboardEvent) => {
			if (!sidebarOpen || keyCode !== 27) return;
			setSidebarOpen(false);
		};
		document.addEventListener('keydown', keyHandler);
		return () => document.removeEventListener('keydown', keyHandler);
	});

	useEffect(() => {
		localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
		if (sidebarExpanded) {
			document.querySelector('body')?.classList.add('sidebar-expanded');
		} else {
			document.querySelector('body')?.classList.remove('sidebar-expanded');
		}
	}, [sidebarExpanded]);

	return (
		<aside
			ref={sidebar}
			className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
				sidebarOpen ? 'translate-x-0' : '-translate-x-full'
			}`}
		>
			{/* <!-- SIDEBAR HEADER --> */}
			<div className='flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5'>
				<NavLink to='/'>
					<FontAwesomeIcon icon={Icons.faStore} size='3x' color='white' />
					<span className='mb-4 ml-4 text-lg font-semibold text-bodydark2'>BKMarket</span>
				</NavLink>

				<button
					ref={trigger}
					onClick={() => setSidebarOpen(!sidebarOpen)}
					aria-controls='sidebar'
					aria-expanded={sidebarOpen}
					className='block lg:hidden'
				>
					<svg
						className='fill-current'
						width='20'
						height='18'
						viewBox='0 0 20 18'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z'
							fill=''
						/>
					</svg>
				</button>
			</div>
			{/* <!-- SIDEBAR HEADER --> */}

			<div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
				{/* <!-- Sidebar Menu --> */}
				<nav className='mt-5 py-4 px-4 lg:mt-9 lg:px-6'>
					{/* <!-- Menu Group --> */}
					<div>
						<h3 className='mb-4 ml-4 text-sm font-semibold text-bodydark2'>MENU</h3>

						<ul className='mb-6 flex flex-col gap-1.5'>
							{/* <!-- Menu Item Dashboard --> */}
							<SidebarLinkGroup activeCondition={pathname === '/' || pathname.includes('dashboard')}>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<NavLink
												to='#'
												className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
													(pathname === '/' || pathname.includes('dashboard')) && 'bg-graydark dark:bg-meta-4'
												}`}
												onClick={(e) => {
													e.preventDefault();
													sidebarExpanded ? handleClick() : setSidebarExpanded(true);
												}}
											>
												<FontAwesomeIcon icon={Icons.faDashboard} />
												Trang chủ
												<FontAwesomeIcon icon={open ? Icons.faMinus : Icons.faPlus} className='ml-auto' />
											</NavLink>
											{/* <!-- Dropdown Menu Start --> */}
											<div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
												<ul className='mt-4 mb-5.5 flex flex-col gap-2.5 pl-6'>
													<li>
														<NavLink
															to=''
															className={({ isActive }) =>
																'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
																(isActive && '!text-white')
															}
														>
															eCommerce
														</NavLink>
													</li>
												</ul>
											</div>
											{/* <!-- Dropdown Menu End --> */}
										</React.Fragment>
									);
								}}
							</SidebarLinkGroup>
							{/* <!-- Menu Item Dashboard --> */}

							{/* <!-- Menu Item Forms --> */}
							<SidebarLinkGroup activeCondition={pathname === '/forms' || pathname.includes('forms')}>
								{(handleClick, open) => {
									return (
										<React.Fragment>
											<NavLink
												to='#'
												className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
													(pathname === '/forms' || pathname.includes('forms')) && 'bg-graydark dark:bg-meta-4'
												}`}
												onClick={(e) => {
													e.preventDefault();
													sidebarExpanded ? handleClick() : setSidebarExpanded(true);
												}}
											>
												<FontAwesomeIcon icon={Icons.faReceipt} />
												Quản lý đơn hàng
												<FontAwesomeIcon
													icon={open ? Icons.faMinus : Icons.faPlus}
													className='ml-auto'
												></FontAwesomeIcon>
											</NavLink>
											{/* <!-- Dropdown Menu Start --> */}
											<div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
												<ul className='mt-4 mb-5.5 flex flex-col gap-2.5 pl-6'>
<<<<<<< Updated upstream
													<li>
														<NavLink
															to='orders/all'
															className={({ isActive }) =>
																'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
																(isActive && '!text-white')
															}
														>
															Tất cả đơn hàng
														</NavLink>
													</li>
													<li>
														<NavLink
															to='orders/pending'
															className={({ isActive }) =>
																'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
																(isActive && '!text-white')
															}
														>
															Đơn hàng chờ xác nhận
														</NavLink>
													</li>
													<li>
														<NavLink
															to='orders/accepted'
															className={({ isActive }) =>
																'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
																(isActive && '!text-white')
															}
														>
															Đơn hàng đang chuẩn bị
														</NavLink>
													</li>
													<li>
														<NavLink
															to='orders/canceled'
															className={({ isActive }) =>
																'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
																(isActive && '!text-white')
															}
														>
															Đơn hàng bị hủy
														</NavLink>
													</li>
=======
													{[
														{ to: 'orders/all', name: 'Tất cả đơn hàng' },
														{
															to: 'orders/pending',
															name: 'Đơn hàng chờ xác nhận',
														},
														{
															to: 'orders/accepted',
															name: 'Đơn hàng đang chuẩn bị',
														},
														{
															to: 'orders/canceled',
															name: 'Đơn hàng bị hủy',
														},
														{
															to: 'orders/received',
															name: 'Đơn hàng đã giao',
														},
													].map((section, key) => (
														<li key={key}>
															<NavLink
																to={section.to}
																className={({ isActive }) =>
																	'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
																	(isActive && '!text-white')
																}
															>
																{section.name}
															</NavLink>
														</li>
													))}
>>>>>>> Stashed changes
												</ul>
											</div>
											{/* <!-- Dropdown Menu End --> */}
										</React.Fragment>
									);
								}}
							</SidebarLinkGroup>
							{/* <!-- Menu Item Forms --> */}

							{/* <!-- Menu Item Tables --> */}
							<li>
								<SidebarLinkGroup activeCondition={pathname === '/forms' || pathname.includes('forms')}>
									{(handleClick, open) => {
										return (
											<React.Fragment>
												<NavLink
													to='#'
													className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
														(pathname === '/forms' || pathname.includes('forms')) && 'bg-graydark dark:bg-meta-4'
													}`}
													onClick={(e) => {
														e.preventDefault();
														sidebarExpanded ? handleClick() : setSidebarExpanded(true);
													}}
												>
													<FontAwesomeIcon icon={Icons.faBagShopping} />
													Quản lý sản phẩm
													<FontAwesomeIcon
														icon={open ? Icons.faMinus : Icons.faPlus}
														className='ml-auto'
													></FontAwesomeIcon>
												</NavLink>
												{/* <!-- Dropdown Menu Start --> */}
												<div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
													<ul className='mt-4 mb-5.5 flex flex-col gap-2.5 pl-6'>
														{[
															{ name: 'Tât cả sản phẩm', to: 'products/all' },
															{ name: 'Sản phẩm vi phạm', to: 'products/violation' },
															{ name: 'Thêm sản phẩm', to: 'products/add' },
														].map((section) => {
															return (
																<li>
																	<NavLink
																		to={section.to}
																		className={({ isActive }) =>
																			'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
																			(isActive && '!text-white')
																		}
																	>
																		{section.name}
																	</NavLink>
																</li>
															);
														})}
													</ul>
												</div>
												{/* <!-- Dropdown Menu End --> */}
											</React.Fragment>
										);
									}}
								</SidebarLinkGroup>
							</li>
							{/* <!-- Menu Item Tables --> */}
						</ul>
					</div>

					{/* <!-- Others Group --> */}
				</nav>
				{/* <!-- Sidebar Menu --> */}
			</div>
		</aside>
	);
};

export default Sidebar;