import { facebook, instagram, twitter } from '../assets/icons';

export const headerLinksLeft = [
	{
		name: 'Về chúng tôi',
		link: '/about',
		icon: 'faAddressCard',
	},
	{
		name: 'Kết nối',
		link: 'https://github.com/BKMarket',
		icon: 'faLink',
	},
	{
		name: 'Kênh người bán',
		link: '/seller',
		icon: 'faCoins',
	},
];

export const headerLinksRight = [
	{
		name: 'Đăng nhập',
		link: '/login',
		icon: 'faUser',
	},
	{
		name: 'Đăng ký',
		link: '/signup',
		icon: 'faSquarePollHorizontal',
	},
	{
		login: true,
		name: 'Hồ sơ',
		link: '/profile',
		icon: 'faIdCard',
	},
	{
		login: true,
		name: 'Đăng xuất',
		link: '/',
		icon: 'faSignOutAlt',
	},
];

export const footerLinks = [
	{
		title: 'Trợ giúp',
		links: [
			{ name: 'Về chúng tôi', link: '/' },
			{ name: 'FAQs', link: '/' },
			{ name: 'Chính sách bảo mật', link: '/' },
			{ name: 'Chính sách thanh toán', link: '/' },
		],
	},
	{
		title: 'Đối tác',
		links: [
			{ name: 'Shoppe Express', link: '/' },
			{ name: 'Giao hàng nhanh', link: '/' },
			{ name: 'Ninja Van', link: '/' },
			{ name: 'Momo', link: '/' },
		],
	},
	{
		title: 'Liên hệ',
		links: [
			{ name: 'customer@hcmut.edu.vn', link: 'mailto:customer@hcmut.edu.vn' },
			{ name: '+84554862354', link: 'tel:+84554862354' },
		],
	},
];

export const socialMedia = [
	{ src: facebook, alt: 'facebook logo' },
	{ src: twitter, alt: 'twitter logo' },
	{ src: instagram, alt: 'instagram logo' },
];
