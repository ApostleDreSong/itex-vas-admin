import React from 'react';
import { Button } from '@material-ui/core';
import { useFormikContext } from 'formik';

const ButtonWrapper = ({ children, ...otherProps }) => {
	const { submitForm } = useFormikContext();

	const handleSubmit = () => {
		submitForm();
	};

	const configButton = {
		variant: 'contained',
		opacity: '0.6',
		border: '1px solid #AEC2D7',
		borderRadius: '4px',
		color: 'secondary',

		onClick: handleSubmit,
	};

	return <Button {...configButton}>{children}</Button>;
};

export default ButtonWrapper;
