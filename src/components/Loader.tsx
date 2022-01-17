import React, { CSSProperties } from 'react';
import LoaderSpinner from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import OperantLoader from './OperantLoader';

const styles = {
	loaderContainer: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1400,
	} as CSSProperties,
};

export default function Loader() {
	const LoaderSelector = useSelector((state) => state.loader);
	const { LoaderOpened } = LoaderSelector;

	return (
		<>
			{LoaderOpened ? (
				<div style={styles.loaderContainer}>
					<LoaderSpinner type='Puff' color='#002841' height={50} width={50} />
				</div>
			) : null}
		</>
	);
}
