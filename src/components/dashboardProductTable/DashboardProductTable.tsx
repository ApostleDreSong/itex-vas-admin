import React, { useState, useEffect, useCallback } from 'react';
import NumberFormat from 'react-number-format';
import OperantTable from '../table/OperantTable';
import TableElementSymbol from '../TableElementSymbol';
import axios from 'axios';
import styles from './DashboardProductTable.module.scss';

function DashboardProductTable() {
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
				`/mockfolder/dashboardProductTableData.json`
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
		id: 'product_type' | 'paid_amount' | 'count';

		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}

	const columns: Column[] = [
		{
			id: 'product_type',
			label: <TableElementSymbol title='PRODUCT TYPE' />,
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'paid_amount',
			label: <TableElementSymbol title='PAID AMOUNT' />,
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'count',
			label: <TableElementSymbol title='COUNT' />,
			align: 'left',
			minWidth: 100,
		},
	];

	const LoanRowTab = useCallback(
		(
			id: number | string,
			product_type: string | number,
			paid_amount: string | number,
			count: number | string
		) => ({
			product_type: product_type,
			paid_amount: (
				<NumberFormat
					value={Number(paid_amount)}
					displayType={'text'}
					thousandSeparator={true}
					prefix={'₦'}
				/>
			),
			count: count,
		}),
		[]
	);

	useEffect(() => {
		const newRowOptions: any[] = [];
		apiRes &&
			apiRes?.length !== 0 &&
			apiRes?.map((each: any) =>
				newRowOptions.push(
					LoanRowTab(each.id, each.product_type, each.paid_amount, each.count)
				)
			);
		setRows(newRowOptions);
	}, [apiRes, LoanRowTab]);

	return (
		<>
			<h1 className={styles.wrapperh1}>Product Usage</h1>

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

export default DashboardProductTable;
