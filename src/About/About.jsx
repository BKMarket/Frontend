export default function About() {
	return (
		<div className='py-20 px-4 max-w-6xl mx-auto'>
			<h1 className='text-4xl font-semibold mb-6 text-slate-900 text-center'>Về chúng tôi</h1>
			<p className='mb-6 text-lg text-slate-700 leading-relaxed'>
				Hiện nay, trong thời kì công nghệ kĩ thuật số đang phát triển như vũ bão, một xu hướng khác đang được hình thành
				đó chính là thói quen tiêu dùng nhanh. Với sự phát triển của công nghệ và mạng xã hội, việc mua sắm trực tuyến
				trở nên dễ dàng và tiện lợi hơn bao giờ hết. Nhiều bạn trẻ thường xuyên mua sắm qua các ứng dụng di động và
				trang web thương mại điện tử, tận dụng các chương trình khuyến mãi và giảm giá. Cũng từ đó giới trẻ hình thành
				nên những thói quen xấu như sử dụng sản phẩm chỉ dùng hai đến ba lần đã phải bỏ đi khi chưa tới giới hạn hay kết
				thúc vòng đời sản phẩm, dẫn đến một số vấn đề như tiêu dùng không kiểm soát, lãng phí tài nguyên và ảnh hưởng
				đến môi trường. Đối với riêng trường đại học Bách Khoa thành phố Hồ Chí Minh, nhóm thực hiện đề tài nhận thấy
				mỗi học kì trôi qua, lại có hàng trăm quyển sách, hàng nghìn bộ tài liệu, linh kiện đồ án làm xong và bị bỏ đi
				vô cùng lãng phí.
			</p>
			<p className='mb-6 text-lg text-slate-700 leading-relaxed'>
				Do đó nhằm kết nối người bán với người mua, nhóm chúng em xây dựng hệ thống website BKMarket, một nền tảng
				thương mại điện tử được xây dựng riêng cho cộng đồng sinh viên Đại học Bách khoa thành phố Hồ Chí Minh. Hệ thống
				này cho phép sinh viên dễ dàng mua bán các sản phẩm, dịch vụ, tài liệu học tập,... một cách nhanh chóng và thuận
				tiện. Uy tín với độ xác thực cao với hy vọng giải quyết được một phần vấn đề đã nêu ở trên.
			</p>

			<div className='mt-10'>
				<p className='text-2xl font-semibold text-slate-800 mb-4'>Các thành viên</p>
				<ul className='space-y-4'>
					{[
						'Nguyễn Hải Đăng - 2210736',
						'Lưu Chí Lập - 2211830',
						'Mã Hoàng Linh - 2211853',
						'Nguyễn Quang Minh - 2111753',
						'Trần Minh Quân - 2212822',
					].map((member, index) => (
						<li key={index} className='flex items-center space-x-4'>
							<div className='w-12 h-12 bg-slate-300 rounded-full flex items-center justify-center'>
								<span className='text-white font-bold text-xl'>{index + 1}</span>
							</div>
							<span className='text-lg text-slate-700'>{member}</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
