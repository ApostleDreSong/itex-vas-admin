import React, { useEffect } from 'react';
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
	setDateEvent: React.Dispatch<React.SetStateAction<string>>;
	setValue: React.Dispatch<React.SetStateAction<DateRange<Date>>>;
	dateEvent: string;
	value: DateRange<Date>;
};

function BarTopFilterDate({
	title,
	setDateEvent,
	dateEvent,
	setValue,
	value,
}: TitleProps) {
	const [anchoredEl, setAnchoredEl] = React.useState<null | HTMLElement>(null);
	const ITEM_HEIGHT = 48;
	const opened = Boolean(anchoredEl);

	const handledClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchoredEl(event.currentTarget);
	};

	const handledClose = () => {
		setAnchoredEl(null);
	};

	const options = ['Export to CSV', 'Export to XLS', 'Export to JPEG'];

	const clickHandler = (option: string) => {
		handledClose();
	};

	const handleClick = (event: any) => {
		setDateEvent(event.currentTarget.getAttribute('data-value'));
		// setDataValue(event.target.getAttribute('data-value'));
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.topHead}>
				<h4 className={styles.topHeadh4}>{title}</h4>
			</div>

			<div className={styles.topOptions}>
				<div
					data-value='today'
					onClick={handleClick}
					style={{
						borderRadius: dateEvent === 'today' ? '4px' : '',
						border: dateEvent === 'today' ? '0.6px solid #aec2d7' : '',
						backgroundColor: dateEvent === 'today' ? '#d7e0eb' : '',
					}}
					className={styles.content}>
					<h5 className={styles.contenth5}>Today</h5>
				</div>
				<div className={styles.line}></div>
				<div
					data-value='yesterday'
					style={{
						borderRadius: dateEvent === 'yesterday' ? '4px' : '',
						border: dateEvent === 'yesterday' ? '0.6px solid #aec2d7' : '',
						backgroundColor: dateEvent === 'yesterday' ? '#d7e0eb' : '',
					}}
					onClick={handleClick}
					className={styles.content}>
					<h5 className={styles.contenth5}>Yesterday</h5>
				</div>
				<div
					data-value='last7days'
					style={{
						borderRadius: dateEvent === 'last7days' ? '4px' : '',
						border: dateEvent === 'last7days' ? '0.6px solid #aec2d7' : '',
						backgroundColor: dateEvent === 'last7days' ? '#d7e0eb' : '',
					}}
					onClick={handleClick}
					className={styles.content}>
					<h5 className={styles.contenth5}>Last 7 days</h5>
				</div>
				<div
					data-value='last30days'
					style={{
						borderRadius: dateEvent === 'last30days' ? '4px' : '',
						border: dateEvent === 'last30days' ? '0.6px solid #aec2d7' : '',
						backgroundColor: dateEvent === 'last30days' ? '#d7e0eb' : '',
					}}
					onClick={handleClick}
					className={styles.content}>
					<h5 className={styles.contenth5}>Last 30 days</h5>
				</div>
				<div className={styles.line}></div>

				<div
					data-value='year'
					style={{
						borderRadius: dateEvent === 'year' ? '4px' : '',
						border: dateEvent === 'year' ? '0.6px solid #aec2d7' : '',
						backgroundColor: dateEvent === 'year' ? '#d7e0eb' : '',
					}}
					onClick={handleClick}
					className={styles.content}>
					<h5 className={styles.contenth5}>This Year</h5>
				</div>
				<div className={styles.line}></div>
				<div
					data-value='custom'
					onClick={handleClick}
					className={styles.content}>
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
										size='small'
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
