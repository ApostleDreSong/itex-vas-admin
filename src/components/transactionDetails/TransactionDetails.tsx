import React, { useEffect, useState } from 'react';
import styles from './Transaction.module.scss';
import Grid from '@mui/material/Grid';
import NavBar from '../navbar/NavBar';
import NumberFormat from 'react-number-format';
import CopyIcon from '../../assets/images/copy.svg';
import CopyText from '../../helpers/CopyToClipBoard';
import { openToastAndSetContent } from '../../redux/actions/toast/toastActions';
import { useDispatch } from 'react-redux';
import CheckIcon from '@mui/icons-material/Check';
import walletType from '../../assets/images/mastercardtype.png';
import { ReactComponent as Mastercard } from '../../assets/images/mastercard.svg';

import atm from '../../assets/images/Cardordtype.png';
import Ip from '../../assets/images/IpIcon.svg';
import device from '../../assets/images/DeviceIcon.svg';
import attempts from '../../assets/images/AttemptIcon.svg';
import error from '../../assets/images/exclaimationIcon.svg';
import { withRouter } from 'react-router';

import axios from 'axios';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { mainTransactionTypes } from '../../types/UserTableTypes';
import { format, parseISO } from 'date-fns';

function TransactionDetails() {
	const dispatch = useDispatch();
	const [apiRes, setApiRes] = useState<mainTransactionTypes>();
	const location = useLocation();

	const { access_token } = useSelector(
		(state) => state?.authReducer?.auth?.token
	);

	const urlId = Number(location.pathname.split('/')[2]);

	useEffect(() => {
		axios
			.get<mainTransactionTypes>(
				`${process.env.REACT_APP_ROOT_URL}/api/v1/merchant/dashboard/merchant/transactions/all`,
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
	}, [access_token]);

	const dataValue = apiRes?.items?.filter((item: any) => item.id === urlId);
	const enStyles = {
		productId: {
			fontWeight: 800,
			padding: '0 5px',
		},
		toast: {
			backgroundColor: '#d4edda',
			color: '#155724',
			border: '1px solid #c3e6cb',
			fontWeight: 400,
		},
		filterIconStart: {
			width: '80%',
		},
		toastContainer: {
			display: 'flex',
			alignItems: 'center',
		},
		modalContainer: {
			display: 'grid',
		},
		tabIcon: {
			width: '30px',
			height: '30px',
			display: 'grid',
			alignItems: 'center',
			margin: 'auto 0',
			'& > img': {
				width: '100%',
				height: '100%',
				object: 'cover',
			},
		},
		tabLabel: {
			display: 'flex',
			width: '100%',
			justifyContent: 'space-between',
			alignItems: 'center',
		},
		labelIcon: {
			marginLeft: 'auto',
		},
		search: {
			background: '#494949',
			boxShadow: 'none !important',
		},
	};

	const copyId = (Id: string | number): any => {
		CopyText(Id);
		dispatch(
			openToastAndSetContent({
				toastContent: (
					<div style={enStyles.toastContainer}>
						<CheckIcon />
						<span style={enStyles.productId}> {Id} </span> <span>Copied</span>
					</div>
				),
				toastStyles: enStyles.toast,
			})
		);
	};

	const datatype = [
		{
			time: '02:30',
			desc: 'Attempted to paid with card',
			status: 'pending',
		},
		{
			time: '02:30',
			desc: 'successfully paid with card',
			status: 'success',
		},
		{
			time: '02:30',
			desc: 'successfully paid with card',
			status: 'success',
		},
	];
	return (
		<div className={styles.master_div}>
			<NavBar name={`Transactions > ${urlId}`} />
			<div className={styles.wrapper}>
				<div className={styles.wrapperLeft}>
					<div className={styles.messageTop}>
						<p className={styles.messageTopP}>Details</p>
						{/* <ClearOutlinedIcon
							style={{ cursor: 'pointer' }}
							onClick={DetailsCancelHandler}
							sx={{ color: 'rgba(0, 40, 65, 0.5)' }}
						/> */}
					</div>
					{dataValue && (
						<div className={styles.middleInput}>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<div className={styles.headingWrapperflex}>
										<div className={styles.amountLeft}>
											<h5 className={styles.amountLefth5}>Amount</h5>
											<h2 className={styles.amountLefth2}>
												<NumberFormat
													value={dataValue[0].amount}
													displayType={'text'}
													thousandSeparator={true}
													prefix={'₦'}
													suffix={'.00'}
												/>
											</h2>
										</div>
										<div
											className={styles.tableSpan}
											style={{
												backgroundColor: 'rgba(93, 204, 150, 0.17)',
												borderRadius: '33px',
												color: '#29BF12',
												padding: '3px 12px',
											}}>
											{dataValue[0].status}
										</div>
									</div>
								</Grid>

								<Grid item xs={12}>
									<div className={styles.listwrapper}>
										<div className={styles.listleft}>
											<p className={styles.listleftp1}>Date</p>{' '}
										</div>
										<div className={styles.listright}>
											<p className={styles.listleftp2}>
												{dataValue[0]?.date_created &&
													format(
														parseISO(dataValue[0]?.date_created),
														'dd MMM yyyy p'
													)}
											</p>
										</div>
									</div>
								</Grid>
								{/* <Grid item xs={12}>
									<div className={styles.listwrapper}>
										<div className={styles.listleft}>
											<p className={styles.listleftp1}>Customer Name</p>{' '}
										</div>
										<div className={styles.listright}>
											<p className={styles.listleftp2}>Morenike Oni</p>
										</div>
									</div>
								</Grid> */}
								<Grid item xs={12}>
									<div className={styles.listwrapper}>
										<div className={styles.listleft}>
											<p className={styles.listleftp1}>Reference ID</p>{' '}
										</div>
										<div className={styles.listright}>
											<p className={styles.listleftp2}>
												{dataValue[0].transaction_reference} &nbsp;
												<span
													style={{ cursor: 'pointer' }}
													onClick={() =>
														copyId(`${dataValue[0].transaction_reference}`)
													}>
													<img alt='' src={CopyIcon} />
												</span>
											</p>
										</div>
									</div>
								</Grid>
								<Grid item xs={12}>
									<div className={styles.listwrapper}>
										<div className={styles.listleft}>
											<p className={styles.listleftp1}>Transaction Type</p>{' '}
										</div>
										<div className={styles.listright}>
											<p className={styles.listleftp2}>
												{dataValue[0].transaction_type}
											</p>
										</div>
									</div>
								</Grid>
								<Grid item xs={12}>
									<div className={styles.listwrapper}>
										<div className={styles.listleft}>
											<p className={styles.listleftp1}>Earnings</p>{' '}
										</div>
										<div className={styles.listright}>
											<p className={styles.listleftp2}>
												<NumberFormat
													value={dataValue[0].amount}
													displayType={'text'}
													thousandSeparator={true}
													prefix={'₦'}
													suffix={'.00'}
												/>
											</p>
										</div>
									</div>
								</Grid>
								<Grid item xs={12}>
									<div className={styles.listwrapper}>
										<div className={styles.listleft}>
											<p className={styles.listleftp1}>Narration</p>{' '}
										</div>
										<div className={styles.listright}>
											<p className={styles.listleftp2}>
												{' '}
												{dataValue[0].narration}
											</p>
										</div>
									</div>
								</Grid>
							</Grid>
						</div>
					)}
				</div>
				<div className={styles.wrapperRight}>
					<div className={styles.messageTop}>
						<p className={styles.messageTopP}>Analytics</p>
						{/* <ClearOutlinedIcon
							style={{ cursor: 'pointer' }}
							onClick={DetailsCancelHandler}
							sx={{ color: 'rgba(0, 40, 65, 0.5)' }}
						/> */}
					</div>
					<div className={styles.middleInput}>
						<div className={styles.firstContainer}>
							<div className={styles.firstContainerComp}>
								<div className={styles.firstContainerComp_left}>
									<img src={walletType} alt='' className={styles.img_first} />
								</div>
								<div className={styles.firstContainerComp_right}>
									<p className={styles.firstContainerCom_pH}>Card Type</p>
									<p className={styles.firstContainerComp_pC}>
										{' '}
										<Mastercard /> &nbsp;Mastercard
									</p>
								</div>
							</div>
							<div className={styles.firstContainerComp}>
								<div className={styles.firstContainerComp_left}>
									<img src={atm} alt='' className={styles.img_first} />
								</div>
								<div className={styles.firstContainerComp_right}>
									<p className={styles.firstContainerCom_pH}>Card number</p>
									<p className={styles.firstContainerComp_pC}>
										1234 5945 **** 0220
									</p>
								</div>
							</div>
							<div className={styles.firstContainerComp}>
								<div className={styles.firstContainerComp_left}>
									<img src={Ip} alt='' className={styles.img_first} />
								</div>
								<div className={styles.firstContainerComp_right}>
									<p className={styles.firstContainerCom_pH}>IP Address</p>
									<p className={styles.firstContainerComp_pC}>192.148.2.1</p>
								</div>
							</div>
						</div>
						<hr className={styles.lines} />
						<div className={styles.secondContainer}>
							<div className={styles.secondContainerLeft}>
								<div className={styles.rounded}>
									<p className={styles.roundedp1}>20</p>
									<p className={styles.roundedp2}>MINUTES</p>
									<p className={styles.roundedp3}>Spend on page</p>
								</div>
							</div>
							<div className={styles.secondContainerRight}>
								<div className={styles.firstContainerCompS}>
									<div className={styles.firstContainerComp_left}>
										<img src={device} alt='' className={styles.img_first} />
									</div>
									<div className={styles.firstContainerComp_right}>
										<p className={styles.firstContainerCom_pH}>DEVICE TYPE</p>
										<p className={styles.firstContainerComp_pC}>Mobile</p>
									</div>
								</div>
								<div className={styles.firstContainerCompS}>
									<div className={styles.firstContainerComp_left}>
										<img src={attempts} alt='' className={styles.img_first} />
									</div>
									<div className={styles.firstContainerComp_right}>
										<p className={styles.firstContainerCom_pH}>ATTEMPTS</p>
										<p className={styles.firstContainerComp_pC}>1 Attempt</p>
									</div>
								</div>
								<div className={styles.firstContainerCompS}>
									<div className={styles.firstContainerComp_left}>
										<img src={error} alt='' className={styles.img_first} />
									</div>
									<div className={styles.firstContainerComp_right}>
										<p className={styles.firstContainerCom_pH}>ERRORS</p>
										<p className={styles.firstContainerComp_pE}>0 Errors</p>
									</div>
								</div>
							</div>
						</div>

						<hr className={styles.liness} />

						<div className={styles.thirdContainer}>
							{datatype.map((data) => (
								<div className={styles.list_step}>
									<p className={styles.list_step_time}>{data.time}</p>
									<div
										style={{
											background:
												data.status === 'pending' ? '#002841' : '#29BF12',
										}}
										className={styles.list_step_empty}></div>
									<p className={styles.list_step_desc}>{data.desc}</p>
									<div className={styles.vl}></div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
// import mastercard from '../../assets/images/mastercard.svg';
// import atm from '../../assets/images/Cardordtype.png';
// import Ip from '../../assets/images/IpIcon.svg';
// import device from '../../assets/images/DeviceIcon.svg';
// import attempts from '../../assets/images/AttemptIcon.svg';
// import error from '../../assets/images/exclaimationIcon.svg';

export default withRouter(TransactionDetails);
