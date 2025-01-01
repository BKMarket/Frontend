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
	const [totalOrders, setTotalOrders] = useState(0);
	const [totalProducts, setTotalProducts] = useState(0);
	useEffect(() => {
		const fetchData = async () => {
			const response = await axios.get(import.meta.env.VITE_HOST + '/api/seller/orders/my');
			setTotalOrders(response.data.data);

			const response2 = await axios.get(import.meta.env.VITE_HOST + '/api/seller/products/my');
			setTotalProducts(response2.data.data);
		};

		fetchData();
	}, []);

	return (
		<>
			{totalOrders && totalProducts && (
				<div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
					<CardDataStats
						title='Số đơn chờ xác nhận'
						total={totalOrders?.filter((x) => x.product.stage == 'pending').length}
					>
						<FontAwesomeIcon icon={Icons.faReceipt} className='fill-primary dark:fill-white' />
					</CardDataStats>
					<CardDataStats
						title='Số đơn đang xử lý'
						total={totalOrders?.filter((x) => x.product.stage == 'accepted').length}
					>
						<FontAwesomeIcon icon={Icons.faReceipt} className='fill-primary dark:fill-white' />
					</CardDataStats>
					<CardDataStats
						title='Số đơn đã xử lý'
						total={totalOrders?.filter((x) => x.product.stage == 'received').length}
					>
						<FontAwesomeIcon icon={Icons.faReceipt} className='fill-primary dark:fill-white' />
					</CardDataStats>
					<CardDataStats title='Số đơn bị hủy' total={totalOrders?.filter((x) => x.product.stage == 'canceled').length}>
						<FontAwesomeIcon icon={Icons.faReceipt} className='fill-primary dark:fill-white' />
					</CardDataStats>
					<CardDataStats
						title='Sản phẩm vi phạm'
						total={
							totalProducts?.filter((x) => x.deleted && x.deletedBy != JSON.parse(localStorage.getItem('account'))._id)
								.length
						}
					>
						<FontAwesomeIcon icon={Icons.faShopSlash} className='fill-primary dark:fill-white' />
					</CardDataStats>
					<CardDataStats title='Sản phẩm hết hàng' total={totalProducts?.filter((x) => x.stock == 0).length}>
						<FontAwesomeIcon icon={Icons.faExclamation} className='fill-primary dark:fill-white' />
					</CardDataStats>
				</div>
			)}
		</>
	);
};

export default ECommerce;
