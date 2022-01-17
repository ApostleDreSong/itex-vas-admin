import React from 'react';
import styles from './BarTopFilterDate.module.scss';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import TextField from '@mui/material/TextField';
import DateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import InputAdornment from '@mui/material/InputAdornment';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

type TitleProps = {
	title: string;
};

function BarTopFilterDate({ title }: TitleProps) {
	const [anchoredEl, setAnchoredEl] = React.useState<null | HTMLElement>(null);
	const ITEM_HEIGHT = 48;
	const [active, setActive] = React.useState<boolean>(true);
	const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
	const opened = Boolean(anchoredEl);

	const handledClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchoredEl(event.currentTarget);
	};

	const handledClose = () => {
		setAnchoredEl(null);
	};

	const options = ['Export to CSV', 'Export to XLS', 'Export to JPEG'];

	const style = {
		background: active ? '#d7e0eb' : '',
		border: active ? '0.6px solid #aec2d7' : '',
		borderRadius: active ? '4px' : '',
	};

	const clickHandler = (option: string) => {
		handledClose();
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.topHead}>
				<h4 className={styles.topHeadh4}>{title}</h4>
			</div>

			<div className={styles.topOptions}>
				<div style={style} className={styles.content}>
					<h5 className={styles.contenth5}>Today</h5>
				</div>

				<div className={styles.line}></div>

				<div className={styles.content}>
					<h5 className={styles.contenth5}>Yesterday</h5>
				</div>

				<div className={styles.content}>
					<h5 className={styles.contenth5}>Last 7 days</h5>
				</div>

				<div className={styles.content}>
					<h5 className={styles.contenth5}>Last 30 days</h5>
				</div>

				<div className={styles.line}></div>

				<div className={styles.content}>
					<h5 className={styles.contenth5}>This Year</h5>
				</div>

				<div className={styles.line}></div>

				<div className={styles.content}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<DateRangePicker
							startText='Custom'
							value={value}
							onChange={(newValue) => {
								setValue(newValue);
							}}
							renderInput={(startProps, endProps) => (
								<React.Fragment>
									<TextField
										sx={{
											'.MuiTextField-root': {
												background: '#ffffff',
											},
										}}
										InputProps={{
											endAdornment: (
												<InputAdornment position='end'>
													<ArrowDropDownIcon
														style={{ color: 'rgba(0, 40, 65, 0.9)' }}
													/>
												</InputAdornment>
											),
										}}
										size='small'
										{...startProps}
									/>
								</React.Fragment>
							)}
						/>
					</LocalizationProvider>
				</div>

				{/* <div className={styles.vertIcon}>
					<MoreVertIcon style={{ fontSize: '25px' }} />
					<IconButton
						aria-label='more'
						id='long-button'
						aria-controls='long-menu'
						aria-expanded={opened ? 'true' : undefined}
						aria-haspopup='true'
						onClick={handledClick}>
						<MoreVertIcon />
					</IconButton>
					<Menu
						id='long-menu'
						MenuListProps={{
							'aria-labelledby': 'long-button',
						}}
						anchorEl={anchoredEl}
						open={opened}
						onClose={handledClose}
						PaperProps={{
							style: {
								maxHeight: ITEM_HEIGHT * 4.5,
								width: '20ch',

								borderRadius: '4px',
							},
						}}>
						{options.map((option) => (
							<MenuItem key={option} onClick={() => clickHandler(option)}>
								{option}
							</MenuItem>
						))}
					</Menu>
				</div> */}
			</div>
		</div>
	);
}

export default BarTopFilterDate;
