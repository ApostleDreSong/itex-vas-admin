import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ZijelaTabs from '../Tabs/ZijelaTabs';
import styles from './AccountTopBar.module.scss';

function AccountUser() {
	const root = {
		backgroundColor: '#F5F5F5',
		width: '100%',
		height: '42px',
		color: 'rgba(0, 40, 65, 0.8)',
		borderRadius: '0px',
		border: '0',
		outline: '0',
		display: 'flex',
		alignItems: 'flex-end',
		fontSize: '15px',
		marginTop: '10px',
	};

	const tabParentStyle = {
		width: '40%',

		'@media(maxWidth: 1000px)': {
			width: '90%',
		},
	};

	const tabStyle = {
		width: '25%',
		paddingBottom: '10px',
	};

	const tabsArr = [
		{
			label: (
				<Link to='/account' className={styles.tabLinks}>
					Basic Info
				</Link>
			),
			component: '',
		},
		{
			label: (
				<Link to='/account/users' className={styles.tabLinks}>
					Users
				</Link>
			),
			component: '',
		},
		{
			label: (
				<Link to='/account/walletmanager' className={styles.tabLinks}>
					Wallet Manager
				</Link>
			),
			component: '',
		},
	];
	return (
		<StyledAccountUser>
			<ZijelaTabs
				tabsArr={tabsArr}
				rootStyle={root}
				indicatorColor='#025080'
				tabStyle={tabStyle}
				tabParentStyle={tabParentStyle}
			/>
		</StyledAccountUser>
	);
}

const StyledAccountUser = styled.div`
	box-shadow: 0px 0.65px 0px rgba(75, 112, 154, 0.28);
	padding-left: 20px;
`;
export default AccountUser;
