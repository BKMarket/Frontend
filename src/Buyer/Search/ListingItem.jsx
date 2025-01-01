import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from '@fortawesome/free-solid-svg-icons';

export default function ListingItem({ listing }) {
	return (
		<div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-md w-[188.4px]'>
			<Link to={`/listing/${listing.slug}`}>
				<img
					src={
						listing?.thumbnail ||
						'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
					}
					alt='listing cover'
					className='h-[188.4px] w-full object-cover hover:scale-105 transition-scale duration-300'
				/>
				<div className='p-3 flex flex-col gap-2 w-full'>
					<p className='truncate text-lg font-semibold text-slate-700'>{listing.title}</p>
					<div className='flex items-center gap-1'>
						<FontAwesomeIcon icon={Icons.faMoneyBill}></FontAwesomeIcon>
						<p className='text-sm text-gray-600 truncate w-full'>
							{((listing.price * (100 - listing.discountPercentage)) / 100).toLocaleString() + ' VNĐ'}
						</p>
					</div>
					{listing.discountPercentage > 0 && (
						<div className='flex items-center gap-1'>
							<FontAwesomeIcon icon={Icons.faMoneyBill}></FontAwesomeIcon>
							<p className='text-sm text-gray-600 truncate w-full line-through'>
								{listing.price.toLocaleString() + ' VNĐ'}
							</p>
						</div>
					)}
					<p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
					<div className='text-slate-700 flex gap-4'>
						{listing.tag?.[0] && <FontAwesomeIcon icon={Icons.faTag} /> && (
							<div className='font-bold text-xs'>{listing.tag[0]}</div>
						)}
					</div>
				</div>
			</Link>
		</div>
	);
}
