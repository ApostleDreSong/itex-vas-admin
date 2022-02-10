import React, { useState, useEffect, useCallback } from 'react';
import NumberFormat from 'react-number-format';
import OperantTable from '../table/OperantTable';
import TableElementSymbol from '../TableElementSymbol';
import axios from 'axios';
import styles from './DashboardProductTable.module.scss';
import { useSelector } from 'react-redux';
import { dashboardDataTypes } from '../../types/UserTableTypes';

function DashboardProductTable() {
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
		2
	);
	const [totalRows, setTotalRows] = useState<number>(0);
	const [rows, setRows] = useState<any[]>([]);

	const changePage = (value: number) => {
		setPageNumber(value);
	};
	const limit = (value: number) => {
		setRowsPerPage(value);
	};

	const [apiRes, setApiRes] = useState<dashboardDataTypes>();

	useEffect(() => {
		axios
			.get<dashboardDataTypes>(
				`/api/v1/merchant/dashboard/metric/product/usage?limit=${rowsPerPage}&page=${pageNumber}`
			)
			.then((res: any) => {
				setApiRes(res.data);
			})
			.catch((err) => console.log(err));
	}, [rowsPerPage, pageNumber]);

	useEffect(() => {
		setTotalRows(Number(apiRes?.data?.length));
	}, [apiRes]);

	interface Column {
		id: 'name' | 'amount' | 'count';

		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}

	const columns: Column[] = [
		{
			id: 'name',
			label: <TableElementSymbol title='PRODUCT TYPE' />,
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'amount',
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
			name: string | number,
			amount: string | number,
			count: number | string
		) => ({
			name: name,
			amount: (
				<NumberFormat
					value={Number(amount)}
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
			apiRes?.data?.length !== 0 &&
			apiRes?.data?.map((each: any) =>
				newRowOptions.push(
					LoanRowTab(each.id, each.name, each.amount, each.count)
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
