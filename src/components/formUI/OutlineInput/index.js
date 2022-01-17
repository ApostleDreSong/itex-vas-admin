import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useField } from 'formik';

const OutlineInput = ({ name, ...otherProps }) => {
	const [field, meta] = useField(name);

	const configTextfield = {
		...field,
		...otherProps,
		fullWidth: true,
		variant: 'outlined',
	};

	if (meta && meta.touched && meta.error) {
		configTextfield.error = true;
		configTextfield.helpertext = meta.error;
	}

	return <OutlinedInput {...configTextfield} />;
};

export default OutlineInput;
