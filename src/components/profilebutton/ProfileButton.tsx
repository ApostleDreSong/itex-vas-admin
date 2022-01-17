import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
// import UserIcon from '../../assets/images/user.png';
import styles from './Profilebutton.module.scss';
import SettingsIcon from '../../assets/images/settings.svg';
import HelpIcon from '../../assets/images/help.svg';
import PrivacyIcon from '../../assets/images/privacy.svg';
import SignOutIcon from '../../assets/images/signout.svg';
import Testimg from '../../assets/images/testimg.png';
import { makeStyles } from '@material-ui/styles';

import { useHistory } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logOut } from '../../redux/actions/auth/authActions';

export default function ProfileButton() {
	// const dispatch = useDispatch();
	// const { first_name, last_name, email_address, avatar } = useSelector(
	// 	(state) => state?.meReducer?.me?.data?.admin
	// );
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const history = useHistory();

	const useStyles = makeStyles({
		root: {
			'&:hover': {
				background: 'none',
			},
		},
		list: {
			backgroundColor: '#ffffff',
			// width: '10rem',
			overflow: 'hidden',
			color: 'rgba(0, 40, 65, 0.8)',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start',
			justifyContent: 'flex-start',
			padding: '0 10px',
		},
		primary: {
			fontSize: '212px',
		},
		paper: {
			boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.2)',
		},
	});
	const classes = useStyles();

	const handleCloseAccount = () => {
		history.push('/account');
		setAnchorEl(null);
	};

	// const signOutHandler = () => {
	// 	localStorage.clear();
	// 	// dispatch(logOut());
	// 	history.push('/signIn');
	// 	setAnchorEl(null);
	// };

	return (
		<div>
			<Button
				id='fade-button'
				aria-controls='fade-menu'
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}>
				<div className={styles.user_description_image}>
					<img src={Testimg} alt='user-icon' />
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
				classes={{
					list: classes.list,
					paper: classes.paper,
					root: classes.root,
				}}>
				<MenuItem onClick={handleClose}>
					<div className={styles.userdetails}>
						<div className={styles.username}>Olowo Kosh</div>
						<div className={styles.usermail}>olowosusiayo@gmail.com</div>
					</div>
				</MenuItem>
				<MenuItem>
					<div className={styles.account} onClick={handleCloseAccount}>
						<div>
							<img src={SettingsIcon} alt='' />
						</div>
						<div className={styles.accountDetail}>My Account</div>
					</div>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<div className={styles.account}>
						<div>
							<img src={HelpIcon} alt='' />
						</div>
						<div className={styles.accountDetail}>Help</div>
					</div>
				</MenuItem>
				<MenuItem onClick={handleClose}>
					<div className={styles.account}>
						<div>
							<img src={PrivacyIcon} alt='' />
						</div>
						<div className={styles.accountDetail}>Privacy</div>
					</div>
				</MenuItem>

				<MenuItem>
					<div className={styles.account}>
						<div>
							<img src={SignOutIcon} alt='' />
						</div>
						<div className={styles.signOut}>Sign Out</div>
					</div>
				</MenuItem>
			</Menu>
		</div>
	);
}
