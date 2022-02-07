import React, { useState, useEffect } from 'react';
import SearchIcon from '../../assets/images/search.svg';
import BellIcon from '../../assets/images/bell.svg';
import UserIcon from '../../assets/images/user.svg';
import styles from './Navbar.module.scss';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotificationMenu from '../NotificationMenu/NotificationMenu';
import ProfileButton from '../profilebutton/ProfileButton';
import Input from '../../components/apaceinput/Input';
import { useSelector } from 'react-redux';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';

type NavProps = {
	name: string;
};

const option = [
	{
		id: 1,
		title: 'Wallet Balance',
	},
];

const options = ['Wallet Balance', 'N 200,000.00', 'Search', 'Profile'];
const ITEM_HEIGHT = 48;

const NavBar = ({ name }: NavProps) => {
	const [isDesktop, setDesktop] = useState(window.innerWidth > 900);

	const updateMedia = () => {
		setDesktop(window.innerWidth > 900);
	};

	const { merchants } = useSelector(
		(state) => state?.meReducer?.me?.merchant_details
	);

	const MuiListItem = withStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'flex-start',
			margin: '10px 5px',
		},
	})(MenuItem);

	useEffect(() => {
		window.addEventListener('resize', updateMedia);
		return () => window.removeEventListener('resize', updateMedia);
	});
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [search, setSearch] = useState();

	const open = Boolean(anchorEl);

	const handleClick = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div style={{ width: '100%' }}>
			{isDesktop ? (
				<div className={styles.navbarContent}>
					<div className={styles.name}>{name}</div>
					<div className={styles.walletInfo}>
						<div className={styles.walletBalance}>
							Wallet Balance:{' '}
							<NumberFormat
								value={Number(merchants[0]?.wallet_balance)}
								displayType={'text'}
								thousandSeparator={true}
								prefix={'₦'}
							/>
						</div>
						<div className={styles.searchIcon}>
							<img src={SearchIcon} alt='search-icon' />
						</div>
						<NotificationMenu />
						<ProfileButton />
					</div>
				</div>
			) : (
				<div className={styles.navbarContent}>
					<div className={styles.name}>{name}</div>
					<div>
						<IconButton
							aria-label='more'
							aria-controls='long-menu'
							aria-haspopup='true'
							onClick={handleClick}>
							<MoreVertIcon />
						</IconButton>
						<Menu
							id='long-menu'
							anchorEl={anchorEl}
							keepMounted
							open={open}
							onClose={handleClose}
							PaperProps={{
								style: {
									maxHeight: ITEM_HEIGHT * 6.5,
									width: '30ch',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									margin: '10px 0',
								},
							}}>
							{/* {options.map((option) => (
                <MenuItem key={option} onClick={handleClose}>
                  {option}
                </MenuItem>
              ))} */}
							{/* <MenuItem onClick={handleClose}> */}
							<MuiListItem onClick={handleClose} className={styles.menuItems}>
								<div className={styles.walletMenu}>Wallet Balance:</div>
								<div className={styles.walletMenu}>
									{' '}
									<NumberFormat
										value={Number(merchants[0]?.wallet_balance)}
										displayType={'text'}
										thousandSeparator={true}
										prefix={'₦'}
									/>
								</div>
							</MuiListItem>
							<MuiListItem
								onClick={handleClose}
								style={{
									border: '1px solid #002841',
									backgroundColor: ' #EBEBEB',
									borderRadius: '4px',
								}}>
								<img src={SearchIcon} alt='' />
								<div className={styles.walleticons}>
									<Input
										style={{
											background: '#EBEBEB',
											borderRadius: '8px',
											borderStyle: 'none',
											color: '#002841',
											padding: '2px',
										}}
										name='Search'
										value={search}
										onChange={(e: any) => setSearch(e.target.value)}
									/>
								</div>
							</MuiListItem>
							<MuiListItem>
								<NotificationMenu />
							</MuiListItem>
							<MuiListItem>
								<ProfileButton />
							</MuiListItem>

							{/* </MenuItem> */}
						</Menu>
					</div>
				</div>
			)}
		</div>
	);
};

export default NavBar;
