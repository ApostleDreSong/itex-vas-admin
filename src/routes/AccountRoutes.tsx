import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import AccountTopBar from '../components/accountTopBar/AccounTopBar';
import NavBar from '../components/navbar/NavBar';
import Snackbar from '../components/Snackbar';
import Profile from '../views/Account/profile/Profile';
import Users from '../views/Account/users/Users';
import WalletManager from '../views/Account/walletmanager/WalletManager';

const AccountRoutes = () => {
	const [snackbar, setSnackbar] = useState<boolean>(false);
	return (
		<div style={{ backgroundColor: '#F5F5F5', width: '100%' }}>
			<Snackbar snackbar={snackbar} setSnackbar={setSnackbar} />
			<NavBar name='Account' />
			<AccountTopBar />
			<Switch>
				<Route exact path='/account'>
					<Profile setSnackbar={setSnackbar} />
				</Route>
				<Route exact path='/account/users'>
					<Users />
				</Route>
				<Route exact path='/account/walletmanager'>
					<WalletManager />
				</Route>
			</Switch>
		</div>
	);
};

export default AccountRoutes;
