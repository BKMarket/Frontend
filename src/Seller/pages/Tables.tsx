import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import TableThree from '../components/Tables/TableThree';
import ProductTable from '../components/Tables/ProductTable';

const Tables = ({ stupidString }) => {
	return (
		<>
			<Breadcrumb pageName='Tất cả sản phẩm' />

			<div className='flex flex-col gap-10'>
				{/* Bỏ bên thống kê */}
				{/* <TableOne /> */}

				<ProductTable stupidString={stupidString} />

				{/* Đơn hàng */}
				{/* <TableThree /> */}
			</div>
		</>
	);
};

export default Tables;
