import React from 'react';
import styles from './Dashboard.module.scss';
import NavBar from '../../components/navbar/NavBar';
import Summary from '../../components/summary/Summary';
import ReuseableTable from '../../components/reusableTable/ReuseableTable';
import DashboardProductTable from '../../components/dashboardProductTable/DashboardProductTable';
import DashboardWalletTable from '../../components/dashboardWalletTable/DashboardWalletTable';
import DashboardTopCountriesTable from '../../components/dashboardTopCountriesTable/DashboardTopCountriesTable';
import DashboardServiceTable from '../../components/dashboardServiceTable/DashboardServiceTable';
import AreChart from '../../components/areaChart/AreChart';
//to be moved

const Dashboard = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				backgroundColor: '#F5F5F5',
				height: '100%',
				overflow: 'auto',
			}}>
			<NavBar name='Dashboard' />
			<Summary />
			<div className={styles.flexwrapper}>
				<div className={styles.flexleft}>
					<ReuseableTable />
				</div>
				<div className={styles.flexright}>
					<DashboardProductTable />
				</div>
			</div>

			<div className={styles.flexwrapper}>
				<div className={styles.flexleft}>
					<DashboardWalletTable />
				</div>
				<div className={styles.flexright}>
					<DashboardTopCountriesTable />
				</div>
			</div>

			<div className={styles.flexwrapper1}>
				<div className={styles.flexleft}>
					<DashboardServiceTable />
				</div>
				<div className={styles.flexright1}>
					<AreChart />
				</div>
			</div>

			<div
				style={{ marginTop: '20px', height: '30px', padding: '10px 0' }}></div>
		</div>
	);
};

export default Dashboard;
