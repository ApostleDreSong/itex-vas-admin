import React, { useEffect } from 'react';
import './App.css';
import Loader from './components/Loader';
import Toast from './components/toast/Toast';
import AppRoutes from './routes/AppRoutes';
import Modal from './components/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { openToastAndSetContent } from './redux/actions/toast/toastActions';
import { useHistory } from 'react-router-dom';
import { logOut } from './redux/actions/auth/authActions';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	// const dispatch = useDispatch();
	// const history = useHistory();
	// const { access_token } = useSelector(
	// 	(state) => state?.authReducer?.auth?.token
	// );

	// useEffect(() => {
	// 	console.log(access_token);
	// }, [access_token]);

	// axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
	// axios.defaults.baseURL = process.env.REACT_APP_ROOT_URL;

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
	// 			localStorage.clear();
	// 			dispatch(logOut());
	// 			history.push('/signIn');
	// 		} else {
	// 			return Promise.reject(error);
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
