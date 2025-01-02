import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
import TableOne from '../../components/Tables/TableOne';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

const ECommerce: React.FC = () => {
	const [users, setUsers] = useState(0);
	const [products, setProducts] = useState(0);
	const [orders, setOrders] = useState(0);
	const [revenue, setRevenue] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				axios.get(import.meta.env.VITE_HOST + '/api/admin/accounts/count').then((res) => {
					setUsers(res.data.data);
				});
				axios.get(import.meta.env.VITE_HOST + '/api/admin/products/count').then((res) => {
					setProducts(res.data.data);
				});
				axios.get(import.meta.env.VITE_HOST + '/api/admin/orders/count').then((res) => {
					setOrders(res.data.data);
				});
				axios.get(import.meta.env.VITE_HOST + '/api/admin/orders/revenue').then((res) => {
					setRevenue(res.data.data);
				});
			} catch {}
		};

		fetchData();
	});

	return (
		<>
			<div className='mt-4 grid grid-cols-4 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
				<CardDataStats title='Tổng số người dùng' total={users}>
					<FontAwesomeIcon icon={Icons.faUserGroup} className='fill-primary dark:fill-white' />
				</CardDataStats>
				<CardDataStats title='Tổng số sản phẩm' total={products}>
					<FontAwesomeIcon icon={Icons.faBoxArchive} className='fill-primary dark:fill-white' />
				</CardDataStats>
				<CardDataStats title='Tổng số giao dịch' total={orders}>
					<FontAwesomeIcon icon={Icons.faMoneyCheckAlt} className='fill-primary dark:fill-white' />
				</CardDataStats>
				<CardDataStats
					title='Tổng số doanh thu'
					total={Number(revenue).toLocaleString('vi-VN', {
						style: 'currency',
						currency: 'VND',
					})}
				>
					<FontAwesomeIcon icon={Icons.faDollarSign} className='fill-primary dark:fill-white' />
				</CardDataStats>
			</div>

<<<<<<< Updated upstream
			<ChartOne />
=======
			<div className='my-6'>
				<ChartOne />
			</div>
>>>>>>> Stashed changes
		</>
	);
};

export default ECommerce;
