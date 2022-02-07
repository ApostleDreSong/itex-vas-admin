import React from 'react';
import styles from './Help.module.scss';
import NavBar from '../../components/navbar/NavBar';
import { withRouter } from 'react-router';
const Help = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<NavBar name='Help' />
			My Account
		</div>
	);
};

export default withRouter(Help);
