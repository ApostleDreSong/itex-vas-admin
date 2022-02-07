import Styles from './transactionWalletTable.module.scss';
import { useState, useEffect, useCallback } from 'react';
import { UserTableTypes } from '../../types/UserTableTypes';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import OperantTable from '../table/OperantTable';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import CopyText from '../../helpers/CopyToClipBoard';
import MenuIcon from '../../assets/images/menu.svg';
import Grid from '@mui/material/Grid';

import CopyIcon from '../../assets/images/copy.svg';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@material-ui/styles';
import XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ExportToCsv } from 'export-to-csv';
import { useHistory } from 'react-router';
import { format, parseISO } from 'date-fns';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import NumberFormat from 'react-number-format';
import TableElementSymbol from '../TableElementSymbol';
import { walletDetailsTypes } from '../../types/UserTableTypes';

const TransactionWalletTable = ({
	excel,
	setExcel,
	pdf,
	setPdf,
	csv,
	setCsv,
	apiRes,
	setApiRes,
	totalRows,
	pageNumber,
	setPageNumber,
	rowsPerPage,
	setRowsPerPage,
}: any) => {
	const [rows, setRows] = useState<UserTableTypes[]>([]);
	const [dataValue, setDataValue] = useState<number | string>(0);
	const [idDetailValue, setIdDetailValue] = useState<walletDetailsTypes[]>([]);

	const [anchorEl, setAnchorEl] = useState(null);
	const status = 'Success';
	const open = Boolean(anchorEl);
	const [openDetails, setOpenDetails] = useState(false);
	const handleOpenDetails = () => setOpenDetails(true);
	const handleCloseDetails = () => setOpenDetails(false);
	const dispatch = useDispatch();
	const DetailsCancelHandler = () => {
		handleClose();
		// setDetails({});
		handleCloseDetails();
	};

	const styleBvn = {
		position: 'absolute' as 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		maxWidth: '520px',
		width: '90%',
		bgcolor: '#F4F4F5',

		boxShadow: 24,
	};

	const useStyles = makeStyles({
		root: {
			position: 'absolute',
			left: '-9% !important',
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
			// padding: '7px 0',
		},
		primary: {
			fontSize: '212px',
		},
		paper: {
			boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.2)',
		},
	});
	const classes = useStyles();

	const enStyles = {
		productId: {
			fontWeight: 800,
			padding: '0 5px',
		},
		toast: {
			backgroundColor: '#d4edda',
			color: '#155724',
			border: '1px solid #c3e6cb',
			fontWeight: 400,
		},
		filterIconStart: {
			width: '80%',
		},
		toastContainer: {
			display: 'flex',
			alignItems: 'center',
		},
		modalContainer: {
			display: 'grid',
		},
		tabIcon: {
			width: '30px',
			height: '30px',
			display: 'grid',
			alignItems: 'center',
			margin: 'auto 0',
			'& > img': {
				width: '100%',
				height: '100%',
				object: 'cover',
			},
		},
		tabLabel: {
			display: 'flex',
			width: '100%',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		labelIcon: {
			marginLeft: 'auto',
		},
		search: {
			background: '#494949',
			boxShadow: 'none !important',
		},
	};

	const copyId = (Id: string | number): any => {
		CopyText(Id);
		dispatch(
			openToastAndSetContent({
				toastContent: (
					<div style={enStyles.toastContainer}>
						<CheckIcon />
						<span style={enStyles.productId}> {Id} </span> <span>Copied</span>
					</div>
				),
				toastStyles: enStyles.toast,
			})
		);
	};

	const changePage = (value: number) => {
		setPageNumber(value);
	};
	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
		setDataValue(event.currentTarget.getAttribute('data-value'));
		const id = Number(event.currentTarget.getAttribute('data-value'));
		// setDataValue(event.target.getAttribute('data-value'));
		setIdDetailValue(apiRes?.items?.filter((item: any) => item.id === id));
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	// useEffect(() => {
	// 	setTotalRows(apiRes?.items?.length);
	// }, [apiRes]);

	interface Column {
		id:
			| 'date_created'
			| 'transaction_type'
			| 'status'
			| 'amount'
			| 'balance'
			| 'actions';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}

	interface ColumnForPdf {
		id:
			| 'date_created'
			| 'transaction_type'
			| 'status'
			| 'amount'
			| 'balance'
			| 'actions';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}

	const columns: Column[] = [
		{
			id: 'date_created',
			label: <TableElementSymbol title='DATE' />,
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'transaction_type',
			label: <TableElementSymbol title='TRANSACTION TYPE' />,
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'status',
			label: <TableElementSymbol title='STATUS' />,
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'amount',
			label: <TableElementSymbol title='AMOUNT' />,
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'balance',
			label: <TableElementSymbol title='BALANCE' />,
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'actions',
			label: <TableElementSymbol title='ACTION' />,
			minWidth: 100,
		},
	];

	const columnForPdf: ColumnForPdf[] = [
		{ id: 'date_created', label: 'DATE', align: 'left', minWidth: 100 },
		{
			id: 'transaction_type',
			label: 'TRANSACTION TYPE',
			align: 'left',
			minWidth: 100,
		},
		{ id: 'status', label: 'STATUS', align: 'left', minWidth: 100 },
		{ id: 'amount', label: 'AMOUNT', align: 'left', minWidth: 100 },
		{ id: 'balance', label: 'BALANCE', align: 'left', minWidth: 100 },
		{ id: 'actions', label: 'ACTIONS', align: 'left', minWidth: 100 },
	];
	let dataColumnForCsv: any[] = [];
	columns.map((col) => dataColumnForCsv.push(col.id));

	const options = {
		fieldSeparator: ',',
		quoteStrings: '"',
		decimalSeparator: '.',
		showLabels: true,
		showTitle: true,
		title: 'UserWallettransactionData',
		useTextFile: false,
		useBom: true,
		// useKeysAsHeaders: true,
		headers: dataColumnForCsv,
	};

	const downloadHandler = () => {
		if (excel) {
			//  const newData = rows.map((row) => {
			// 		delete row.tableData;
			// 		return row;
			// 	});
			const workSheet = XLSX.utils.json_to_sheet(apiRes.items);
			const workBook = XLSX.utils.book_new();
			XLSX.utils.book_append_sheet(workBook, workSheet, 'users');
			//Buffer
			let buf = XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' });
			//Binary string
			XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' });
			//Download
			XLSX.writeFile(workBook, 'usersWallettransactiondata.xlsx');
			setExcel(false);
		}
		if (pdf) {
			const doc = new jsPDF();
			doc.text('uerswallettransaction Data', 20, 10);
			autoTable(doc, {
				theme: 'grid',
				columns: columnForPdf.map((col) => ({ ...col, dataKey: col.id })),
				body: apiRes.items,
			});

			doc.save('userswalletTransaction Table.pdf');

			setPdf(false);
		}

		if (csv) {
			const csvExporter = new ExportToCsv(options);

			csvExporter.generateCsv(apiRes.items);
		}
	};

	downloadHandler();

	const LoanRowTab = useCallback(
		(
			id: number | string,
			date_created: string,
			transaction_type: string,
			status: null | string,
			amount: number | string,
			balance: number | string
		) => ({
			date_created:
				date_created && format(parseISO(date_created), 'dd MMM yyyy'),

			transaction_type: transaction_type,
			status: status ? (
				<span
					className={Styles.tableSpan}
					style={{
						backgroundColor:
							(status === 'Successful' && 'rgba(93, 204, 150, 0.17)') ||
							(status === 'Failed' && 'rgba(247, 23, 53, 0.17)') ||
							(status === 'Reversed' && 'rgba(255, 184, 0, 0.2)') ||
							'rgba(169, 170, 171, 0.22)',
						color:
							(status === 'Successful' && '#29BF12') ||
							(status === 'Failed' && '#F71735') ||
							(status === 'Reversed' && '#9C7000') ||
							'#002841',
					}}>
					{status}
				</span>
			) : (
				'No Status'
			),
			amount: (
				<NumberFormat
					value={Number(amount)}
					displayType={'text'}
					thousandSeparator={true}
					prefix={'₦'}
				/>
			),
			balance: (
				<NumberFormat
					value={Number(balance)}
					displayType={'text'}
					thousandSeparator={true}
					prefix={'₦'}
				/>
			),
			actions: (
				<div
					id='basic-button'
					data-value={id}
					aria-controls='basic-menu'
					aria-haspopup='true'
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
					className={Styles.tableVertIcon}>
					<img alt='' src={MenuIcon} />
				</div>
			),
		}),
		[]
	);
	useEffect(() => {
		const newRowOptions: any[] = [];
		apiRes &&
			apiRes &&
			apiRes?.items?.length !== 0 &&
			apiRes?.items?.map((each: any) =>
				newRowOptions.push(
					LoanRowTab(
						each.id,
						each.date_created,
						each.transaction_type,
						each.status,
						each.amount,
						each.balance
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
						margin: '-8px 0',

						borderRadius: '4px',
						borderBottomLeftRadius: '0',
						borderBottomRightRadius: '0',
						height: '100%',
						textAlign: 'left',
					}}
					onClick={handleOpenDetails}>
					View Details
				</MenuItem>
			</Menu>

			<Modal
				open={openDetails}
				onClose={DetailsCancelHandler}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={styleBvn}>
					<div className={Styles.messageTop}>
						<p className={Styles.messageTopP}>Transaction Details</p>
						<ClearOutlinedIcon
							style={{ cursor: 'pointer' }}
							onClick={DetailsCancelHandler}
							sx={{ color: 'rgba(0, 40, 65, 0.5)' }}
						/>
					</div>
					<div className={Styles.middleInput}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<div className={Styles.headingWrapperflex}>
									<div className={Styles.amountLeft}>
										<h5 className={Styles.amountLefth5}>Amount</h5>
										<h2 className={Styles.amountLefth2}>
											<NumberFormat
												value={idDetailValue[0]?.amount}
												displayType={'text'}
												thousandSeparator={true}
												prefix={'₦'}
												suffix={'.00'}
											/>
										</h2>
									</div>
									<div
										className={Styles.tableSpan}
										style={{
											backgroundColor: 'rgba(93, 204, 150, 0.17)',

											color: '#29BF12',
										}}>
										Success
									</div>
								</div>
							</Grid>

							<Grid item xs={12}>
								<div className={Styles.listwrapper}>
									<div className={Styles.listleft}>
										<p className={Styles.listleftp1}>Date</p>{' '}
									</div>
									<div className={Styles.listright}>
										<p className={Styles.listleftp2}>
											Aug 15,2021 10:25am
											{idDetailValue[0]?.date_created &&
												format(
													parseISO(idDetailValue[0]?.date_created),
													'MMM dd,yyyy p'
												)}
										</p>
									</div>
								</div>
							</Grid>
							<Grid item xs={12}>
								<div className={Styles.listwrapper}>
									<div className={Styles.listleft}>
										<p className={Styles.listleftp1}>Type</p>{' '}
									</div>
									<div className={Styles.listright}>
										<p className={Styles.listleftp2}>
											{idDetailValue[0]?.transaction_type}
										</p>
									</div>
								</div>
							</Grid>
							<Grid item xs={12}>
								<div className={Styles.listwrapper}>
									<div className={Styles.listleft}>
										<p className={Styles.listleftp1}>Reference ID</p>{' '}
									</div>
									<div className={Styles.listright}>
										<p className={Styles.listleftp2}>
											{idDetailValue[0]?.reference} &nbsp;
											<span
												style={{ cursor: 'pointer' }}
												onClick={() =>
													copyId(`${idDetailValue[0]?.reference}`)
												}>
												<img alt='' src={CopyIcon} />
											</span>
										</p>
									</div>
								</div>
							</Grid>
							<Grid item xs={12}>
								<div className={Styles.listwrapper}>
									<div className={Styles.listleft}>
										<p className={Styles.listleftp1}>Payment Method</p>{' '}
									</div>
									<div className={Styles.listright}>
										<p className={Styles.listleftp2}>
											{idDetailValue[0]?.payment_method}
										</p>
									</div>
								</div>
							</Grid>
							{/* <Grid item xs={12}>
								<div className={Styles.listwrapper}>
									<div className={Styles.listleft}>
										<p className={Styles.listleftp1}>Card Number</p>{' '}
									</div>
									<div className={Styles.listright}>
										<p className={Styles.listleftp2}>1234 5945 **** 0220</p>
									</div>
								</div>
							</Grid> */}
							<Grid item xs={12}>
								<div className={Styles.listwrapper}>
									<div className={Styles.listleft}>
										<p className={Styles.listleftp1}>Message</p>{' '}
									</div>
									<div className={Styles.listright}>
										<p className={Styles.listleftp2}>
											{idDetailValue[0]?.message}
										</p>
									</div>
								</div>
							</Grid>
						</Grid>
					</div>
				</Box>
			</Modal>
		</>
	);
};

export default TransactionWalletTable;
