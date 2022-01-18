import React from 'react';
import BarTopFilterDate from '../barTopFilterDate/BarTopFilterDate';
import PieChart from '../pieChart/PieChart';
import styles from './Summary.module.scss';
import NumberFormat from 'react-number-format';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import handoff from '../../assets/images/handoff.svg';
import count from '../../assets/images/totalcount.svg';
import PieChart2 from '../pieChart2/PieChart2';

function Summary() {
	const [lactive, setLActive] = React.useState<boolean>(true);
	return (
		<div className={styles.wrapper}>
			<BarTopFilterDate title='' />
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
												value='40000'
												displayType={'text'}
												thousandSeparator={true}
												// suffix={''}
											/>
										}
										<span className={styles.spanAmount}>users</span>
									</h4>
								</div>
								<div className={styles.box_split}>
									<div
										className={styles.box_top_right_wrap_container}
										style={{
											background: lactive
												? 'rgba(93, 204, 150, 0.17)'
												: 'rgba(204, 68, 81, 0.3)',
											color: lactive ? '#29bf12' : '#ED2D3F',
										}}>
										<div>
											{lactive ? (
												<KeyboardArrowUpIcon />
											) : (
												<KeyboardArrowDownIcon />
											)}
										</div>
										<div>4%</div>
									</div>
									<div className={styles.box_top_right_wrap_date}>
										<p className={styles.box_top_right_wrap_p}>
											{/* {format(parseISO(apiRes?.page?.today_date), 'eee, MMM d')} */}
											today, aug 11
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
												value='40000'
												displayType={'text'}
												thousandSeparator={true}
												// suffix={''}
											/>
										}
										<span className={styles.spanAmount}>users</span>
									</h4>
								</div>
								<div className={styles.box_split}>
									<div
										className={styles.box_top_right_wrap_container}
										style={{
											background: lactive
												? 'rgba(93, 204, 150, 0.17)'
												: 'rgba(204, 68, 81, 0.3)',
											color: lactive ? '#29bf12' : '#ED2D3F',
										}}>
										<div>
											{lactive ? (
												<KeyboardArrowUpIcon />
											) : (
												<KeyboardArrowDownIcon />
											)}
										</div>
										<div>4%</div>
									</div>
									<div className={styles.box_top_right_wrap_date}>
										<p className={styles.box_top_right_wrap_p}>
											{/* {format(parseISO(apiRes?.page?.today_date), 'eee, MMM d')} */}
											today, aug 11
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.summary_right}>
						<PieChart />
					</div>
					<div className={styles.summary_right2}>
						<PieChart2 />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Summary;
