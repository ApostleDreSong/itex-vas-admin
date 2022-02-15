import React from 'react';
import TransactionCardInfoTypes from '../../types/TransactionCardInfoTypes';
import peopleearned from '../../assets/images/EarnedIcon.svg';
import peoplewallet from '../../assets/images/walletIconwallet.svg';
import peoplebalance from '../../assets/images/walletPeopleIcon.svg';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NumberFormat from 'react-number-format';
import styles from './WalletTransactionCard.module.scss';
import { format, parseISO } from 'date-fns';
import FormatCash from '../../helpers/FormatNumber';

interface InfoTypes {
	content: number | undefined;
	previous_content: number | undefined;
	title: string;
	img: string;
	dateEvent: string;
}

function WalletTransactionCard(props: InfoTypes) {
	const original = Number(props.content);
	const prev = Number(props.previous_content);
	let percent_change = (prev / original) * 100;

	if (isNaN(percent_change)) percent_change = 0;

	return (
		<div className={styles.box_container}>
			<div className={styles.box_top}>
				<div className={styles.box_top_left}>
					<img src={props.img} alt='' />
				</div>
				<div className={styles.box_top_right}>
					<h4 className={styles.box_top_right_h4}>{props.title}</h4>
					<h6 className={styles.box_top_right_h6}>
						{props.title === 'Current Balance' ? (
							<NumberFormat
								value={Number(props.content)}
								displayType={'text'}
								thousandSeparator={true}
								prefix={'₦'}
								suffix={'.00'}
							/>
						) : props.title === 'Transaction Volume' ? (
							<NumberFormat
								value={Number(props.content)}
								displayType={'text'}
								thousandSeparator={true}
							/>
						) : (
							FormatCash(props.content)
						)}
					</h6>
					<div className={styles.box_top_right_wrap}>
						<div
							className={styles.box_top_right_wrap_container}
							style={{
								background:
									percent_change >= 0
										? 'rgba(93, 204, 150, 0.17)'
										: 'rgba(204, 68, 81, 0.3)',
								color: percent_change >= 0 ? '#29bf12' : '#ED2D3F',
							}}>
							<div>
								{percent_change >= 0 && <KeyboardArrowUpIcon />}
								{percent_change < 0 && <KeyboardArrowDownIcon />}
							</div>
							<div>{percent_change}%</div>
						</div>
						<div className={styles.box_top_right_wrap_date}>
							<p className={styles.box_top_right_wrap_p}>
								{/* today,{format(parseISO(props.current_date), 'dd MMM yyyy')} */}
								{props.dateEvent}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WalletTransactionCard;
