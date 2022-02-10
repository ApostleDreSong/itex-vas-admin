import React, { useEffect, useState } from 'react';
import styles from './TopUpDetails.module.scss';
import Grid from '@mui/material/Grid';
import NavBar from '../navbar/NavBar';
import { withRouter } from 'react-router';
import axios from 'axios';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { TopUpDetailsTypes, TopUpLogTypes } from '../../types/UserTableTypes';
import NumberFormat from 'react-number-format';
import { format, parseISO } from 'date-fns';

function TopUpDetails() {
	const [apiRes, setApiRes] = useState<TopUpLogTypes>();
	const location = useLocation();

	const urlId = Number(location.pathname.split('/')[2]);

	useEffect(() => {
		axios
			.get<TopUpLogTypes>(`/api/v1/merchant/dashboard/merchant/topup/all`)
			.then((res: any) => {
				setApiRes(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	const dataValue = apiRes?.items?.filter((item: any) => item.id === urlId);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				backgroundColor: '#F5F5F5',
				height: '100vh',
			}}>
			<NavBar name={`Top Up Log > ${urlId}`} />
			{dataValue && (
				<div className={styles.wrapper}>
					<div className={styles.amountcontainer}>
						<h5 className={styles.amountcontainerh5}>AMOUNT</h5>
						<div className={styles.amountbottom}>
							<h4 className={styles.amountbottomh5}>
								{' '}
								<span className={styles.littlewords}>₦</span>
								{dataValue && (
									<NumberFormat
										value={Number(dataValue[0]?.amount)}
										displayType={'text'}
										thousandSeparator={true}
									/>
								)}
								<span className={styles.littlewords}>.00</span>
							</h4>
							<p className={styles.amountbottomp}>{dataValue[0]?.status}</p>
						</div>
					</div>

					<div className={styles.transaction}>
						<h2 className={styles.transactionh2}>Details</h2>
						<div style={{ margin: '20px 0px' }}>
							<Grid container spacing={2}>
								<Grid item xs={12} md={4} lg={2}>
									<div className={styles.flexdetails}>
										<h4 className={styles.flexdetailsh4}>TIME</h4>
										<p className={styles.flexdetailsP}>
											{dataValue[0]?.date_created &&
												format(parseISO(dataValue[0]?.date_created), 'p')}
										</p>
									</div>
								</Grid>
								<Grid item xs={12} md={4} lg={2}>
									<div className={styles.flexdetails}>
										<h4 className={styles.flexdetailsh4}>DATE</h4>
										<p className={styles.flexdetailsP}>
											{dataValue[0]?.date_created &&
												format(
													parseISO(dataValue[0]?.date_created),
													'dd MMM yyyy'
												)}
										</p>
									</div>
								</Grid>
								<Grid item xs={12} md={4} lg={2}>
									<div className={styles.flexdetails}>
										<h4 className={styles.flexdetailsh4}>SYSTEM REFERENCE</h4>
										<p className={styles.flexdetailsP}>
											{dataValue[0]?.system_reference}
										</p>
									</div>
								</Grid>
								<Grid item xs={12} md={4} lg={2}>
									<div className={styles.flexdetails}>
										<h4 className={styles.flexdetailsh4}>CUSTOMER REFERENCE</h4>
										<p className={styles.flexdetailsP}>
											{' '}
											{dataValue[0]?.customer_reference}
										</p>
									</div>
								</Grid>
								<Grid item xs={12} md={4} lg={2}>
									<div className={styles.flexdetails}>
										<h4 className={styles.flexdetailsh4}>OPERATOR REFERENCE</h4>
										<p className={styles.flexdetailsP}>
											{' '}
											{dataValue[0]?.operator_reference}
										</p>
									</div>
								</Grid>

								<Grid item xs={12} md={4} lg={2}>
									<div className={styles.flexdetails}>
										<h4 className={styles.flexdetailsh4}>TARGET</h4>
										<p className={styles.flexdetailsP}>
											{' '}
											{dataValue[0]?.target}
										</p>
									</div>
								</Grid>
								<Grid item xs={12} md={4} lg={2}>
									<div className={styles.flexdetails}>
										<h4 className={styles.flexdetailsh4}>TRANSACTION TYPE</h4>
										<p className={styles.flexdetailsP}>Airtime</p>
									</div>
								</Grid>

								<Grid item xs={12} md={4} lg={2}>
									<div className={styles.flexdetails}>
										<h4 className={styles.flexdetailsh4}>COUNTRY</h4>
										<p className={styles.flexdetailsP}>
											{' '}
											{dataValue[0]?.country}
										</p>
									</div>
								</Grid>
								<Grid item xs={12} md={4} lg={2}>
									<div className={styles.flexdetails}>
										<h4 className={styles.flexdetailsh4}>OPERATOR NAME</h4>
										<p className={styles.flexdetailsP}>
											{' '}
											{dataValue[0]?.operator_name}
										</p>
									</div>
								</Grid>
								<Grid item xs={12} md={4} lg={2}>
									<div className={styles.flexdetails}>
										<h4 className={styles.flexdetailsh4}>RESPONSE CODE</h4>
										<p className={styles.flexdetailsP}>Bimpe Olajide</p>
									</div>
								</Grid>
								<Grid item xs={12} md={4} lg={2}>
									<div className={styles.flexdetails}>
										<h4 className={styles.flexdetailsh4}>COMPLETED IN</h4>
										<p className={styles.flexdetailsP}>0m 45s</p>
									</div>
								</Grid>
								<Grid item xs={12} md={4} lg={2}>
									<div className={styles.flexdetails}>
										<h4 className={styles.flexdetailsh4}>CHANNEL</h4>
										<p className={styles.flexdetailsP}>API</p>
									</div>
								</Grid>
							</Grid>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default withRouter(TopUpDetails);
