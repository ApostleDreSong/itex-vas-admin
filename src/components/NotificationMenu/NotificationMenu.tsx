import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import styles from './Notificationmenu.module.scss';
// import AddIcon from '../../assets/images/add.svg';
// import MessageIcon from '../../assets/images/message.svg';
// import UsersIcon from '../../assets/images/multipleusers.svg';
// import CategoryIcon from '../../assets/images/category.svg';
// import ShopIcon from '../../assets/images/shop.svg';
// import BundleIcon from '../../assets/images/bundle.svg';
import { makeStyles } from '@material-ui/core/styles';
import BellIcon from '../../assets/images/bell.svg';
import NoteIcon from '../../assets/images/note.svg';
import { NotificationTypes } from '../../types/NotificationTypes';
import axios from 'axios';

const NotificationMenu = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const [notifications, setNotifications] = useState<NotificationTypes[]>([]);

	useEffect(() => {
		axios
			.get<NotificationTypes[]>('mockfolder/notification.json')
			.then((res) => {
				setNotifications(res.data);
			});
	}, []);

	const useStyles = makeStyles({
		list: {
			width: '450px',
			borderTop: '0.65px solid rgba(75, 112, 154, 0.28)',
		},
		root: {
			width: '450px',
		},
		menuItems: {
			display: 'flex',
			alignItems: 'center',
			flexDirection: 'column',
			marginTop: '10px',
		},
	});

	const classes = useStyles();
	return (
		<div>
			<Button
				id='fade-button'
				aria-controls='fade-menu'
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}>
				<div className={styles.bellIcon}>
					<div className={styles.notifier}>
						<p className={styles.notifier_param}>9+</p>
					</div>
					<img src={BellIcon} alt='bell-icon' />
				</div>
			</Button>
			<Menu
				id='fade-menu'
				MenuListProps={{
					'aria-labelledby': 'fade-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
				classes={{ list: classes.list, root: classes.root }}>
				<div className={styles.notifications}>Notifications</div>
				<MenuItem onClick={handleClose} classes={{ root: classes.menuItems }}>
					{notifications.map((content, i) => (
						<div className={styles.buttonMenu} key={i}>
							<div className={styles.messageSection}>
								<div>
									<img
										src={content.profileImg}
										width='30'
										height='30'
										alt=''
										style={{ borderRadius: '50%' }}
									/>
								</div>
								<div className={styles.group}>
									<div className={styles.message}>{content.notification}</div>
									<div className={styles.profile}>
										<img src={NoteIcon} alt='' />
										<div className={styles.seeProfile}>See Profile</div>
									</div>
								</div>
							</div>
							<div className={styles.time}>23h</div>
						</div>
					))}
				</MenuItem>
			</Menu>
		</div>
	);
};

export default NotificationMenu;
