import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../Home/Home';
import About from '../About/About';
import Login from '../Login&SignUp/Login';
import SignUp from '../Login&SignUp/SignUp';
import Search from './Search/Search';
import ShoppingCart from './Cart/Cart';
import Listing from './Search/ListingSite';
import Profile from './Profile/Profile';
import { LoggedinContext } from '../App';
import { useContext, useEffect } from 'react';
import NotFoundPage from '../Layout/NotFound';
import OrderHistoryPage from './Order/Order';

function Buyer() {
	const { loggedin } = useContext(LoggedinContext);

	useEffect(() => {
		document.title = 'BKMarket';
	}, []);

	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/about' element={<About />} />
				<Route path='/login' element={<Login />}></Route>
				<Route path='/signup' element={<SignUp />}></Route>

				<Route path='/profile' element={loggedin ? <Profile /> : <Navigate to='/login' />}></Route>
				<Route path='/search' element={<Search />}></Route>
				<Route path='/cart' element={loggedin ? <ShoppingCart /> : <Navigate to='/login' />}></Route>
				<Route path='/order' element={loggedin ? <OrderHistoryPage /> : <Navigate to='/login' />}></Route>
				<Route path='/listing/:slug' element={<Listing />}></Route>

				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			<Footer />
		</>
	);
}

export default Buyer;

// check list
/*
- [?] home
- [x] about
- [x] login
- [x] signup
- [x] profile
- [?] search (group)
- [?] item view
- [?] cart
- [] purchase history
- [] specific order
 */
