import React, { useState, useEffect } from 'react';
import styles from './Users.module.scss';
import peoplepluse from '../../../assets/images/PLUSPEOPLE.svg';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button } from '@material-ui/core';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import showPwdImg from '../../../assets/images/show-password.svg';
import hidePwdImg from '../../../assets/images/hide-password.svg';
import { Container, Grid, ThemeProvider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../../ThemeRoot';
import TextField from '@mui/material/TextField';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { userlistTypes } from '../../../types/UserTableTypes';
// import { settingTypes } from '../../../types/UserTableTypes';
import UsersTable from '../../../components/usersTable/UsersTable';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
	closeModal,
	openModalAndSetContent,
} from '../../../redux/actions/modal/modalActions';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

// STYLES
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

interface State {
	password: string;
	showPassword: boolean;
}

// STYLES ENDS

interface IFormInput {
	first_name: string;
	last_name: string;
	email_address: string;
	password: string;
}

const schema = yup.object().shape({
	first_name: yup.string().required('Required').min(2).max(20),
	last_name: yup.string().required('Required').min(2).max(20),
	email_address: yup
		.string()
		.email('Must be a valid email')
		.max(255)
		.required('Email is required'),
	password: yup
		.string()
		.required('No password provided.')
		.min(8, 'Password is too short - should be 8 chars minimum.')
		.matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
});

function Users() {
	const [apiRes, setApiRes] = React.useState<userlistTypes[]>();
	const [isRevealPwd, setIsRevealPwd] = useState(false);

	const [pageNumber, setPageNumber] = React.useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = React.useState<
		string | number | undefined
	>(5);
	const [totalRows, setTotalRows] = React.useState<number>(0);
	const classes = useStyles();
	const dispatch = useDispatch();
	// const { access_token } = useSelector(
	// 	(state) => state?.authReducer?.auth?.data?.token
	// );

	const [openEdit, setOpenEdit] = React.useState(false);
	const handleOpenEdit = () => setOpenEdit(true);
	const handleCloseEdit = () => setOpenEdit(false);

	const styleEdit = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		maxWidth: '520px',
		width: '90%',
		bgcolor: '#F4F4F5',
		outline: 'none',
		boxShadow: 24,
		borderRadius: '4px',
	};

	const changePage = (value: number) => {
		setPageNumber(value);
	};
	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	useEffect(() => {
		axios.get<userlistTypes[]>('/mockfolder/settingData.json').then((res) => {
			console.log('res:', res);
			setApiRes(res.data);
		});
	}, []);

	// useEffect(() => {
	// 	axios
	// 		.get<settingTypes>(`${process.env.REACT_APP_ROOT_URL}/admin/all`, {
	// 			headers: {
	// 				Authorization: `Bearer ${access_token}`,
	// 			},
	// 		})
	// 		.then((res: any) => {
	// 			// console.log('res:', res.data.data);
	// 			setApiRes(res.data.data);
	// 		})
	// 		.catch((err) => console.log(err));
	// }, [access_token]);

	// useEffect(() => {
	// 	setTotalRows(Number(apiRes?.page?.total));
	// }, [apiRes]);

	const {
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<IFormInput>({
		mode: 'onBlur',
		resolver: yupResolver(schema),
	});

	const formSubmitHandler: SubmitHandler<IFormInput> = (data: IFormInput) => {
		console.log('data:', data);
	};
	return (
		<div className={styles.wrapper}>
			<div onClick={handleOpenEdit} className={styles.newMember}>
				<div className={styles.newMemberBox}>
					<img className={styles.newMemberImg} src={peoplepluse} alt='' />
					<p className={styles.newMemberP}>New User</p>
				</div>
			</div>

			<div style={{ marginTop: '20px' }}>
				<UsersTable
					limit={limit}
					changePage={changePage}
					apiRes={apiRes}
					setApiRes={setApiRes}
					pageNumber={pageNumber}
					setPageNumber={setPageNumber}
					rowsPerPage={rowsPerPage}
					setRowsPerPage={setRowsPerPage}
					totalRows={totalRows}
					// handleOpenChange={handleOpenChange}
				/>
			</div>

			<Modal
				open={openEdit}
				onClose={handleCloseEdit}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={styleEdit}>
					<div className={styles.messageTop}>
						<p className={styles.messageTopP}>New User</p>
						<ClearOutlinedIcon
							style={{ cursor: 'pointer' }}
							onClick={handleCloseEdit}
							sx={{ color: 'rgba(0, 40, 65, 0.5)' }}
						/>
					</div>
					<form onSubmit={handleSubmit(formSubmitHandler)}>
						<Grid container>
							<Grid
								item
								xs={12}
								style={{ margin: '20px 0', padding: '0 20px' }}>
								<Controller
									name='first_name'
									control={control}
									defaultValue=''
									render={({ field }) => (
										<TextField
											{...field}
											type='text'
											label='First name'
											variant='outlined'
											fullWidth
											error={!!errors.first_name}
											helperText={
												errors.first_name ? errors.first_name?.message : ''
											}
										/>
									)}
								/>
							</Grid>

							<Grid
								item
								xs={12}
								style={{ marginBottom: '20px', padding: '0 20px' }}>
								<Controller
									name='last_name'
									control={control}
									defaultValue=''
									render={({ field }) => (
										<TextField
											{...field}
											type='text'
											label='Last name'
											variant='outlined'
											fullWidth
											error={!!errors.last_name}
											helperText={
												errors.last_name ? errors.last_name?.message : ''
											}
										/>
									)}
								/>
							</Grid>
							<Grid
								item
								xs={12}
								style={{ marginBottom: '20px', padding: '0 20px' }}>
								<Controller
									name='email_address'
									control={control}
									defaultValue=''
									render={({ field }) => (
										<TextField
											{...field}
											type='email'
											label='Email Address'
											variant='outlined'
											fullWidth
											error={!!errors.email_address}
											helperText={
												errors.email_address
													? errors.email_address?.message
													: ''
											}
										/>
									)}
								/>
							</Grid>

							<Grid
								item
								xs={12}
								style={{ marginBottom: '20px', padding: '0 20px' }}>
								<Controller
									name='password'
									control={control}
									defaultValue=''
									render={({ field }) => (
										<TextField
											{...field}
											type={isRevealPwd ? 'text' : 'password'}
											label='Password'
											variant='outlined'
											fullWidth
											error={!!errors.password}
											helperText={
												errors.password ? errors.password?.message : ''
											}
											InputProps={{
												endAdornment: (
													<InputAdornment
														position='end'
														onClick={() => setIsRevealPwd(!isRevealPwd)}>
														{' '}
														{isRevealPwd ? <VisibilityOff /> : <Visibility />}
													</InputAdornment>
												),
											}}
										/>
									)}
								/>
							</Grid>
							<Grid item xs={12}>
								<div className={styles.footer}>
									<button onClick={() => reset()} className={styles.cancel}>
										Cancel
									</button>

									<button type='submit' className={styles.save}>
										Save
									</button>
								</div>
							</Grid>
						</Grid>
					</form>
				</Box>
			</Modal>
		</div>
	);
}

export default Users;
