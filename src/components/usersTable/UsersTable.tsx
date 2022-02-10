import Styles from './usersTable.module.scss';
import { useState, useEffect, useCallback } from 'react';
import { settingTypes } from '../../types/UserTableTypes';
import OperantTable from '../table/OperantTable';
import { format, parseISO } from 'date-fns';
import MenuIcon from '../../assets/images/menu.svg';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useHistory } from 'react-router';
import { Menu } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from '@material-ui/styles';
import {
	closeModal,
	openModalAndSetContent,
} from '../../redux/actions/modal/modalActions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Grid } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import {
	closeLoader,
	openLoader,
} from '../../redux/actions/loader/loaderActions';

interface IFormInput {
	first_name: string;
	last_name: string;
	email_adress: string;
}

const schema = yup.object().shape({
	first_name: yup.string().required('Required').min(2).max(20),
	last_name: yup.string().required('Required').min(2).max(20),
	email_adress: yup
		.string()
		.email('Must be a valid email')
		.max(255)
		.required('Email is required'),
});

const UsersTable = ({
	apiRes,
	setApiRes,
	totalRows,
	limit,
	changePage,
	pageNumber,
	setPageNumber,
	rowsPerPage,
	setRowsPerPage,
	setCheckUpdate,
}: any) => {
	const [rows, setRows] = useState<settingTypes[]>([]);
	const [dataValue, setDataValue] = useState<number | string>(0);
	const [confirmTerminate, setConfirmTerminate] = useState<string>('');
	const [activeTerminate, setActiveTerminate] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [openEdit, setOpenEdit] = useState(false);
	const handleOpenEdit = () => setOpenEdit(true);
	const handleCloseEdit = () => setOpenEdit(false);

	const [openTerminate, setOpenTerminate] = useState(false);
	const handleOpenTerminate = () => setOpenTerminate(true);
	const handleCloseTerminate = () => setOpenTerminate(false);

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

	const styleTerminate = {
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
		dispatch(openLoader());
		const values = { ...data, user_id: dataValue };
		axios
			.post(`/api/v1/merchant/dashboard/user/profile/update`, values)
			.then((res: any) => {
				dispatch(closeLoader());
				handleCloseEdit();
				setCheckUpdate(true);
				dispatch(
					openToastAndSetContent({
						toastContent: res.data.message,
						toastStyles: {
							backgroundColor: 'green',
						},
					})
				);
			})
			.catch((err) => {
				dispatch(closeLoader());
				setCheckUpdate(false);

				dispatch(
					openToastAndSetContent({
						toastContent: 'failed',
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			});
	};

	const open = Boolean(anchorEl);
	const confirmName = 'KOSEEMANI';

	const dispatch = useDispatch();
	// const history = useHistory();
	const useStyles = makeStyles({
		root: {
			position: 'absolute',
			left: '-5% !important',
			top: '-1% !important',
		},
		list: {
			backgroundColor: '#ffffff',
			width: '10rem',
			overflow: 'hidden',
			color: 'rgba(0, 40, 65, 0.8)',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start',
			justifyContent: 'flex-start',
		},
		primary: {
			fontSize: '212px',
		},
		paper: {
			boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.2)',
		},
	});
	const classes = useStyles();

	useEffect(() => {
		if (confirmName === confirmTerminate) {
			setActiveTerminate(true);
		} else {
			setActiveTerminate(false);
		}
	}, [confirmTerminate]);

	const cancelHandler = () => {
		setConfirmTerminate('');
		handleCloseTerminate();
	};

	// const handleChangeRole = (event: SelectChangeEvent) => {
	// 	setRoleChange(event.target.value);
	// };
	const terminateHandler = () => {
		dispatch(openLoader());

		axios
			.post(`/api/v1/merchant/dashboard/user/delete/${dataValue}`)
			.then((res: any) => {
				dispatch(closeLoader());
				setCheckUpdate(true);

				dispatch(
					openToastAndSetContent({
						toastContent: res.data.message,
						toastStyles: {
							backgroundColor: 'green',
						},
					})
				);
			})
			.catch((err) => {
				dispatch(closeLoader());
				setCheckUpdate(false);

				dispatch(
					openToastAndSetContent({
						toastContent: err?.response?.data?.message,
						toastStyles: {
							backgroundColor: 'red',
						},
					})
				);
			});
	};

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
		setDataValue(event.currentTarget.getAttribute('data-value'));
		// setDataValue(event.target.getAttribute('data-value'));
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	interface Column {
		id: 'email_address' | 'first_name' | 'last_name' | 'status' | 'actions';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}

	const columns: Column[] = [
		{ id: 'email_address', label: 'EMAIL', minWidth: 200 },
		{ id: 'first_name', label: 'FIRST NAME', align: 'left', minWidth: 100 },
		{ id: 'last_name', label: 'LAST NAME', align: 'left', minWidth: 100 },
		{ id: 'status', label: 'STATUS', align: 'left', minWidth: 100 },
		{ id: 'actions', label: 'ACTIONS', align: 'center', minWidth: 100 },
	];

	const LoanRowTab = useCallback(
		(
			id: number | string,
			email_address: string,
			first_name: string,
			last_name: string,
			status: string
		) => ({
			email_address: email_address,
			first_name: first_name,
			last_name: last_name,
			status: (
				<span
					className={Styles.tableSpan}
					style={{
						backgroundColor:
							(status === 'Active' && 'rgba(93, 204, 150, 0.17)') ||
							(status === 'Deleted' && 'rgba(247, 23, 53, 0.17)') ||
							(status === 'Inactive' && 'rgba(255, 184, 0, 0.2)') ||
							'rgba(169, 170, 171, 0.22)',
						color:
							(status === 'Active' && '#29BF12') ||
							(status === 'Deleted' && '#F71735') ||
							(status === 'Inactive' && '#9C7000') ||
							'#002841',
					}}>
					{status}
				</span>
			),
			actions: (
				<div
					id='basic-button'
					data-value={id}
					aria-controls='basic-menu'
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}>
					<img alt='' src={MenuIcon} style={{ cursor: 'pointer' }} />
				</div>
			),
		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		apiRes &&
			apiRes &&
			apiRes?.length !== 0 &&
			apiRes?.map((each: any) =>
				newRowOptions.push(
					LoanRowTab(
						each.id,
						each.email_address,
						each.first_name,
						each.last_name,

						each.status
					)
				)
			);
		setRows(newRowOptions);
	}, [apiRes, LoanRowTab]);

	return (
		<>
			<OperantTable
				columns={columns}
				rows={rows}
				totalRows={totalRows}
				changePage={changePage}
				limit={limit}
			/>

			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				classes={{
					list: classes.list,
					paper: classes.paper,
					root: classes.root,
				}}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}>
				<MenuItem
					onMouseEnter={(e: any) =>
						(e.target.style.backgroundColor = '#d9e9f1')
					}
					onMouseLeave={(e: any) => (e.target.style.backgroundColor = '')}
					style={{
						color: '#002841',
						padding: '10px 10rem 10px 20px',
						marginTop: '-8px',
						borderRadius: '4px',
						borderBottomLeftRadius: '0',
						borderBottomRightRadius: '0',
						height: '100%',
						textAlign: 'left',
					}}
					onClick={handleOpenEdit}>
					Edit Details
				</MenuItem>
				<MenuItem
					onMouseEnter={(e: any) =>
						(e.target.style.backgroundColor = '#d9e9f1')
					}
					onMouseLeave={(e: any) => (e.target.style.backgroundColor = '')}
					style={{
						color: '#F71735',
						padding: '10px 10rem 10px 20px',
						marginBottom: '-8px',
						borderRadius: '4px',
						borderTopLeftRadius: '0',
						borderTopRightRadius: '0',
						height: '100%',
						textAlign: 'left',
					}}
					onClick={handleOpenTerminate}>
					Delete
				</MenuItem>
			</Menu>

			<Modal
				open={openEdit}
				onClose={handleCloseEdit}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={styleEdit}>
					<div className={Styles.messageTop}>
						<p className={Styles.messageTopP}>Edit User Details</p>
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
									name='email_adress'
									control={control}
									defaultValue=''
									render={({ field }) => (
										<TextField
											{...field}
											type='email'
											label='email'
											variant='outlined'
											fullWidth
											error={!!errors.email_adress}
											helperText={
												errors.email_adress ? errors.email_adress?.message : ''
											}
										/>
									)}
								/>
							</Grid>

							<Grid item xs={12}>
								<div className={Styles.footer}>
									<button onClick={() => reset()} className={Styles.cancel}>
										Cancel
									</button>

									<button type='submit' className={Styles.save}>
										Save
									</button>
								</div>
							</Grid>
						</Grid>
					</form>
				</Box>
			</Modal>

			<Modal
				open={openTerminate}
				onClose={handleCloseTerminate}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={styleTerminate}>
					<div className={Styles.messageTop}>
						<p className={Styles.messageTopP}>Delete Account</p>
						<ClearOutlinedIcon
							style={{ cursor: 'pointer' }}
							onClick={cancelHandler}
							sx={{ color: 'rgba(0, 40, 65, 0.5)' }}
						/>
					</div>

					<div className={Styles.notify}>
						<div className={Styles.errorAlert}>
							<ErrorOutlineOutlinedIcon sx={{ color: '#F71735' }} />
						</div>
						<div className={Styles.errorContent}>
							<h5 className={Styles.errorContenth5}>
								You are about to permanently delete this admin’s account.
							</h5>
							<p className={Styles.errorContentp}>
								Once an account is permanently deleted, it cannot be recovered.
								Permanently deleting this account will immediately delete all
								data associated with this account.
							</p>
						</div>
					</div>

					<div className={Styles.confirmation}>
						<p className={Styles.confirmP}>
							Please type the following to confirm:
						</p>
						<h5 className={Styles.confirmh5}>{confirmName}</h5>
						<TextField
							sx={{
								width: '100%',
							}}
							id='outlined-multiline-static'
							fullWidth
							label='Confirm with the text above'
							size='small'
							value={confirmTerminate}
							onChange={(e) => setConfirmTerminate(e.target.value)}
						/>
					</div>

					<div className={Styles.footer}>
						<button onClick={cancelHandler} className={Styles.cancel}>
							Cancel, keep account
						</button>
						<button
							onClick={terminateHandler}
							disabled={activeTerminate ? false : true}
							style={{
								backgroundColor: activeTerminate ? '#eb102d' : '',
								border: activeTerminate ? '1px solid #F5F7FA' : '',
								color: activeTerminate ? '#FFFFFF' : '',
								opacity: activeTerminate ? '1' : '',
							}}
							className={Styles.save}>
							Proceed, delete account
						</button>
					</div>
				</Box>
			</Modal>
		</>
	);
};

export default UsersTable;
