import Styles from './Wallet.module.scss';
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

import { walletTopUpTypes } from '../../types/UserTableTypes';

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
import WalletTable from '../../components/WalletTable/WalletTable';
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

const Wallet = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [sort, setSort] = React.useState<Array<string>>([]);
	const [sortBy, setSortBy] = React.useState<Array<string>>([]);
	const [sortIncrement, setSortIncrement] = React.useState<Array<string>>([]);

	const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
	// const [fromDate, setFromDate] = React.useState<string>('')
	// const [toDate, setToDate] = React.useState<string>('');
	const [date, setDate] = React.useState<string[]>([]);

	const [category, setCategory] = React.useState('ascending');
	const [dropDown, setDropDown] = React.useState<Boolean>(false);
	const [increase, setIncrease] = React.useState('ascending');
	const [anchoredEl, setAnchoredEl] = React.useState<null | HTMLElement>(null);
	const [excel, setExcel] = React.useState<Boolean>(false);
	const [pdf, setPdf] = React.useState<Boolean>(false);
	const [csv, setCsv] = React.useState<Boolean>(false);
	const [apiRes, setApiRes] = React.useState<walletTopUpTypes>();
	const [pageNumber, setPageNumber] = React.useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = React.useState<
		string | number | undefined
	>(5);
	const [totalRows, setTotalRows] = React.useState<number>(0);

	const { access_token } = useSelector(
		(state) => state?.authReducer?.auth?.token
	);

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

	const handleChange = (event: any) => {
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

	useEffect(() => {
		const hate = value.map((dat) => new Date(`${dat}`).toLocaleDateString());
		setDate(hate);
	}, [value]);

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
		axios
			.get<walletTopUpTypes>(
				date[0] !== 'Invalid Date' &&
					date[1] !== 'Invalid Date' &&
					sort &&
					sortBy
					? `${process.env.REACT_APP_ROOT_URL}/api/v1/merchant/dashboard/merchant/wallet/history?FromDate=${date[0]}&ToDate=${date[1]}&FilterBy=${sort}&SortBy=${sortBy}&limit=${rowsPerPage}&page=${pageNumber}`
					: date[0] === 'Invalid Date' && date[1] === 'Invalid Date' && sort
					? `${process.env.REACT_APP_ROOT_URL}/api/v1/merchant/dashboard/merchant/wallet/history?FromDate=&ToDate=&Status=${sort}&limit=${rowsPerPage}&page=${pageNumber}`
					: `${process.env.REACT_APP_ROOT_URL}/api/v1/merchant/dashboard/merchant/wallet/history?limit=${rowsPerPage}&page=${pageNumber}`,
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				}
			)
			.then((res: any) => {
				setApiRes(res.data);
			})
			.catch((err) => console.log(err));
	}, [access_token, rowsPerPage, pageNumber, date, sort, sortBy]);

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
				backgroundColor: '#F5F5F5',
				height: '100vh',
			}}>
			<NavBar name='Wallet Top Up History' />

			<div className={Styles.flexwrap}>
				<div className={Styles.sortwrap}>
					<div onClick={() => setDropDown(!dropDown)} className={Styles.sort}>
						<p className={Styles.p}>Sort By</p>
						<SortIcon />
					</div>
					<div
						style={{ display: dropDown ? 'block' : 'none' }}
						className={Styles.list}>
						<ul className={Styles.ul1}>
							<li className={Styles.li}>
								<p className={Styles.liP}>
									<FormControlLabel
										onChange={handleSortBy}
										control={<Checkbox defaultChecked />}
										label='&nbsp; &nbsp; Date'
									/>{' '}
								</p>
							</li>
							<li className={Styles.li}>
								<p className={Styles.liP}>
									<FormControlLabel
										onChange={handleSortBy}
										control={<Checkbox />}
										label='&nbsp; &nbsp; Time'
									/>
								</p>
							</li>
							<li className={Styles.li}>
								<p className={Styles.liP}>
									<FormControlLabel
										onChange={handleSortBy}
										control={<Checkbox />}
										label='&nbsp; &nbsp; Country'
									/>
								</p>
							</li>
							<li className={Styles.li}>
								<p className={Styles.liP}>
									<FormControlLabel
										onChange={handleSortBy}
										control={<Checkbox />}
										label='&nbsp; &nbsp; Operator Name'
									/>
								</p>
							</li>
							<li className={Styles.li}>
								<p className={Styles.liP}>
									<FormControlLabel
										onChange={handleSortBy}
										control={<Checkbox />}
										label='&nbsp; &nbsp; Amount'
									/>
								</p>
							</li>
						</ul>

						<ul className={Styles.ul2}>
							<div className={Styles.options}>
								<label title='Ascending'>
									<input
										type='radio'
										name='foo'
										value='ascending'
										onChange={handleChangeIncrement}
									/>
									<img alt='' />
									Ascending
								</label>
								<label title='Ascending'>
									<input
										type='radio'
										name='foo'
										value='descending'
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
					<div
						id='fade-button'
						aria-controls='fade-menu'
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						className={Styles.dropdown}
						onClick={handleClick}>
						&nbsp;&nbsp;Status
						<KeyboardArrowDownIcon />
					</div>
					<Menu
						id='fade-menu'
						MenuListProps={{
							'aria-labelledby': 'fade-button',
						}}
						sx={{
							'& .MuiList-root': {
								padding: '8px 15px',
								width: '250px',
							},
						}}
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						TransitionComponent={Fade}
						style={{ padding: '8px 15px' }}>
						<div className={Styles.options}>
							<label title='success'>
								<input
									type='radio'
									name='foo'
									value='success'
									onChange={handleChange}
								/>
								<img alt='' />
								Success
							</label>
							<label title='reversed'>
								<input
									type='radio'
									name='foo'
									value='reversed'
									onChange={handleChange}
								/>
								<img alt='' />
								Reversed
							</label>
							<label title='pending'>
								<input
									type='radio'
									name='foo'
									value='pending'
									onChange={handleChange}
								/>
								<img alt='' />
								Pending
							</label>
						</div>
					</Menu>
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
				<WalletTable
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
				/>
			</div>
		</div>
	);
};

export default withRouter(Wallet);
