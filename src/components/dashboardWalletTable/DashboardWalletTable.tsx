import React, { useState, useEffect, useCallback } from 'react';
import styles from './DashboardWalletTable.module.scss';
import NumberFormat from 'react-number-format';
import OperantTable from '../table/OperantTable';
import TableElementSymbol from '../TableElementSymbol';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { dashboardDataTypes } from '../../types/UserTableTypes';

function DashboardWalletTable() {
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [rowsPerPage, setRowsPerPage] = useState<string | number | undefined>(
		5
	);
	const [totalRows, setTotalRows] = useState<number>(0);
	const [rows, setRows] = useState<any[]>([]);

	const { access_token } = useSelector(
		(state) => state?.authReducer?.auth?.token
	);

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
				`${process.env.REACT_APP_ROOT_URL}/api/v1/merchant/dashboard/metric/wallet/usage?limit=${rowsPerPage}&page=${pageNumber}`,
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
	}, [access_token, rowsPerPage, pageNumber]);

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
