import Styles from './Transactions.module.scss';
import NavBar from '../../components/navbar/NavBar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ReactComponent as SortIcon } from '../../assets/images/sortIcon.svg';
import { useSelector } from 'react-redux';
import { styled as stylesref } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import NumberFormat from 'react-number-format';
import { format, parseISO } from 'date-fns';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

import { mainTransactionTypes } from '../../types/UserTableTypes';

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import CheckIcon from '@mui/icons-material/Check';

import Fade from '@mui/material/Fade';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { createTheme, ThemeProvider } from '@material-ui/core';
import InputAdornment from '@mui/material/InputAdornment';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Grid from '@mui/material/Grid';

import { useLocation } from 'react-router';
import MainTransactionTable from '../../components/mainTransactionTable/MainTransactionTable';
import { withRouter } from 'react-router';

const BpIcon = stylesref('span')(({ theme }) => ({
	borderRadius: '50%',
	width: 16,
	height: 16,
	boxShadow:
		theme.palette.mode === 'dark'
			? '0 0 0 1px rgb(16 22 26 / 40%)'
			: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
	backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
	backgroundImage:
		theme.palette.mode === 'dark'
			? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
			: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
	'.Mui-focusVisible &': {
		outline: '2px auto rgba(19,124,189,.6)',
		outlineOffset: 2,
	},
	'input:hover ~ &': {
		backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
	},
	'input:disabled ~ &': {
		boxShadow: 'none',
		background:
			theme.palette.mode === 'dark'
				? 'rgba(57,75,89,.5)'
				: 'rgba(206,217,224,.5)',
	},
}));

const BpCheckedIcon = stylesref(BpIcon)({
	backgroundColor: '#137cbd',
	backgroundImage:
		'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
	'&:before': {
		display: 'block',
		width: 16,
		height: 16,
		backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
		content: '""',
	},
	'input:hover ~ &': {
		backgroundColor: '#106ba3',
	},
});

function BpRadio(props: RadioProps) {
	return (
		<Radio
			sx={{
				'&:hover': {
					bgcolor: 'transparent',
				},
			}}
			disableRipple
			color='default'
			checkedIcon={<BpCheckedIcon />}
			icon={<BpIcon />}
			{...props}
		/>
	);
}

const Transactions = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [sort, setSort] = React.useState<string>('airtime');
	const [sortBy, setSortBy] = React.useState<string>('time');
	const [sortIncrement, setSortIncrement] = React.useState<string>('asc');
	const [loading, setLoading] = useState<boolean>(true);

	const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
	// const [fromDate, setFromDate] = React.useState<string>('')
	// const [toDate, setToDate] = React.useState<string>('');
	const [date, setDate] = React.useState<string[]>(['', '']);

	const [category, setCategory] = React.useState('ascending');
	const [dropDown, setDropDown] = React.useState<Boolean>(false);
	const [dropDownFilter, setDropDownFilter] = React.useState<Boolean>(false);

	const [increase, setIncrease] = React.useState('ascending');
	const [anchoredEl, setAnchoredEl] = React.useState<null | HTMLElement>(null);
	const [excel, setExcel] = React.useState<Boolean>(false);
	const [pdf, setPdf] = React.useState<Boolean>(false);
	const [csv, setCsv] = React.useState<Boolean>(false);
	const [apiRes, setApiRes] = React.useState<mainTransactionTypes>();
	const [pageNumber, setPageNumber] = React.useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = React.useState<
		string | number | undefined
	>(5);
	const [totalRows, setTotalRows] = React.useState<number>(0);

	const opened = Boolean(anchoredEl);
	const open = Boolean(anchorEl);
	const location = useLocation();

	// const urlId = location.pathname.split('/')[3];

	const options = [
		'Send Message',
		'Export to CSV',
		'Export to PDF',
		'Export to XLS',
	];

	const ITEM_HEIGHT = 48;
	const handledClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchoredEl(event.currentTarget);
	};

	const handledClose = () => {
		setAnchoredEl(null);
	};

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const changePage = (value: number) => {
		setPageNumber(value);
	};
	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	const handleSort = (event: any) => {
		const { value, checked } = event.target;
		setSort(value);
	};

	const handleChangeIncrement = (event: any) => {
		const { value, checked } = event.target;
		setSortIncrement(value);
	};

	const handleSortBy = (event: any) => {
		const { value, checked } = event.target;
		setSortBy(value);
	};
	// const handleSortBy = (event: any) => {
	// 	const { value, checked } = event.target;
	// 	if (checked) {
	// 		if (!sortBy.includes(value)) {
	// 			setSortBy([...sort, value] as string[]);
	// 		}
	// 	} else {
	// 		const arr = sortBy.filter(function (item) {
	// 			return item !== value;
	// 		});
	// 		setSortBy(arr);
	// 	}
	// };
	useEffect(() => {
		const hate = value.map((dat) => new Date(`${dat}`).toLocaleDateString());
		setDate(hate);
	}, [value]);

	useEffect(() => {
		console.log('iam:', date);
	}, [date, sort, sortBy, sortIncrement]);

	// (date[0] !== 'Invalid Date' && date[1] !== 'Invalid Date') || sort
	// 	? `/customer/transactions?FromDate=${date[0]}&ToDate=${date[1]}&Status=${sort}&limit=${rowsPerPage}&page=${pageNumber}`
	// 	: `/customer/transactions?limit=${rowsPerPage}&page=${pageNumber}`;

	useEffect(() => {
		axios
			.get<mainTransactionTypes>(
				date[0] !== 'Invalid Date' &&
					date[1] !== 'Invalid Date' &&
					sort &&
					sortBy &&
					sortIncrement
					? `/api/v1/merchant/dashboard/merchant/transactions/all?FromDate=${date[0]}&ToDate=${date[1]}&FilterBy=${sort}&SortBy=${sortBy}&Order=${sortIncrement}&limit=${rowsPerPage}&page=${pageNumber}`
					: date[0] === 'Invalid Date' &&
					  date[1] === 'Invalid Date' &&
					  sort &&
					  sortBy &&
					  sortIncrement
					? `/api/v1/merchant/dashboard/merchant/transactions/all?FromDate=&ToDate=&FilterBy=${sort}&SortBy=${sortBy}&Order=${sortIncrement}&limit=${rowsPerPage}&page=${pageNumber}`
					: `/api/v1/merchant/dashboard/merchant/transactions/all?limit=${rowsPerPage}&page=${pageNumber}`
			)
			.then((res: any) => {
				setApiRes(res.data);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, [rowsPerPage, pageNumber, date, sort, sortBy, sortIncrement]);

	useEffect(() => {
		setTotalRows(Number(apiRes?.total_items));
	}, [apiRes]);

	const theme = createTheme({
		overrides: {
			MuiInputLabel: {
				// Name of the component ⚛️ / style sheet
				root: {
					// Name of the rule
					color: 'orange',
					'&$focused': {
						// increase the specificity for the pseudo class
						color: 'red',
					},
				},
			},
		},
	});

	const clickHandler = (option: string) => {
		if (option === 'Export to XLS') {
			setExcel(true);
		} else if (option === 'Export to PDF') {
			setPdf(true);
		} else if (option === 'Export to CSV') {
			setCsv(true);
		}

		handledClose();
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				// padding: '20px 20px',
				backgroundColor: '#F5F5F5',
				height: '100vh',
			}}>
			<NavBar name='Transactions' />

			<div className={Styles.WalletHeaderWrap}>
				<p className={Styles.WalletHeaderWrapP1}>All Transactions</p>
			</div>

			<div className={Styles.flexwrap}>
				<div className={Styles.sortwrap}>
					<div
						onClick={() => setDropDownFilter(!dropDownFilter)}
						className={Styles.sort}>
						<p className={Styles.p}>filter By</p>
						<FilterAltOutlinedIcon
							sx={{ color: '#002841', height: '12px', width: '12px' }}
						/>
					</div>

					<div
						style={{ display: dropDownFilter ? 'block' : 'none' }}
						className={Styles.optionSort}>
						{/* <h2 className={Styles.transacth2}>ACTIONS</h2>
						<label title='Transfer'>
							<input
								type='radio'
								name='foo'
								value='Transfer'
								onChange={handleSort}
							/>
							<img alt='' />
							Transfer
						</label>
						<label title='Withdrawals'>
							<input
								type='radio'
								name='foo'
								value='Withdrawals'
								onChange={handleSort}
							/>
							<img alt='' />
							Withdrawals
						</label>
						<hr
							style={{
								color: '#c5daf3',
								backgroundColor: '#c5daf3',
								height: '1px ',
								width: '90%',
							}}
						/> */}
						<h2 className={Styles.transacth2}>BILL</h2>
						<label title='Airtime/Data'>
							<input
								type='radio'
								name='boo'
								value='airtime'
								onChange={handleSort}
							/>
							<img alt='' />
							Airtime/Data
						</label>
						<label title='Utilities'>
							<input
								type='radio'
								name='boo'
								value='utilities'
								onChange={handleSort}
							/>
							<img alt='' />
							Utilities
						</label>

						<hr
							style={{
								color: '#c5daf3',
								backgroundColor: '#c5daf3',
								height: '1px ',
								width: '90%',
							}}
						/>
						{/* <h2 className={Styles.transacth2}>BANKING</h2>
						<label style={{ width: '100%' }} title='Account Opening'>
							<input
								type='radio'
								name='foo'
								value='Account Opening'
								onChange={handleSort}
							/>
							<img alt='' />
							Account Opening
						</label>
						<label style={{ width: '100%' }} title='Salary Payments'>
							<input
								type='radio'
								name='foo'
								value='Salary Payments'
								onChange={handleSort}
							/>
							<img alt='' />
							Salary Payments
						</label>

						<label style={{ width: '100%' }} title='Card Issuances'>
							<input
								type='radio'
								name='foo'
								value='Card Issuances'
								onChange={handleSort}
							/>
							<img alt='' />
							Card Issuances
						</label>

						<hr
							style={{
								color: '#c5daf3',
								backgroundColor: '#c5daf3',
								height: '1px ',
								width: '90%',
							}}
						/>
						<h2 className={Styles.transacth2}>BILL</h2>
						<label style={{ width: '100%' }} title='Identity Services'>
							<input
								type='radio'
								name='foo'
								value='Identity Services'
								onChange={handleSort}
							/>
							<img alt='' />
							Identity Services
						</label>
						<label style={{ width: '100%' }} title='Micro-insurance'>
							<input
								type='radio'
								name='foo'
								value='Micro-insurance'
								onChange={handleSort}
							/>
							<img alt='' />
							Micro-insurance
						</label>
					 */}
					</div>
				</div>

				<div className={Styles.sortwrap}>
					<div onClick={() => setDropDown(!dropDown)} className={Styles.sort}>
						<p className={Styles.p}>Sort By</p>
						<SortIcon />
					</div>
					<div
						style={{ display: dropDown ? 'block' : 'none' }}
						className={Styles.list}>
						<ul className={Styles.ul1}>
							<div className={Styles.options}>
								<label title='Time'>
									<input
										type='radio'
										name='soo'
										value='time'
										onChange={handleSortBy}
									/>
									<img alt='' />
									Time
								</label>
								<label title='Amount'>
									<input
										type='radio'
										name='soo'
										value='amount'
										onChange={handleSortBy}
									/>
									<img alt='' />
									Amount
								</label>
								<label title='balance'>
									<input
										type='radio'
										name='soo'
										value='balance'
										onChange={handleSortBy}
									/>
									<img alt='' />
									Balance
								</label>
							</div>
						</ul>

						<ul className={Styles.ul2}>
							<div className={Styles.options}>
								<label title='Ascending'>
									<input
										type='radio'
										name='foo'
										value='asc'
										onChange={handleChangeIncrement}
									/>
									<img alt='' />
									Ascending
								</label>
								<label title='Ascending'>
									<input
										type='radio'
										name='foo'
										value='desc'
										onChange={handleChangeIncrement}
									/>
									<img alt='' />
									Descending
								</label>
							</div>
						</ul>
					</div>
				</div>

				<div className={Styles.dropdownwrap}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<ThemeProvider theme={theme}>
							<DateRangePicker
								startText='From:'
								endText='To:'
								value={value}
								onChange={(newValue) => {
									setValue(newValue);
								}}
								renderInput={(startProps, endProps) => (
									<React.Fragment>
										<TextField
											sx={{
												'.MuiTextField-root': {
													background: '#ffffff',
												},
											}}
											InputProps={{
												endAdornment: (
													<InputAdornment
														position='end'
														style={{
															backgroundColor: '#D7E0EB',
															padding: '20px 10px',
															marginRight: '-14px',
															borderRadius: '4px',
														}}>
														<DateRangeIcon
															style={{ color: 'rgba(0, 40, 65, 0.9)' }}
														/>
													</InputAdornment>
												),
											}}
											size='small'
											{...startProps}
										/>

										<TextField
											InputProps={{
												endAdornment: (
													<InputAdornment
														position='end'
														style={{
															backgroundColor: '#D7E0EB',
															padding: '20px 10px',
															marginRight: '-14px',
															borderRadius: '4px',
														}}>
														<DateRangeIcon
															style={{ color: 'rgba(0, 40, 65, 0.9)' }}
														/>
													</InputAdornment>
												),
											}}
											size='small'
											{...endProps}
										/>
									</React.Fragment>
								)}
							/>
						</ThemeProvider>
					</LocalizationProvider>
				</div>
				<div className={Styles.vertIcon}>
					{/* <MoreVertIcon style={{ fontSize: '25px' }} /> */}
					<IconButton
						aria-label='more'
						id='long-button'
						aria-controls='long-menu'
						aria-expanded={open ? 'true' : undefined}
						aria-haspopup='true'
						onClick={handledClick}>
						<MoreVertIcon />
					</IconButton>
					<Menu
						id='long-menu'
						MenuListProps={{
							'aria-labelledby': 'long-button',
						}}
						anchorEl={anchoredEl}
						open={opened}
						onClose={handledClose}
						PaperProps={{
							style: {
								maxHeight: ITEM_HEIGHT * 4.5,
								width: '20ch',
								paddingLeft: '10px',
								borderRadius: '4px',
							},
						}}>
						{options.map((option) => (
							<MenuItem key={option} onClick={() => clickHandler(option)}>
								{option}
							</MenuItem>
						))}
					</Menu>
				</div>
			</div>
			<div style={{ padding: '0 20px' }}>
				<MainTransactionTable
					excel={excel}
					setExcel={setExcel}
					pdf={pdf}
					setPdf={setPdf}
					csv={csv}
					changePage={changePage}
					limit={limit}
					setCsv={setCsv}
					apiRes={apiRes}
					setApiRes={setApiRes}
					pageNumber={pageNumber}
					setPageNumber={setPageNumber}
					rowsPerPage={rowsPerPage}
					setRowsPerPage={setRowsPerPage}
					totalRows={totalRows}
					loading={loading}
				/>
			</div>
		</div>
	);
};

export default withRouter(Transactions);
