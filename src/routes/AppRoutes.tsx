import React, { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import ParentContainer from '../components/ParentContainer/ParentContainer';
import Drawer from '../components/drawer/Drawer';
import Dashboard from '../views/Dashboard/Dashboard';
import Transactions from '../views/Transactions/Transactions';
import TopUp from '../views/Topup/TopUp';
import Wallet from '../views/Wallet/Wallet';
import Privacy from '../views/Privacy/Privacy';
import Help from '../views/Help/Help';
import AccountRoutes from './AccountRoutes';
import TopUpDetails from '../components/topupDetails/TopUpDetails';
import TransactionDetails from '../components/transactionDetails/TransactionDetails';
import SignIn from '../views/accessAdmin/SignIn';
import { useSelector, useDispatch } from 'react-redux';
import ProtectedRoute from '../components/ProtectedRoutes';
import axios from 'axios';
import { saveMe } from '../redux/actions/me/meActions';
import ForgetPassword from '../components/ForgetPassword/ForgetPassword';
import ChangePassword from '../components/ChangePassword/ChangePassword';
import Snackbar from '../components/Snackbar';
import { saveLoading } from '../redux/actions/loadingState/loadingStateActions';

export default function AppRoutes() {
	const [user, setUser] = useState<Boolean>(false);
	const [snackbar, setSnackbar] = useState<boolean>(false);
	const dispatch = useDispatch();
	const { auth } = useSelector((state) => state?.authReducer);
	const { access_token } = useSelector(
		(state) => state?.authReducer?.auth?.token
	);

	const { loadingState } = useSelector((state) => state?.loadingStateReducer);

	// useEffect(() => {
	// 	if (access_token !== '') {
	// 		setUser(true);
	// 		dispatch(saveLoading(true));
	// 	} else {
	// 		setUser(false);
	// 		dispatch(saveLoading(false));
	// 	}
	// }, [user, auth, dispatch]);

	useEffect(() => {
		axios
			.get(
				`https://vas.itexpayvice.com/payvice-vas-merchant/api/v1/merchant/dashboard/user/me`,
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				}
			)
			.then((res) => {
				dispatch(saveMe(res.data));
			})
			.catch((err) => console.log(err));
	}, [dispatch, access_token]);
	return (
		<Router>
			<ParentContainer>
				<Drawer />
				<Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />

				<Switch>
					<Route exact path='/signIn'>
						<SignIn />
					</Route>
					<Route exact path='/forget_password'>
						<ForgetPassword />
					</Route>
					<Route exact path='/reset_password'>
						<ChangePassword setSnackbar={setSnackbar} />
					</Route>

					<>
						<ProtectedRoute
							exact
							path='/'
							component={Dashboard}
							AuthUser={loadingState}
						/>
						<ProtectedRoute
							exact
							path='/transactions'
							component={Transactions}
							AuthUser={loadingState}
						/>
						<ProtectedRoute
							exact
							path='/transactions/:id'
							component={TransactionDetails}
							AuthUser={loadingState}
						/>
						<ProtectedRoute
							exact
							path='/topup'
							component={TopUp}
							AuthUser={loadingState}
						/>
						<ProtectedRoute
							exact
							path='/topup/:id'
							component={TopUpDetails}
							AuthUser={loadingState}
						/>

						<ProtectedRoute
							exact
							path='/wallet'
							component={Wallet}
							AuthUser={loadingState}
						/>
						<ProtectedRoute
							path='/account'
							component={AccountRoutes}
							AuthUser={loadingState}
						/>
						<ProtectedRoute
							exact
							path='/help'
							component={Help}
							AuthUser={loadingState}
						/>
						<ProtectedRoute
							exact
							path='/privacy'
							component={Privacy}
							AuthUser={loadingState}
						/>
					</>
					{/* {!loadingState && <Redirect to='/signIn' />} */}
				</Switch>
			</ParentContainer>
		</Router>
	);
}
