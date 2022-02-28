import React, { useState } from 'react';
import styles from './SignIn.module.scss';
import coverImage from '../../assets/images/left.svg';
import logo from '../../assets/images/nav_logo@2x.png';
import { Formik, Form } from 'formik';
import { InputTextField } from '../../components/formUI/InputTextField';
import * as Yup from 'yup';
import { ThemeProvider } from '@material-ui/core';
import { theme } from '../../ThemeRoot';
import showPwdImg from '../../assets/images/show-password.svg';
import hidePwdImg from '../../assets/images/hide-password.svg';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveAuth } from '../../redux/actions/auth/authActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { useHistory } from 'react-router';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';
import {
	closeModal,
	openModalAndSetContent,
} from '../../redux/actions/modal/modalActions';
import { saveLoading } from '../../redux/actions/loadingState/loadingStateActions';

const validate = Yup.object({
	email_address: Yup.string()
		.email('Email is invalid')
		.required('Email is required'),
});

const validate2 = Yup.object({
	email: Yup.string().email('Email is invalid').required('Email is required'),
	password: Yup.string().required('Password is required'),
});

function SignIn({ setUser }: any) {
	// const [active, setActive] = useState(true);
	const [isRevealPwd, setIsRevealPwd] = useState(false);

	const dispatch = useDispatch();
	const { push } = useHistory();

	const forgetPasswordHandler = () => {
		dispatch(
			openModalAndSetContent({
				modalStyles: {
					padding: 0,
				},
				modalContent: (
					<>
						<div className={styles.formModal}>
							<Formik
								initialValues={{
									email_address: '',
								}}
								validationSchema={validate}
								onSubmit={(values) => {
									dispatch(openLoader());
									axios
										.post(
											`/api/v1/merchant/dashboard/user/forgot/password/initiate`,
											values
										)
										.then((res: any) => {
											dispatch(closeLoader());
											dispatch(closeModal());
											dispatch(
												openToastAndSetContent({
													toastContent: res.data.message,
													toastStyles: {
														backgroundColor: 'green',
													},
												})
											);
											push('/forget_password');
										})
										.catch((err) => {
											dispatch(closeLoader());
											dispatch(
												openToastAndSetContent({
													toastContent: err?.response?.data?.message,
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
											<h4 className={styles.modalH4}>
												Please, Enter the email address attached to your account
											</h4>

											<div className={styles.emailModal}>
												<InputTextField
													label=''
													name='email_address'
													type='text'
												/>
											</div>

											<div className={styles.signUp}>
												<button className={styles.signInButton} type='submit'>
													Submit
												</button>
											</div>
										</Form>
									</div>
								)}
							</Formik>
						</div>
					</>
				),
			})
		);
	};

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
								email: '',
								password: '',
							}}
							validationSchema={validate2}
							onSubmit={(values) => {
								dispatch(openLoader());
								axios
									.post(`/api/v1/merchant/dashboard/user/login`, values)
									.then((res: any) => {
										dispatch(closeLoader());
										// setUser(true);
										dispatch(saveAuth(res.data));
										dispatch(saveLoading(true));

										dispatch(
											openToastAndSetContent({
												toastContent: 'Logged in successfully',
												toastStyles: {
													backgroundColor: 'green',
												},
											})
										);
										push('/');
									})
									.catch((err) => {
										dispatch(closeLoader());
										// setUser(false);
										dispatch(saveLoading(false));

										dispatch(
											openToastAndSetContent({
												toastContent: err?.response?.data?.message,
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
										{/* <div className={styles.email}>
											<InputTextField
												label='Merchant ID'
												name='merchant_id'
												type='text'
											/>
										</div> */}
										<div className={styles.email}>
											<InputTextField
												label='Email Address'
												name='email'
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
					<div
						onClick={forgetPasswordHandler}
						className={styles.forgetpassword}>
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
