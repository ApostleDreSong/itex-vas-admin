import React, { useState, useEffect, useCallback } from 'react';
import styles from './ReuseableTable.module.scss';
import NumberFormat from 'react-number-format';
import OperantTable from '../table/OperantTable';
import TableElementSymbol from '../TableElementSymbol';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { dashboardTDataTypes, pieTypes } from '../../types/UserTableTypes';
import Skeleton from '@mui/material/Skeleton';

function ReuseableTable() {
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

	const [apiRes, setApiRes] = useState<pieTypes>();
	const [loading, setLoading] = React.useState<boolean>(true);

	useEffect(() => {
		axios
			.get<pieTypes>(`/api/v1/merchant/dashboard/metric/wallet/transactions`)
			.then((res: any) => {
				setApiRes(res.data);
				setLoading(false);
			})
			.catch((err) => console.log(err));
	}, [rowsPerPage, pageNumber]);

	const apiReplaceRes = [
		{
			id: 1,
			name: 'successful wallet transactions',
			amount: apiRes?.data?.success_wallet_transactions?.amount,
			count: apiRes?.data?.success_wallet_transactions?.count,
			percentage: apiRes?.data?.success_wallet_transactions?.percentage,
			status: 'Success',
		},
		{
			id: 2,
			name: 'failed wallet transactions',
			amount: apiRes?.data?.failed_wallet_transactions?.amount,
			count: apiRes?.data?.failed_wallet_transactions?.count,
			percentage: apiRes?.data?.failed_wallet_transactions?.percentage,
			status: 'Failed',
		},
	];

	useEffect(() => {
		setTotalRows(Number(apiReplaceRes?.length));
	}, [apiRes]);

	interface Column {
		id: 'amount' | 'count' | 'percentage';

		label: any;
		minWidth?: number;
		align?: 'right' | 'left' | 'center';
	}

	const columns: Column[] = [
		{
			id: 'amount',
			label: <TableElementSymbol title='AMOUNT' />,
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'count',
			label: <TableElementSymbol title='COUNT' />,
			align: 'left',
			minWidth: 100,
		},
		{
			id: 'percentage',
			label: <TableElementSymbol title='PERCENTAGE' />,
			align: 'left',
			minWidth: 100,
		},
	];

	const LoanRowTab = useCallback(
		(
			id: number | string,
			amount: string | number,
			count: string | number,
			percentage: number | string,
			status: string
		) => ({
			amount: (
				<div className={styles.contentwrap}>
					<div className={styles.content_p}>
						<p>
							{' '}
							<NumberFormat
								value={Number(amount)}
								displayType={'text'}
								thousandSeparator={true}
								prefix={'₦'}
							/>
						</p>
					</div>

					<div
						className={styles.tableSpan}
						style={{
							backgroundColor:
								(status === 'Success' && 'rgba(93, 204, 150, 0.17)') ||
								(status === 'Failed' && 'rgba(247, 23, 53, 0.17)') ||
								(status === 'Cancelled' && 'rgba(255, 184, 0, 0.2)') ||
								'rgba(169, 170, 171, 0.22)',
							color:
								(status === 'Success' && '#29BF12') ||
								(status === 'Failed' && '#F71735') ||
								(status === 'Cancelled' && '#9C7000') ||
								'#002841',
						}}>
						{status}
					</div>
				</div>
			),
			count: count,
			percentage: `${percentage}%`,
		}),
		[]
	);

	useEffect(() => {
		const newRowOptions: any[] = [];
		apiRes &&
			apiReplaceRes?.length !== 0 &&
			apiReplaceRes?.map((each: any) =>
				newRowOptions.push(
					LoanRowTab(
						each.id,
						each.amount,
						each.count,
						each.percentage,
						each.status
					)
				)
			);
		setRows(newRowOptions);
	}, [apiRes, LoanRowTab]);

	return (
		<>
			<h1 className={styles.wrapperh1}>Transaction by Master Wallet</h1>
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

export default ReuseableTable;
