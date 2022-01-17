import React, { useState, useEffect } from 'react';
import styles from './SignIn.module.scss';
import coverImage from '../../assets/images/left.svg';
import logo from '../../assets/images/nav_logo@2x.png';
import Textfield from '../../components/formUI/Textfield';
import { Formik, Form } from 'formik';
import OutlineInput from '../../components/formUI/OutlineInput';
import ButtonWrapper from '../../components/formUI/Button';
import { InputTextField } from '../../components/formUI/InputTextField';
import * as Yup from 'yup';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ClassNames } from '@emotion/react';
import { ThemeProvider } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { theme } from '../../ThemeRoot';
import showPwdImg from '../../assets/images/show-password.svg';
import hidePwdImg from '../../assets/images/hide-password.svg';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveAuth } from '../../redux/actions/auth/authActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { green } from '@material-ui/core/colors';
import { useHistory } from 'react-router';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';

const useStyles = makeStyles((theme) => ({
	containedSecondary: {
		backgroundColor: '#002841',
		color: '#ffffff',
	},

	formWrapper: {
		marginTop: theme.spacing(5),
		marginBottom: theme.spacing(8),
	},

	button: {
		background: '#FFFFFF',
		opacity: '0.43',
		border: '1px solid #AEC2D7',
		borderRadius: '4px',
		color: '#002841',
		width: '100px',
		marginRight: '15px',
	},
	flex: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		marginLeft: '5px',
		marginTop: '15px',
	},
	outline: {
		padding: '4px 3px',
	},
	icon: {
		color: 'rgba(0, 40, 65, 0.5)',
	},

	iconoff: {
		color: 'rgba(0, 40, 65, 0.85)',
	},
	changed_password_button: {
		fontWeight: 'bold',
		border: '1px solid #002841',
		marginTop: '16px',
	},
}));

const validate = Yup.object({
	merchant_id: Yup.string().required('Is required'),
	operator_id: Yup.string().required('Is required'),
	password: Yup.string().required('Password is required'),
});

function SignIn() {
	const [active, setActive] = useState(true);
	const [pwd, setPwd] = useState('');
	const [isRevealPwd, setIsRevealPwd] = useState(false);

	const dispatch = useDispatch();
	const { push } = useHistory();

	const classes = useStyles();

	return (
		<ThemeProvider theme={theme}>
			<div className={styles.auth_container}>
				<div className={styles.auth_left}>
					<img
						className={styles.imageLarge}
						src={coverImage}
						alt='coverlogoimage'
					/>
				</div>

				<div className={styles.auth_right}>
					<div className={styles.logo}>
						<img className={styles.logoimage} src={logo} alt="company's logo" />
					</div>
					<div className={styles.headerDiv}>
						<h4 className={styles.header}>Sign In</h4>
					</div>

					<div className={styles.form}>
						<Formik
							initialValues={{
								merchant_id: '',
								operator_id: '',
								password: '',
							}}
							validationSchema={validate}
							onSubmit={(values) => {
								dispatch(openLoader());
								axios
									.post(`${process.env.REACT_APP_ROOT_URL}/admin/login`, values)
									.then((res: any) => {
										dispatch(closeLoader());

										dispatch(saveAuth(res.data));
										dispatch(
											openToastAndSetContent({
												toastContent: 'Logged in successfully',
												toastStyles: {
													backgroundColor: 'green',
												},
											})
										);
										push('/welcome');
									})
									.catch((err) => {
										dispatch(closeLoader());
										dispatch(
											openToastAndSetContent({
												toastContent: 'failed',
												toastStyles: {
													backgroundColor: 'red',
												},
											})
										);
									});
							}}>
							{(formik) => (
								<div>
									<Form>
										<div className={styles.email}>
											<InputTextField
												label='Merchant ID'
												name='merchant_id'
												type='text'
											/>
										</div>
										<div className={styles.email}>
											<InputTextField
												label='Operator ID'
												name='operator_id'
												type='text'
											/>
										</div>

										<div className={styles.password}>
											<InputTextField
												label='Password'
												name='password'
												type={isRevealPwd ? 'text' : 'password'}
											/>

											<img
												alt='/'
												className={styles.inputImg}
												title={isRevealPwd ? 'Hide password' : 'Show password'}
												src={isRevealPwd ? hidePwdImg : showPwdImg}
												onClick={() =>
													setIsRevealPwd((prevState) => !prevState)
												}
											/>
										</div>

										<div className={styles.signUp}>
											<button className={styles.signInButton} type='submit'>
												Sign In
											</button>
										</div>
									</Form>
								</div>
							)}
						</Formik>
					</div>
					<div className={styles.forgetpassword}>
						<p className={styles.forgetpasswordP}>Forget Password?</p>
					</div>

					<div className={styles.accountDiv}>
						<p className={styles.accountParagraph}>Have an account?</p>
						<a href='/' className={styles.button}>
							Sign Up
						</a>
					</div>
				</div>
			</div>
		</ThemeProvider>
	);
}

export default SignIn;
