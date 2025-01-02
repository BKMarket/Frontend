import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';

import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ECommerce from './pages/Dashboard/ECommerce';
import CreateProduct from './pages/Form/CreateProduct';
import UpdateProduct from './pages/Form/UpdateProduct';
import TableThree from './components/Tables/TableThree';
import TableTwo from './components/Tables/ProductTable';
import DefaultLayout from './layout/DefaultLayout';

function App() {
	const [loading, setLoading] = useState(true);
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	useEffect(() => {
		setTimeout(() => setLoading(false), 1000);
	}, []);

	return loading ? (
		<Loader />
	) : (
		<DefaultLayout>
			<Routes>
				<Route
					index
					element={
						<>
							<PageTitle title='Trang người bán' />
							<ECommerce />
						</>
					}
				/>
				<Route
					path='/products/add'
					element={
						<>
							<PageTitle title='Thêm sản phẩm' />
							<CreateProduct />
						</>
					}
				/>
				<Route
					path='/products/update/:slug'
					element={
						<>
							<PageTitle title='Cập nhật sản phẩm' />
							<UpdateProduct />
						</>
					}
				/>
				<Route
					path='/products/all'
					element={
						<>
							<PageTitle title='Sản phẩm của tôi' />
							<TableTwo stupidString='my' />
						</>
					}
					key={location.pathname}
				/>
				<Route
					path='/products/violation'
					element={
						<>
							<PageTitle title='Sản phẩm vi phạm' />
							<TableTwo stupidString='banned' />
						</>
					}
					key={location.pathname}
				/>
				<Route
					path='/orders/all'
					element={
						<>
							<PageTitle title='Đơn hàng' />
							<TableThree stupidString='my' />
						</>
					}
					key={location.pathname}
				/>
				<Route
					path='/orders/pending'
					element={
						<>
							<PageTitle title='Đơn hàng chờ xác nhận' />
							<TableThree stupidString='pending' />
						</>
					}
					key={location.pathname}
				/>
				<Route
					path='/orders/accepted'
					element={
						<>
							<PageTitle title='Đơn hàng đang chuẩn bị' />
							<TableThree stupidString='accepted' />
						</>
					}
					key={location.pathname}
				/>
				<Route
					path='/orders/canceled'
					element={
						<>
							<PageTitle title='Đơn hàng bị hủy' />
							<TableThree stupidString='canceled' />
						</>
					}
					key={location.pathname}
				/>
				<Route
					path='/orders/received'
					element={
						<>
							<PageTitle title='Đơn hàng đã giao' />
							<TableThree stupidString='received' />
						</>
					}
					key={location.pathname}
				/>
			</Routes>
		</DefaultLayout>
	);
}

export default App;
