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
import { withStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/actions/auth/authActions';
import { saveLoading } from '../../redux/actions/loadingState/loadingStateActions';

export default function ProfileButton() {
	const dispatch = useDispatch();
	const { first_name, last_name, email_address, avatar } = useSelector(
		(state) => state?.meReducer?.me?.user
	);
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
			width: '100%',
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
			// padding: '0 10px',
		},
		primary: {
			fontSize: '212px',
		},
		paper: {
			boxShadow: '0px 4px 11px rgba(0, 0, 0, 0.2)',
		},
	});
	const classes = useStyles();

	const MuiListItem = withStyles({
		root: {
			display: 'flex',
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
			flexDirection: 'column',
			padding: '0 10px',
			// paddingLeft: '10px',
			// width: '100%',
		},
	})(MenuItem);

	const handleRoute = (route: string) => {
		history.push(route);
		setAnchorEl(null);
		handleClose();
	};

	const signOutHandler = () => {
		localStorage.clear();
		dispatch(logOut());
		dispatch(saveLoading(false));
		history.push('/signIn');
		setAnchorEl(null);
	};

	return (
		<div>
			<Button
				id='fade-button'
				aria-controls='fade-menu'
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}>
				<div className={styles.user_description_image}>
					{avatar ? (
						<img
							className={styles.user_description_image_main}
							src={avatar}
							alt=''
						/>
					) : (
						<img
							className={styles.user_description_image_main}
							src='https://i.ibb.co/fH4x0Xk/360-F-346936114-Rax-E6-OQogebg-AWTal-E1myse-Y1-Hbb5q-PM.jpg'
							alt=''
						/>
					)}
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
				<MuiListItem onClick={handleClose}>
					<div className={styles.userdetails}>
						<div className={styles.username}>
							{first_name} {last_name}
						</div>
						<div className={styles.usermail}>{email_address}</div>
					</div>
				</MuiListItem>
				<MuiListItem>
					<div
						className={styles.account}
						onClick={() => handleRoute('/account')}>
						<div>
							<img src={SettingsIcon} alt='' />
						</div>
						<div className={styles.accountDetail}>My Account</div>
					</div>
				</MuiListItem>
				<MuiListItem onClick={() => handleRoute('/help')}>
					<div className={styles.account}>
						<div>
							<img src={HelpIcon} alt='' />
						</div>
						<div className={styles.accountDetail}>Help</div>
					</div>
				</MuiListItem>
				<MuiListItem onClick={() => handleRoute('/privacy')}>
					<div className={styles.account}>
						<div>
							<img src={PrivacyIcon} alt='' />
						</div>
						<div className={styles.accountDetail}>Privacy</div>
					</div>
				</MuiListItem>

				<MuiListItem>
					<div onClick={signOutHandler} className={styles.account}>
						<div>
							<img src={SignOutIcon} alt='' />
						</div>
						<div className={styles.signOut}>Sign Out</div>
					</div>
				</MuiListItem>
			</Menu>
		</div>
	);
}
