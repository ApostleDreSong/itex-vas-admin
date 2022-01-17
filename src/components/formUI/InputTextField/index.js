import React from 'react';
import { ErrorMessage, useField } from 'formik';

export const InputTextField = ({ label, ...props }) => {
	const [field, meta] = useField(props);
	return (
		<div className='mb-2'>
			<label htmlFor={field.name}>{label}</label>
			<input
				className={`form-control p-2 shadow-none ${
					meta.touched && meta.error && 'is-invalid'
				}`}
				{...field}
				{...props}
				autoComplete='off'
			/>
			<ErrorMessage component='div' name={field.name} className='error' />
		</div>
	);
};
