import React from 'react';
import NavBar from '../../components/navbar/NavBar';
import { withRouter } from 'react-router';

const Privacy = () => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
			<NavBar name='Privacy' />
			Privacy{' '}
		</div>
	);
};

export default withRouter(Privacy);
