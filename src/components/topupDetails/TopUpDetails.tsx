import React from 'react';
import styles from './TopUpDetails.module.scss';
import Grid from '@mui/material/Grid';
import NavBar from '../navbar/NavBar';

function TopUpDetails() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				backgroundColor: '#F5F5F5',
				height: '100vh',
			}}>
			<NavBar name='Top Up Log > HSGF35TGRGJ' />
			<div className={styles.wrapper}>
				<div className={styles.amountcontainer}>
					<h5 className={styles.amountcontainerh5}>AMOUNT</h5>
					<div className={styles.amountbottom}>
						<h4 className={styles.amountbottomh5}>
							{' '}
							<span className={styles.littlewords}>₦</span>
							3,500
							<span className={styles.littlewords}>.00</span>
						</h4>
						<p className={styles.amountbottomp}>Sucess</p>
					</div>
				</div>

				<div className={styles.transaction}>
					<h2 className={styles.transactionh2}>Details</h2>
					<div style={{ margin: '20px 0px' }}>
						<Grid container spacing={2}>
							<Grid item xs={12} md={4} lg={2}>
								<div className={styles.flexdetails}>
									<h4 className={styles.flexdetailsh4}>TIME</h4>
									<p className={styles.flexdetailsP}>11:30am</p>
								</div>
							</Grid>
							<Grid item xs={12} md={4} lg={2}>
								<div className={styles.flexdetails}>
									<h4 className={styles.flexdetailsh4}>DATE</h4>
									<p className={styles.flexdetailsP}>30 Sept 2021</p>
								</div>
							</Grid>
							<Grid item xs={12} md={4} lg={2}>
								<div className={styles.flexdetails}>
									<h4 className={styles.flexdetailsh4}>SYSTEM REFERENCE</h4>
									<p className={styles.flexdetailsP}>HSGF35TGRGJ</p>
								</div>
							</Grid>
							<Grid item xs={12} md={4} lg={2}>
								<div className={styles.flexdetails}>
									<h4 className={styles.flexdetailsh4}>CUSTOMER REFERENCE</h4>
									<p className={styles.flexdetailsP}>LHR46YGR102</p>
								</div>
							</Grid>
							<Grid item xs={12} md={4} lg={2}>
								<div className={styles.flexdetails}>
									<h4 className={styles.flexdetailsh4}>OPERATOR REFERENCE</h4>
									<p className={styles.flexdetailsP}>JK3BE09JDT</p>
								</div>
							</Grid>

							<Grid item xs={12} md={4} lg={2}>
								<div className={styles.flexdetails}>
									<h4 className={styles.flexdetailsh4}>TARGET</h4>
									<p className={styles.flexdetailsP}>+2349107061526</p>
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
									<p className={styles.flexdetailsP}>Nigeria</p>
								</div>
							</Grid>
							<Grid item xs={12} md={4} lg={2}>
								<div className={styles.flexdetails}>
									<h4 className={styles.flexdetailsh4}>OPERATOR NAME</h4>
									<p className={styles.flexdetailsP}>Bimpe Olajide</p>
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
		</div>
	);
}

export default TopUpDetails;
