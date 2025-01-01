import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_HOST;
axios.interceptors.request.use(
	(config) => {
		if (config.url.startsWith(axios.defaults.baseURL)) {
			const token = localStorage.getItem('token');
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error) => Promise.reject(error)
);

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>
);
