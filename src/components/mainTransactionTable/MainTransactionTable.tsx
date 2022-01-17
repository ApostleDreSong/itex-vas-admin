import Styles from './MainTransactionTable.module.scss';
import { useState, useEffect, useCallback } from 'react';
import { UserTableTypes } from '../../types/UserTableTypes';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch, useSelector } from 'react-redux';
import OperantTable from '../table/OperantTable';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import CopyText from '../../helpers/CopyToClipBoard';
import MenuIcon from '../../assets/images/menu.svg';
import { ReactComponent as SortIcon } from '../../assets/images/sortIcon.svg';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router';
import CopyIcon from '../../assets/images/copy.svg';
import { Menu } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@material-ui/styles';
import XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ExportToCsv } from 'export-to-csv';
import { format, parseISO } from 'date-fns';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import NumberFormat from 'react-number-format';
import TruncateString from '../../helpers/TruncateString';

const MainTransactionTable = ({
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
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const dispatch = useDispatch();

	const history = useHistory();

	const useStyles = makeStyles({
		root: {
			position: 'absolute',
			left: '-6% !important',
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

	const changePage = (value: number) => {
		setPageNumber(value);
	};
	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
		setDataValue(event.currentTarget.getAttribute('data-value'));
		// setDataValue(event.target.getAttribute('data-value'));
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	// useEffect(() => {
	// 	setTotalRows(apiRes?.items?.length);
	// }, [apiRes]);

	interface Column {
		id:
			| 'date'
			| 'transaction_ref'
			| 'time'
			| 'transaction_type'
			| 'amount'
			| 'balance'
			| 'narration'
			| 'description'
			| 'actions';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}

	interface ColumnForPdf {
		id:
			| 'date'
			| 'transaction_ref'
			| 'time'
			| 'transaction_type'
			| 'amount'
			| 'balance'
			| 'narration'
			| 'description'
			| 'actions';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}

	const columns: Column[] = [
		{
			id: 'transaction_ref',
			label: `TRANSACTION REF`,
			align: 'left',
			minWidth: 100,
		},
		{ id: 'time', label: 'TIME', align: 'left', minWidth: 100 },
		{
			id: 'transaction_type',
			label: 'TRANSACTION TYPE',
			align: 'left',
			minWidth: 100,
		},
		{ id: 'amount', label: 'AMOUNT', minWidth: 100 },
		{ id: 'balance', label: 'BALANCE', minWidth: 100 },
		{ id: 'narration', label: 'NARRATION', minWidth: 100 },
		{ id: 'description', label: 'DESCRIPTION', minWidth: 200 },
		{ id: 'actions', label: 'ACTIONS', minWidth: 100 },
	];

	const columnForPdf: ColumnForPdf[] = [
		{
			id: 'transaction_ref',
			label: `TRANSACTION REF`,
			align: 'left',
			minWidth: 100,
		},
		{ id: 'time', label: 'TIME', align: 'left', minWidth: 100 },
		{
			id: 'transaction_type',
			label: 'TRANSACTION TYPE',
			align: 'left',
			minWidth: 100,
		},
		{ id: 'amount', label: 'AMOUNT', minWidth: 100 },
		{ id: 'balance', label: 'BALANCE', minWidth: 100 },
		{ id: 'narration', label: 'NARRATION', minWidth: 100 },
		{ id: 'description', label: 'DESCRIPTION', minWidth: 100 },
		{ id: 'actions', label: 'ACTIONS', minWidth: 100 },
	];
	let dataColumnForCsv: any[] = [];
	columns.map((col) => dataColumnForCsv.push(col.id));

	const options = {
		fieldSeparator: ',',
		quoteStrings: '"',
		decimalSeparator: '.',
		showLabels: true,
		showTitle: true,
		title: 'transactionData',
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
			XLSX.writeFile(workBook, 'userstransactiondata.xlsx');
			setExcel(false);
		}
		if (pdf) {
			const doc = new jsPDF();
			doc.text('transaction Data', 20, 10);
			autoTable(doc, {
				theme: 'grid',
				columns: columnForPdf.map((col) => ({ ...col, dataKey: col.id })),
				body: apiRes.items,
			});

			doc.save('Transaction Table.pdf');

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
			transaction_ref: string,
			time: number | string,
			transaction_type: string,
			amount: number,
			balance: number,
			narration: string,
			description: string
		) => ({
			transaction_ref: transaction_ref,
			time: `${time}am`,
			transaction_type: transaction_type,
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
			narration:
				narration.length > 10 ? narration.substring(0, 7) + '...' : narration,
			description:
				narration.length > 10 ? narration.substring(0, 20) + '...' : narration,

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
			apiRes?.length !== 0 &&
			apiRes?.map((each: any) =>
				newRowOptions.push(
					LoanRowTab(
						each.id,
						each.transaction_ref,
						each.time,
						each.transaction_type,
						each.amount,
						each.balance,
						each.narration,
						each.desription
					)
				)
			);
		setRows(newRowOptions);
	}, [apiRes, LoanRowTab]);

	const handleUserDetails = () => {
		history.push(`/transactions/${dataValue}`);

		handleClose();
	};
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
					onClick={handleUserDetails}>
					View Details
				</MenuItem>
			</Menu>
		</>
	);
};

export default MainTransactionTable;
