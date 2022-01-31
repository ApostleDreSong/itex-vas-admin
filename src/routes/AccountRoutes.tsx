import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import AccountTopBar from '../components/accountTopBar/AccounTopBar';
import NavBar from '../components/navbar/NavBar';
import Profile from '../views/Account/profile/Profile';
import Users from '../views/Account/users/Users';
import WalletManager from '../views/Account/walletmanager/WalletManager';
import { withRouter } from 'react-router';

const AccountRoutes = ({ auth }: any) => {
	return (
		<div style={{ backgroundColor: '#F5F5F5', width: '100%' }}>
			<NavBar name='Account' />
			<AccountTopBar />
			<Switch>
				<Route exact path='/account'>
					<Profile />
				</Route>
				<Route exact path='/account/users'>
					<Users />
				</Route>
				<Route exact path='/account/walletmanager'>
					<WalletManager />
				</Route>
				{/* <ProtectedRoute exact path='/account' component={Profile} auth={auth} />
				<ProtectedRoute
					exact
					path='/account/users'
					component={Users}
					auth={auth}
				/>
				<ProtectedRoute
					exact
					path='/account/walletmanager'
					component={WalletManager}
					auth={auth}
				/> */}
			</Switch>
		</div>
	);
};

export default withRouter(AccountRoutes);
