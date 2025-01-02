import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Buyer from './Buyer/Buyer';
import Seller from './Seller/Seller';
import Admin from './Admin/Admin';
import { createContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';

export const LoggedinContext = createContext(false);

function App() {
	const [loggedin, setLoggedin] = useState(JSON.parse(localStorage.getItem('login')));

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const response = await axios.get(import.meta.env.VITE_HOST + '/api/profile/');
				const { account } = response.data;
				setLoggedin(true);
				localStorage.setItem('account', JSON.stringify(account));
			} catch (error) {
				console.log(error);
				setLoggedin(false);
				localStorage.clear();
			}
		};

		fetchProfile();
	}, []);

	useEffect(() => {
		if (loggedin && localStorage.getItem('token')) {
			localStorage.setItem('login', 'true');
		} else {
			localStorage.removeItem('login');
		}
	}, [loggedin]);

	return (
		<LoggedinContext.Provider value={{ loggedin, setLoggedin }}>
			<BrowserRouter>
				<Toaster position='top-center' />
				<Routes>
					<Route path={'/*'} element={<Buyer />}></Route>
					<Route path={'/seller/*'} element={loggedin ? <Seller /> : <Navigate to='/login' />}></Route>
					<Route path={'/admin/*'} element={loggedin ? <Admin /> : <Navigate to='/login' />}></Route>
				</Routes>
			</BrowserRouter>
		</LoggedinContext.Provider>
	);
}

export default App;
