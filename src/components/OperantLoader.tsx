import React from 'react';
import styles from './OperantLoader.module.scss';
import OperantLogo from '../assets/operant-transparent.png';

const OperantLoader = () => {
	return <img className={styles.image} src={OperantLogo} />;
};

export default OperantLoader;
