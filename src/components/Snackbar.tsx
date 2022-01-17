import React from 'react';
import styled from 'styled-components';

interface snack {
	snackbar: boolean;
	setSnackbar: (value: boolean | ((prevVar: boolean) => boolean)) => void;
}

function Snackbar({ snackbar, setSnackbar }:snack) {

	return (
		<StyledSnackbar style={{display : snackbar ? 'flex' : 'none'}}>
			<p>
				A reset link has just been sent to your email.{' '}
				<span className='span-dismiss' onClick={() => setSnackbar(false)}>
					Dismiss
				</span>
			</p>
		</StyledSnackbar>
	);
}
const StyledSnackbar = styled.div`
	display: none;
	justify-content: center;
	align-items: flex-end;
	width: 100%;
	height: 50px;
	background-color: #002841;
	margin: 0;
	padding: 0;

	p {
		font-weight: 500;
		font-size: 14px;

		color: #f4f4f5;
	}

	.span-dismiss {
		font-weight: 500;
		font-size: 15px;
		cursor: pointer;
		color: #5dcc96;
	}
`;

export default Snackbar;
