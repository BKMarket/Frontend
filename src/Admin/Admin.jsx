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
import TableOne from './components/Tables/TableOne';
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
<<<<<<< Updated upstream
					path='products'
=======
					path='products/all'
>>>>>>> Stashed changes
					element={
						<>
							<PageTitle title='Sản phẩm' />
							<TableTwo />
						</>
					}
				/>
				<Route
<<<<<<< Updated upstream
=======
					path='products/pending'
					element={
						<>
							<PageTitle title='Sản phẩm' />
							<TableTwo stupidString={'waiting'} />
						</>
					}
				/>
				<Route
>>>>>>> Stashed changes
					path='reports/all'
					element={
						<>
							<PageTitle title='Báo cáo' />
							<TableOne />
						</>
					}
				/>
				<Route
					path='reports/pending'
					element={
						<>
							<PageTitle title='Báo cáo' />
							<TableOne stupidString={'pending'} />
						</>
					}
				/>
				<Route
					path='reports/innocent'
					element={
						<>
							<PageTitle title='Báo cáo' />
							<TableOne stupidString={'innocent'} />
						</>
					}
				/>
				<Route
					path='reports/guilty'
					element={
						<>
							<PageTitle title='Báo cáo' />
							<TableOne stupidString={'guilty'} />
						</>
					}
				/>
				<Route
					path='users/banned'
					element={
						<>
							<PageTitle title='Người dùng' />
							<TableThree stupidString={'banned'} />
						</>
					}
				/>
				<Route
					path='users/all'
					element={
						<>
							<PageTitle title='Người dùng' />
							<TableThree />
						</>
					}
				/>
			</Routes>
		</DefaultLayout>
	);
}

export default App;
