import React, { useState, useEffect } from 'react';
import BarTopFilterDate from '../barTopFilterDate/BarTopFilterDate';
import PieChart from '../pieChart/PieChart';
import styles from './Summary.module.scss';
import NumberFormat from 'react-number-format';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import handoff from '../../assets/images/handoff.svg';
import count from '../../assets/images/totalcount.svg';
import PieChart2 from '../pieChart2/PieChart2';
import { useSelector } from 'react-redux';
import { summaryDashboardDetailsTypes } from '../../types/UserTableTypes';
import axios from 'axios';
import moment from 'moment';
import { DateRange } from '@mui/lab/DateRangePicker';
import { format, parseISO } from 'date-fns';

function Summary() {
	const [lactive, setLActive] = React.useState<boolean>(true);
	const [dateEvent, setDateEvent] = React.useState<string>('today');
	const [info, setInfo] = useState<summaryDashboardDetailsTypes>();
	const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
	const [customDate, setCustomDate] = React.useState<string[]>([]);

	const { access_token } = useSelector(
		(state) => state?.authReducer?.auth?.token
	);

	//date
	const now = new Date();
	const date = moment().format('YYYY-MM-DD');
	const yesterday = moment().subtract(1, 'day').format('YYYY-MM-DD');
	const sevenDaysAgo = moment().subtract(7, 'day').format('YYYY-MM-DD');
	const thirtyDaysAgo = moment().subtract(30, 'day').format('YYYY-MM-DD');
	// const lastWeekStart = moment(date).weekday(-6).format('YYYY-MM-DD');
	// const lastWeekEnd = moment(date).weekday(1).format('YYYY-MM-DD');
	// const thisWeekStart = moment(date).weekday(1).format('YYYY-MM-DD');
	// const startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
	// const startOfLastMonth = moment()
	// 	.subtract(1, 'month')
	// 	.startOf('month')
	// 	.format('YYYY-MM-DD');
	// const endOfLastMonth = moment()
	// 	.subtract(1, 'month')
	// 	.endOf('month')
	// 	.format('YYYY-MM-DD');
	const startOfYear = moment().startOf('year').format('YYYY-MM-DD');
	const endOfYear = moment().endOf('year').format('YYYY-MM-DD');

	useEffect(() => {
		const data = value.map((dat) => {
			let date;
			let d = new Date(`${dat}`).toLocaleDateString().split('/');
			let y = d.splice(-1)[0];

			d.splice(0, 0, y);

			date = d.join('-');
			return date;
		});

		setCustomDate(data);
	}, [value]);

	useEffect(() => {
		axios
			.get<summaryDashboardDetailsTypes>(
				dateEvent === 'yesterday'
					? `${process.env.REACT_APP_ROOT_URL}/api/v1/merchant/dashboard/metric/summary?FromDate=${yesterday}&ToDate=${date}`
					: dateEvent === 'last7days'
					? `${process.env.REACT_APP_ROOT_URL}/api/v1/merchant/dashboard/metric/summary?FromDate=${sevenDaysAgo}&ToDate=${date}`
					: dateEvent === 'last30days'
					? `${process.env.REACT_APP_ROOT_URL}/api/v1/merchant/dashboard/metric/summary?FromDate=${thirtyDaysAgo}&ToDate=${date}`
					: dateEvent === 'year'
					? `${process.env.REACT_APP_ROOT_URL}/api/v1/merchant/dashboard/metric/summary?FromDate=${startOfYear}&ToDate=${endOfYear}`
					: dateEvent === 'custom' &&
					  customDate[0] !== 'Invalid Date' &&
					  customDate[1] !== 'Invalid Date'
					? `${process.env.REACT_APP_ROOT_URL}/api/v1/merchant/dashboard/metric/summary?FromDate=${customDate[0]}&ToDate=${customDate[1]}`
					: `${process.env.REACT_APP_ROOT_URL}/api/v1/merchant/dashboard/metric/summary?FromDate=${date}&ToDate=${date}`,
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				}
			)
			.then((res: any) => {
				setInfo(res.data);
			})
			.catch((err) => console.log(err));
	}, [
		access_token,
		date,
		dateEvent,
		endOfYear,
		sevenDaysAgo,
		startOfYear,
		thirtyDaysAgo,
		yesterday,
		customDate,
	]);

	return (
		<div className={styles.wrapper}>
			<BarTopFilterDate
				title=''
				setDateEvent={setDateEvent}
				dateEvent={dateEvent}
				setValue={setValue}
				value={value}
			/>
			<div className={styles.box}>
				<div className={styles.title_div}>
					<p className={styles.title_p}>Summary</p>
				</div>

				<div className={styles.summary}>
					<div className={styles.summary_left}>
						<div className={styles.chartwrapleft}>
							<div className={styles.iconwrap}>
								<img src={count} alt='' />
							</div>
							<div className={styles.box_top_right_wrap}>
								<div className={styles.boxToday}>
									<h5 className={styles.boxTodayh5}>
										Total Transactions Count
									</h5>
								</div>
								<div className={styles.dataamount}>
									<h4 className={styles.dataamounth4}>
										{
											<NumberFormat
												value={info?.data?.transaction_count?.count}
												displayType={'text'}
												thousandSeparator={true}
												// suffix={''}
											/>
										}
										<span className={styles.spanAmount}>users</span>
									</h4>
								</div>
								<div className={styles.box_split}>
									<>
										{info?.data.transaction_count && (
											<div
												className={styles.box_top_right_wrap_container}
												style={{
													background:
														info?.data?.transaction_count?.percent_change > 0
															? 'rgba(93, 204, 150, 0.17)'
															: 'rgba(204, 68, 81, 0.3)',
													color:
														info?.data?.transaction_count?.percent_change > 0
															? '#29bf12'
															: '#ED2D3F',
												}}>
												<div>
													{info?.data?.transaction_count?.percent_change > 0 ? (
														<KeyboardArrowUpIcon />
													) : (
														<KeyboardArrowDownIcon />
													)}
												</div>
												<div>
													{info?.data?.transaction_count?.percent_change}%
												</div>
											</div>
										)}
									</>
									<div className={styles.box_top_right_wrap_date}>
										<p className={styles.box_top_right_wrap_p}>
											{/* {} */}
											{dateEvent === 'today'
												? `today ${format(now, 'eee, MMM d')}`
												: dateEvent}
										</p>
									</div>
								</div>
							</div>
						</div>

						<hr className={styles.lines} />

						<div className={styles.chartwrapleft}>
							<div className={styles.iconwrap}>
								<img src={handoff} alt='' />
							</div>
							<div className={styles.box_top_right_wrap}>
								<div className={styles.boxToday}>
									<h5 className={styles.boxTodayh5}>
										Total Transactions Amount
									</h5>
								</div>
								<div className={styles.dataamount}>
									<h4 className={styles.dataamounth4}>
										{
											<NumberFormat
												value={info?.data.transaction_amount.amount}
												displayType={'text'}
												thousandSeparator={true}
												prefix={'₦'}
											/>
										}
										{/* <span className={styles.spanAmount}>users</span> */}
									</h4>
								</div>

								<div className={styles.box_split}>
									<>
										{info?.data.transaction_amount && (
											<div
												className={styles.box_top_right_wrap_container}
												style={{
													background:
														info?.data.transaction_amount.percent_change > 0
															? 'rgba(93, 204, 150, 0.17)'
															: 'rgba(204, 68, 81, 0.3)',
													color:
														info?.data.transaction_amount.percent_change > 0
															? '#29bf12'
															: '#ED2D3F',
												}}>
												<div>
													{info?.data.transaction_amount.percent_change > 0 ? (
														<KeyboardArrowUpIcon />
													) : (
														<KeyboardArrowDownIcon />
													)}
												</div>
												<div>
													{info?.data.transaction_amount.percent_change}%
												</div>
											</div>
										)}
									</>

									<div className={styles.box_top_right_wrap_date}>
										<p className={styles.box_top_right_wrap_p}>
											{/* {format(parseISO(apiRes?.page?.today_date), 'eee, MMM d')} */}
											{dateEvent === 'today'
												? `today ${format(now, 'eee, MMM d')}`
												: dateEvent}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.summary_right}>
						<PieChart data={info} />
					</div>
					<div className={styles.summary_right2}>
						<PieChart2 data={info} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Summary;
