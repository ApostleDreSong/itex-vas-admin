import React, { useState, useRef, useEffect } from 'react';
import image from '../../../assets/images/Ellipse 1.png';
import styles from './Profile.module.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import LoopIcon from '@mui/icons-material/Loop';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, ThemeProvider } from '@material-ui/core';
import Textfield from '../../../components/formUI/Textfield';
import ButtonWrapper from '../../../components/formUI/Button';
import { Button } from '@material-ui/core';
import { theme } from '../../../ThemeRoot';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '@mui/material/IconButton';
// import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import FormControl from '@mui/material/FormControl';
// import FilledInput from '@mui/material/FilledInput';
// import InputLabel from '@mui/material/InputLabel';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import OutlineInput from '../../../components/formUI/OutlineInput';
import { InputTextField } from '../../../components/formUI/InputTextField';
import showPwdImg from '../../../assets/images/show-password.svg';
import hidePwdImg from '../../../assets/images/hide-password.svg';
import { openToastAndSetContent } from '../../../redux/actions/toast/toastActions';
import {
	closeLoader,
	openLoader,
} from '../../../redux/actions/loader/loaderActions';
import { saveMe } from '../../../redux/actions/me/meActions';
import { FetchProfileDetails } from '../../../helpers/FetchProfileDetails';
import { useHistory } from 'react-router';

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
	submitButton: {
		background: '#242670',
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
	iconMulti: {
		color: 'rgba(0, 40, 65, 0.5)',
		marginTop: '-40px',
	},

	iconMultiOff: {
		color: 'rgba(0, 40, 65, 0.85)',
		marginTop: '-40px',
	},
	changed_password_button: {
		fontWeight: 'bold',
		border: '1px solid #002841',
		marginTop: '16px',
	},
}));

interface State {
	password: string;
	showPassword: boolean;
}

function Profile() {
	const [values, setValues] = React.useState<State>({
		password: '',
		showPassword: false,
	});
	const [pwd, setPwd] = useState('');
	const [isRevealPwd, setIsRevealPwd] = useState(false);
	const ref = React.useRef<HTMLInputElement>(null);
	const dispatch = useDispatch();
	const [active, setActive] = useState(false);
	const [image, setImage] = useState<any>();
	const [avi, setAvi] = useState(false);
	const { push } = useHistory();

	const { merchants } = useSelector(
		(state) => state?.meReducer?.me?.merchant_details
	);

	const classes = useStyles();

	const INITIAL_FORM_STATE: {
		merchant_name: String;
		mobile_number: String | number;
		address: String;
	} = {
		// firstName: {admin.account_name},
		// lastName: {admin.phone_number},
		// address: {admin.address_address},
		merchant_name: merchants[0]?.name,
		mobile_number: merchants[0]?.mobile_number
			? merchants[0]?.mobile_number
			: '',
		address: merchants[0]?.address ? merchants[0]?.address : '',
	};

	const INITIAL_FORM_STATE_PASSWORD: {
		password: String | Number;
	} = {
		password: 'passwordinthemudofclane',
	};

	const FORM_VALIDATION = Yup.object().shape({
		merchant_name: Yup.string().required('Required'),
		mobile_number: Yup.string().required('Required'),
		address: Yup.string().required('Required'),
	});

	const FORM_VALIDATION_PASSWORD = Yup.object().shape({
		password: Yup.string().required('Password is Required'),
	});

	// const handleChange = (e: any) => {
	// 	setAvi(false);
	// 	const formdata = new FormData();
	// 	formdata.append('avatar', e.target.files[0]);

	// 	setImage(formdata);

	// 	axios
	// 		.post(
	// 			`${process.env.REACT_APP_ROOT_URL}/admin/profile/set-avatar`,
	// 			formdata,

	// 			{
	// 				headers: {
	// 					'content-type': 'multipart/form-data',
	// 					Authorization: `Bearer ${access_token}`,
	// 				},
	// 			}
	// 		)
	// 		.then((res: any) => {
	// 			// const { avatar } = res.data.data;
	// 			setAvi(true);
	// 			dispatch(closeLoader());

	// 			dispatch(
	// 				openToastAndSetContent({
	// 					toastContent: 'Updated successfully',
	// 					toastStyles: {
	// 						backgroundColor: 'green',
	// 					},
	// 				})
	// 			);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 			setAvi(false);
	// 			dispatch(
	// 				openToastAndSetContent({
	// 					toastContent: 'failed',
	// 					toastStyles: {
	// 						backgroundColor: 'red',
	// 					},
	// 				})
	// 			);
	// 		});
	// };

	return (
		<div className={styles.profile}>
			{/* <div className={styles.profile_content}>
				<h4>Personal Information</h4>
				<p>
					This Information will be shown publicly so be mindful what you share
				</p>
			</div>

			<div className={styles.user_description}>
				<div className={styles.user_description_image}>
					<img
						className={styles.user_description_image_main}
						src='https://i.ibb.co/fH4x0Xk/360-F-346936114-Rax-E6-OQogebg-AWTal-E1myse-Y1-Hbb5q-PM.jpg'
						alt='userProfilePic'
					/>
				</div>

				<div className={styles.user_description_action}>
					<div className={styles.user_description_action_item}>
						<div className={styles.icon_box}>
							<LoopIcon sx={{ color: '#002841' }} />
						</div>
						<div className='{styles.actions}'>
							<form>
								<label
									style={{ cursor: 'pointer' }}
									onClick={() => ref?.current?.click()}>
									<h4 className={styles.actions_h4}>Update</h4>
								</label>
								<input
									type='file'
									name='avatar'
									id='file'
									accept='image/png,image/jpg,image/jpeg'
									// onChange={handleChange}
									ref={ref}
									hidden
								/>
							</form>
						</div>
					</div>
					<div className={styles.line}></div>
					<div className={styles.user_description_action_item}>
						<div className='icon_box'>
							<HighlightOffIcon sx={{ color: '#002841' }} />
						</div>
						<h4 className={styles.actions_h4}>Remove</h4>
					</div>
				</div>
			</div> */}

			{/* END */}
			<ThemeProvider theme={theme}>
				<Grid container>
					<Grid item xs={12}>
						<Container style={{ margin: '0', padding: '0' }} maxWidth='md'>
							<div className={classes.formWrapper}>
								<Formik
									initialValues={{
										...INITIAL_FORM_STATE,
									}}
									validationSchema={FORM_VALIDATION}
									onSubmit={(values) => {
										console.log(values);
										dispatch(openLoader());

										axios
											.post(
												`/api/v1/merchant/dashboard/merchant/profile/update`,
												values
											)
											.then((res: any) => {
												dispatch(FetchProfileDetails());

												dispatch(closeLoader());

												dispatch(
													openToastAndSetContent({
														toastContent: 'Updated successfully',
														toastStyles: {
															backgroundColor: 'green',
														},
													})
												);
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
									<Form>
										<Grid container spacing={2}>
											<Grid item xs={12} md={6}>
												<h6>Account Name</h6>
												<Textfield
													size='small'
													name='merchant_name'
													disabled={active ? 'true' : ''}
													InputProps={{
														endAdornment: (
															<InputAdornment position='end'>
																<BorderColorOutlinedIcon
																	className={
																		active ? classes.icon : classes.iconoff
																	}
																/>
															</InputAdornment>
														),
													}}
												/>
											</Grid>

											<Grid item xs={12} md={6}>
												<h6>Phone Number</h6>
												<Textfield
													size='small'
													name='mobile_number'
													InputProps={{
														endAdornment: (
															<InputAdornment position='end'>
																<BorderColorOutlinedIcon
																	className={
																		active ? classes.icon : classes.iconoff
																	}
																/>
															</InputAdornment>
														),
													}}
												/>
											</Grid>

											<Grid item xs={12} md={6}>
												<h6>Address</h6>
												<Textfield
													size='small'
													name='address'
													multiline
													rows={3}
													InputProps={{
														endAdornment: (
															<InputAdornment position='start'>
																<BorderColorOutlinedIcon
																	className={
																		active
																			? classes.iconMulti
																			: classes.iconMultiOff
																	}
																/>
															</InputAdornment>
														),
													}}
												/>
											</Grid>

											<Grid item xs={12} md={6}></Grid>
											<div className={classes.flex}>
												<div>
													<Button
														onClick={() => dispatch(FetchProfileDetails())}
														className={classes.button}>
														Cancel
													</Button>
												</div>

												<div>
													<ButtonWrapper>Save</ButtonWrapper>
												</div>
											</div>
										</Grid>
									</Form>
								</Formik>
								<Formik
									initialValues={{
										...INITIAL_FORM_STATE_PASSWORD,
									}}
									validationSchema={FORM_VALIDATION_PASSWORD}
									onSubmit={(values) => {
										console.log(values);
									}}>
									<Form>
										<Grid container spacing={2}>
											<Grid item xs={12}>
												<div className={styles.password}>
													<h4 className={styles.password_header}>Password</h4>
												</div>
											</Grid>

											<Grid item xs={12} md={6}>
												<h6>Current Password</h6>

												<div className={styles.passwordrev}>
													<InputTextField
														label='Password'
														name='password'
														type={isRevealPwd ? 'text' : 'password'}
													/>

													<img
														className={styles.inputImg}
														alt='/'
														title={
															isRevealPwd ? 'Hide password' : 'Show password'
														}
														src={isRevealPwd ? hidePwdImg : showPwdImg}
														onClick={() =>
															setIsRevealPwd((prevState) => !prevState)
														}
													/>
												</div>
											</Grid>
											<Grid item xs={12} md={6}></Grid>

											<Grid item xs={12} md={12}>
												<div className={styles.changePassword}>
													<h4 className={styles.password_header}>Password</h4>
													<p className={styles.Password_p}>
														If you forgot your password or want to change it, we
														can reset it for you.
													</p>
													<Button
														onClick={() => push('/reset_password')}
														className={classes.changed_password_button}
														variant='outlined'
														startIcon={<LockOutlinedIcon />}>
														Change Password
													</Button>
												</div>
											</Grid>
										</Grid>
									</Form>
								</Formik>
							</div>
						</Container>
					</Grid>
				</Grid>
			</ThemeProvider>

			{/* ENDING */}
		</div>
	);
}

export default Profile;
