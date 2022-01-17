import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

export default function AppRoutes() {
	return (
		<Router>
			<ParentContainer>
				<Drawer />
				<Switch>
					<Route exact path='/'>
						<Dashboard />
					</Route>
					<Route exact path='/transactions'>
						<Transactions />
					</Route>
					<Route exact path='/transactions/:id'>
						<TransactionDetails />
					</Route>
					<Route exact path='/topup'>
						<TopUp />
					</Route>
					<Route exact path='/topup/:id'>
						<TopUpDetails />
					</Route>
					<Route exact path='/wallet'>
						<Wallet />
					</Route>
					<Route path='/account'>
						<AccountRoutes />
					</Route>
					<Route exact path='/help'>
						<Help />
					</Route>
					<Route exact path='/privacy'>
						<Privacy />
					</Route>
					<Route exact path='/signIn'>
						<SignIn />
					</Route>
				</Switch>
			</ParentContainer>
		</Router>
	);
}
