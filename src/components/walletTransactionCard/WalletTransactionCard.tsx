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

function WalletTransactionCard(props: TransactionCardInfoTypes) {
	return (
		<div className={styles.box_container}>
			<div className={styles.box_top}>
				<div className={styles.box_top_left}>
					{props.item_name === 'Current Balance' && (
						<img src={peoplewallet} alt='' />
					)}
					{props.item_name === 'Transaction Volume' && (
						<img src={peoplebalance} alt='' />
					)}
					{props.item_name === 'Total Earned' && (
						<img src={peopleearned} alt='' />
					)}
				</div>
				<div className={styles.box_top_right}>
					<h4 className={styles.box_top_right_h4}>{props.item_name}</h4>
					<h6 className={styles.box_top_right_h6}>
						{props.item_name === 'Current Balance' ? (
							<NumberFormat
								value={Number(props.total_sum)}
								displayType={'text'}
								thousandSeparator={true}
								prefix={'₦'}
								suffix={'.00'}
							/>
						) : props.item_name === 'Transaction Volume' ? (
							<NumberFormat
								value={Number(props.total_sum)}
								displayType={'text'}
								thousandSeparator={true}
							/>
						) : (
							FormatCash(props.total_sum)
						)}
					</h6>
					<div className={styles.box_top_right_wrap}>
						<div
							className={styles.box_top_right_wrap_container}
							style={{
								background:
									props.percent_change >= 0
										? 'rgba(93, 204, 150, 0.17)'
										: 'rgba(204, 68, 81, 0.3)',
								color: props.percent_change >= 0 ? '#29bf12' : '#ED2D3F',
							}}>
							<div>
								{props.percent_change >= 0 && <KeyboardArrowUpIcon />}
								{props.percent_change < 0 && <KeyboardArrowDownIcon />}
							</div>
							<div>{props.percent_change}%</div>
						</div>
						<div className={styles.box_top_right_wrap_date}>
							<p className={styles.box_top_right_wrap_p}>
								{/* today,{format(parseISO(props.current_date), 'dd MMM yyyy')} */}
								today,{props.current_date}
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WalletTransactionCard;
