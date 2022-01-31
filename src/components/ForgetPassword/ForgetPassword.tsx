import React, { useState } from 'react';
import styles from './ForgetPassword.module.scss';
import logo from '../../assets/images/forgetpasswordlogo.svg';
import man from '../../assets/images/user.svg';
import { Formik, Form } from 'formik';
import { InputTextField } from '../../components/formUI/InputTextField';
import * as Yup from 'yup';
import { ThemeProvider } from '@material-ui/core';
import { theme } from '../../ThemeRoot';
import showPwdImg from '../../assets/images/show-password.svg';
import hidePwdImg from '../../assets/images/hide-password.svg';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveAuth } from '../../redux/actions/auth/authActions';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { useHistory } from 'react-router';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';

const validate = Yup.object({
	identifier: Yup.string()
		.email('Email is invalid')
		.required('Email is required'),
	new_password: Yup.string().required('Password is required'),
	otp: Yup.string().required('otp is required'),
});

function ForgetPassword() {
	const [isRevealPwd, setIsRevealPwd] = useState(false);

	const dispatch = useDispatch();
	const { push, goBack } = useHistory();
	const { first_name, last_name, avatar } = useSelector(
		(state) => state?.meReducer?.me?.user
	);
	return (
		<div className={styles.wrapper}>
			<div className={styles.nav}>
				<div onClick={() => goBack()} className={styles.logo}>
					<img src={logo} alt='' />
				</div>
				<div className={styles.user_content}>
					<div className={styles.user_description_image}>
						{avatar ? (
							<img
								className={styles.user_description_image_main}
								src={avatar}
								alt=''
							/>
						) : (
							<img
								className={styles.user_description_image_main}
								src='https://i.ibb.co/fH4x0Xk/360-F-346936114-Rax-E6-OQogebg-AWTal-E1myse-Y1-Hbb5q-PM.jpg'
								alt=''
							/>
						)}
					</div>
					<div>
						{first_name ? (
							<h3 className={styles.user_content_h3}>
								{first_name} {last_name}
							</h3>
						) : (
							<h3>Welcome</h3>
						)}
					</div>
				</div>
			</div>

			<div className={styles.auth_right}>
				<h4 className={styles.header}>Forget Password</h4>
				<div className={styles.form}>
					<Formik
						initialValues={{
							identifier: '',
							new_password: '',
							otp: '',
						}}
						validationSchema={validate}
						onSubmit={(values) => {
							dispatch(openLoader());
							axios
								.post(
									`${process.env.REACT_APP_ROOT_URL}/api/v1/merchant/dashboard/user/forgot/password/complete`,
									values
								)
								.then((res: any) => {
									dispatch(closeLoader());

									dispatch(
										openToastAndSetContent({
											toastContent: res.data.message,
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
											label='Email Address'
											name='identifier'
											type='text'
										/>
									</div>

									<div className={styles.password}>
										<InputTextField
											label='New Password'
											name='new_password'
											type={isRevealPwd ? 'text' : 'password'}
										/>

										<img
											alt='/'
											className={styles.inputImg}
											title={isRevealPwd ? 'Hide password' : 'Show password'}
											src={isRevealPwd ? hidePwdImg : showPwdImg}
											onClick={() => setIsRevealPwd((prevState) => !prevState)}
										/>
									</div>

									<div className={styles.email}>
										<InputTextField label='OTP' name='otp' type='text' />
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
				<div className={styles.forgetpassword}>
					<p className={styles.forgetpasswordP}>Change Password?</p>
					<button
						onClick={() => push('/reset_password')}
						className={styles.button}>
						Click Here
					</button>
				</div>
			</div>
		</div>
	);
}

export default ForgetPassword;
