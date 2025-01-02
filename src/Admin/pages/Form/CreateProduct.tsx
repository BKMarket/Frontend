import React from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreateProduct = () => {
	const [name, setName] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [price, setPrice] = React.useState(5000);
	const [stock, setStock] = React.useState(0);
	const [tags, setTags] = React.useState([]);
	const [thumbnail, setThumbnail] = React.useState(null);
	const [images, setImages] = React.useState([]);

	const handleAddTag = (event) => {
		if (event.key === 'Enter' && event.target.value) {
			event.preventDefault();
			setTags([...tags, event.target.value]);
			event.target.value = '';
		}
	};

	const handleRemoveTag = (index) => {
		setTags(tags.filter((_, i) => i !== index));
	};

	const handleImageUpload = (event) => {
		const files = Array.from(event.target.files);
		setImages((prevImages) => [...prevImages, ...files]);
	};

	const handleRemoveImage = (index) => {
		setImages(images.filter((_, i) => i !== index));
	};

	return (
		<>
			<Breadcrumb pageName='Thêm sản phẩm' />

			<div className='p-6 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
				<form className='space-y-6'>
					{/* Name */}
					<div>
						<label className='block mb-2 text-black dark:text-white'>Tên sản phẩm</label>
						<input
							type='text'
							placeholder='Nhập tên sản phẩm'
							value={name}
							onChange={(e) => setName(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
							className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white'
						/>
					</div>

					{/* Tags */}
					<div>
						<label className='block mb-2 text-black dark:text-white'>Tag</label>
						<div className='flex flex-wrap items-center gap-2'>
							{tags.map((tag, index) => (
								<span
									key={index}
									className='flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full dark:bg-boxdark text-black dark:text-white'
								>
									{tag}
									<button type='button' onClick={() => handleRemoveTag(index)} className='text-red-500'>
										×
									</button>
								</span>
							))}
							<input
								type='text'
								onKeyDown={handleAddTag}
								placeholder='Nhập tag và ấn Enter'
								className='flex-1 border-none outline-none bg-transparent'
							/>
						</div>
					</div>

					{/* Description */}
					<div>
						<label className='block mb-2 text-black dark:text-white'>Mô tả</label>
						<textarea
							rows={4}
							placeholder='Nhập mô tả sản phẩm'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white'
						></textarea>
					</div>

					{/* Price */}
					<div>
						<label className='block mb-2 text-black dark:text-white'>Giá</label>
						<input
							type='number'
							placeholder='Nhập giá sản phẩm'
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
							className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white'
						/>
					</div>

					{/* Stock */}
					<div>
						<label className='block mb-2 text-black dark:text-white'>Sản phẩm trong kho</label>
						<input
							type='number'
							placeholder='Enter stock quantity'
							value={stock}
							onChange={(e) => setStock(e.target.value)}
							onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
							className='w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white'
						/>
					</div>

					{/* Thumbnail */}
					<div>
						<label className='block mb-2 text-black dark:text-white'>Ảnh sản phẩm</label>
						<input
							type='file'
							accept='image/*'
							onChange={(event) => setThumbnail(event.target.files[0])}
							className='w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary'
						/>
						{thumbnail && (
							<div className='relative flex justify-center items-center my-5'>
								<img src={URL.createObjectURL(thumbnail)} alt='' className='w-[50%] h-auto object-contain rounded-lg' />
								<button
									type='button'
									onClick={() => setThumbnail(null)}
									className='absolute top-2 right-2 rounded-full p-1 shadow-md'
								>
									×
								</button>
							</div>
						)}
					</div>

					{/* Additional Images */}
					<div>
						<label className='block mb-2 text-black dark:text-white'>Các ảnh khác</label>
						<input
							type='file'
							accept='image/*'
							multiple
							onChange={handleImageUpload}
							className='w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary'
						/>
						<div className='mt-3 grid grid-cols-3 gap-3'>
							{images.map((image, index) => (
								<div key={index} className='relative'>
									<img src={URL.createObjectURL(image)} alt='' className='w-full h-auto object-contain rounded-lg' />
									<button
										type='button'
										onClick={() => handleRemoveImage(index)}
										className='absolute top-2 right-2 rounded-full p-1 shadow-md'
									>
										×
									</button>
								</div>
							))}
						</div>
					</div>

					{/* Submit Button */}
					<button
						type='submit'
						className='w-full py-3 px-6 text-white bg-primary rounded-lg hover:bg-primary-dark transition'
						onClick={async (e) => {
							e.preventDefault();

							try {
								const imgAPIkey = import.meta.env.VITE_IMGBB_API;

								const thumbnailUrl = (
									await axios.post(
										'https://api.imgbb.com/1/upload',
										(() => {
											const formData = new FormData();
											formData.append('image', thumbnail);
											formData.set('key', imgAPIkey);
											return formData;
										})()
									)
								).data.data.url;

								const imgUrls = (
									await Promise.all(
										images.map((image) =>
											axios.post(
												'https://api.imgbb.com/1/upload',
												(() => {
													const formData = new FormData();
													formData.append('image', image);
													formData.set('key', imgAPIkey);
													return formData;
												})()
											)
										)
									)
								).map((response) => response.data.data.url);

								// send data to server

								const response = await axios.post(
									import.meta.env.VITE_HOST + '/api/seller/products/create',
									{
										title: name,
										tag: tags,
										description: description,
										price: price,
										stock: stock,
										thumbnail: thumbnailUrl,
										images: imgUrls,
									},
									{ headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
								);

								toast.success('Tạo sản phẩm thành công');
							} catch (error) {
								console.log(error);
								toast.error('Có lỗi xảy ra');
							}
						}}
					>
						Tạo sản phẩm
					</button>
				</form>
			</div>
		</>
	);
};

export default CreateProduct;
