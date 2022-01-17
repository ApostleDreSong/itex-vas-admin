import React, { useState, useEffect, useCallback } from 'react';
import styles from './DashboardWalletTable.module.scss';
import NumberFormat from 'react-number-format';
import OperantTable from '../table/OperantTable';
import TableElementSymbol from '../TableElementSymbol';
import axios from 'axios';

function DashboardWalletTable() {
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
		5
	);
	const [totalRows, setTotalRows] = useState<number>(0);
	const [rows, setRows] = useState<any[]>([]);

	const changePage = (value: number) => {
		setPageNumber(value);
	};
	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	const [apiRes, setApiRes] = useState<any>();

	useEffect(() => {
		axios
			.get<any[]>(
				`/mockfolder/dashboardWalletTableData.json`
				// {
				// 	headers: {
				// 		Authorization: `Bearer ${access_token}`,
				// 	},
				// }
			)
			.then((res: any) => {
				setApiRes(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	interface Column {
		id: 'wallet_name' | 'total_amount' | 'total_count';

		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}

	const columns: Column[] = [
		{
			id: 'wallet_name',
			label: <TableElementSymbol title='WALLET NAME' />,
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'total_amount',
			label: <TableElementSymbol title='TOTAL AMOUNT' />,
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'total_count',
			label: <TableElementSymbol title='TOTAL COUNT' />,
			align: 'left',
			minWidth: 100,
		},
	];

	const LoanRowTab = useCallback(
		(
			id: number | string,
			wallet_name: string | number,
			total_amount: string | number,
			total_count: number | string
		) => ({
			wallet_name: wallet_name,
			total_amount: (
				<NumberFormat
					value={Number(total_amount)}
					displayType={'text'}
					thousandSeparator={true}
					prefix={'₦'}
				/>
			),
			total_count: total_count,
		}),
		[]
	);

	useEffect(() => {
		const newRowOptions: any[] = [];
		apiRes &&
			apiRes?.length !== 0 &&
			apiRes?.map((each: any) =>
				newRowOptions.push(
					LoanRowTab(
						each.id,
						each.wallet_name,
						each.total_amount,
						each.total_count
					)
				)
			);
		setRows(newRowOptions);
	}, [apiRes, LoanRowTab]);

	return (
		<>
			<h1 className={styles.wrapperh1}>Wallet Usage</h1>

			<OperantTable
				columns={columns}
				rows={rows}
				totalRows={totalRows}
				changePage={changePage}
				limit={limit}
			/>
		</>
	);
}

export default DashboardWalletTable;
