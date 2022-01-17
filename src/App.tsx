import React, { useEffect } from 'react';
import './App.css';
import Loader from './components/Loader';
import Toast from './components/toast/Toast';
import AppRoutes from './routes/AppRoutes';
import Modal from './components/Modal';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	// axios?.interceptors?.response?.use(
	// 	(response) => {
	// 		// Any status code that lie within the range of 2xx cause this function to trigger
	// 		// Do something with response data
	// 		return response;
	// 	},
	// 	(error) => {
	// 		if (error?.response?.status === 401) {
	// 			console.log(error?.response?.data?.message, error?.response?.status);

	// 			dispatch(
	// 				openToastAndSetContent({
	// 					toastContent: 'Token Expired',
	// 					toastStyles: {
	// 						backgroundColor: 'red',
	// 					},
	// 				})
	// 			);
	// 			dispatch(closeModal());
	// 			dispatch(logoutUser(router));
	// 		} else {
	// 			throw new Error(error);
	// 		}
	// 	}
	// );

	return (
		<>
			<AppRoutes />
			<Toast />
			<Loader />
			<Modal />
		</>
	);
}

export default App;
