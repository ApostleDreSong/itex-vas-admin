import Styles from './WalletTable.module.scss';
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

const WalletTable = ({
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

	const changePage = (value: number) => {
		setPageNumber(value);
	};
	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	// useEffect(() => {
	// 	setTotalRows(apiRes?.items?.length);
	// }, [apiRes]);

	interface Column {
		id:
			| 'date_created'
			| 'time'
			| 'target'
			| 'country'
			| 'operator_name'
			| 'amount'
			| 'status';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}

	interface ColumnForPdf {
		id:
			| 'date_created'
			| 'time'
			| 'target'
			| 'country'
			| 'operator_name'
			| 'amount'
			| 'status';
		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}

	const columns: Column[] = [
		{
			id: 'date_created',
			label: `DATE`,
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'time',
			label: 'TIME',
			align: 'left',
			minWidth: 100,
		},
		{ id: 'target', label: 'TARGET', align: 'left', minWidth: 100 },
		{ id: 'country', label: 'COUNTRY', align: 'left', minWidth: 100 },
		{
			id: 'operator_name',
			label: 'OPERATOR NAME',
			align: 'left',
			minWidth: 100,
		},
		{ id: 'amount', label: 'AMOUNT', align: 'left', minWidth: 100 },
		{ id: 'status', label: 'STATUS', align: 'center', minWidth: 100 },
	];

	const columnForPdf: ColumnForPdf[] = [
		{
			id: 'date_created',
			label: `DATE`,
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'time',
			label: 'TIME',
			align: 'left',
			minWidth: 100,
		},
		{ id: 'target', label: 'TARGET', align: 'left', minWidth: 100 },
		{ id: 'country', label: 'COUNTRY', align: 'left', minWidth: 100 },
		{
			id: 'operator_name',
			label: 'OPERATOR NAME',
			align: 'left',
			minWidth: 100,
		},
		{ id: 'amount', label: 'AMOUNT', align: 'left', minWidth: 100 },
		{ id: 'status', label: 'STATUS', align: 'center', minWidth: 100 },
	];
	let dataColumnForCsv: any[] = [];
	columns.map((col) => dataColumnForCsv.push(col.id));

	const options = {
		fieldSeparator: ',',
		quoteStrings: '"',
		decimalSeparator: '.',
		showLabels: true,
		showTitle: true,
		title: 'WalletData',
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
			XLSX.writeFile(workBook, 'walletdata.xlsx');
			setExcel(false);
		}
		if (pdf) {
			const doc = new jsPDF();
			doc.text('wallet Data', 20, 10);
			autoTable(doc, {
				theme: 'grid',
				columns: columnForPdf.map((col) => ({ ...col, dataKey: col.id })),
				body: apiRes.items,
			});

			doc.save('wallet Table.pdf');

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
			target: string,
			country: string,
			operator_name: string,
			amount: number,
			status: null | string
		) => ({
			date_created:
				date_created && format(parseISO(date_created), 'd MMM yyyy'),
			time: date_created && format(parseISO(date_created), 'p'),
			target: target,
			country: country,
			operator_name: operator_name,
			amount: (
				<NumberFormat
					value={Number(amount)}
					displayType={'text'}
					thousandSeparator={true}
					prefix={'₦'}
				/>
			),
			status: status ? (
				<span
					className={Styles.tableSpan}
					style={{
						backgroundColor:
							(status === 'Success' && 'rgba(93, 204, 150, 0.17)') ||
							(status === 'Failed' && 'rgba(247, 23, 53, 0.17)') ||
							(status === 'Reversed' && 'rgba(255, 184, 0, 0.2)') ||
							'rgba(169, 170, 171, 0.22)',
						color:
							(status === 'Success' && '#29BF12') ||
							(status === 'Failed' && '#F71735') ||
							(status === 'Reversed' && '#9C7000') ||
							'#002841',
					}}>
					{status}
				</span>
			) : (
				'No Status'
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
						each.target,
						each.country,
						each.operator_name,
						each.amount,
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
		</>
	);
};

export default WalletTable;
