import React, { useState, useEffect, useCallback } from 'react';
import styles from './DashboardWalletTable.module.scss';
import NumberFormat from 'react-number-format';
import OperantTable from '../table/OperantTable';
import TableElementSymbol from '../TableElementSymbol';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { dashboardDataTypes } from '../../types/UserTableTypes';
import Skeleton from '@mui/material/Skeleton';

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

	const [apiRes, setApiRes] = useState<dashboardDataTypes>();
	const [loading, setLoading] = React.useState<boolean>(true);

	useEffect(() => {
		axios
			.get<dashboardDataTypes>(
				`/api/v1/merchant/dashboard/metric/wallet/usage?limit=${rowsPerPage}&page=${pageNumber}`
			)
			.then((res: any) => {
				setApiRes(res.data);
				setLoading(false);
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
			label: <TableElementSymbol title='WALLET NAME' />,
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'amount',
			label: <TableElementSymbol title='TOTAL AMOUNT' />,
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'count',
			label: <TableElementSymbol title='TOTAL COUNT' />,
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
			<h1 className={styles.wrapperh1}>Wallet Usage</h1>

			{loading ? (
				<Skeleton
					variant='rectangular'
					animation='wave'
					width='100%'
					height={200}
				/>
			) : (
				<OperantTable
					columns={columns}
					rows={rows}
					totalRows={totalRows}
					changePage={changePage}
					limit={limit}
				/>
			)}
		</>
	);
}

export default DashboardWalletTable;
