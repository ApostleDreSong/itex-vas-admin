import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import styles from './Drawer.module.scss';
import Logo from '../../assets/images/NavLogo.svg';
import { NavLink } from 'react-router-dom';
import DashboardIcon from '../../assets/images/dashboard.svg';
import TransactionsIcon from '../../assets/images/transactions.svg';
import TopupIcon from '../../assets/images/topup.svg';
import WalletIcon from '../../assets/images/wallet.svg';
import AccountIcon from '../../assets/images/account.svg';
import HelpIcon from '../../assets/images/help.svg';
import CollapseIcon from '../../assets/images/collapse.svg';
import PrivacyIcon from '../../assets/images/privacy.svg';
import { useLocation } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { withStyles } from '@material-ui/core/styles';

const drawerContent = [
	{ id: uuidv4(), title: 'Dashboard', route: '/', icon: DashboardIcon },
	{
		id: uuidv4(),
		title: 'Transactions',
		route: '/transactions',
		icon: TransactionsIcon,
	},
	{ id: uuidv4(), title: 'Top Up Log', route: '/topup', icon: TopupIcon },
	{ id: uuidv4(), title: 'Wallet', route: '/wallet', icon: WalletIcon },
	{ id: uuidv4(), title: 'My Account', route: '/account', icon: AccountIcon },
];

const moreContent = [
	{ id: uuidv4(), title: 'Help', route: '/help', icon: HelpIcon },
	{
		id: uuidv4(),
		title: 'Privacy',
		route: '/privacy',
		icon: PrivacyIcon,
	},
];

const drawerWidth = 269;

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: 'hidden',
	background: '#EBEBEB',
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: 'hidden',
	background: '#EBEBEB',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(9)} + 1px)`,
	},
});

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: 'nowrap',
	boxSizing: 'border-box',
	...(open && {
		...openedMixin(theme),
		'& .MuiDrawer-paper': openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		'& .MuiDrawer-paper': closedMixin(theme),
	}),
}));

const MuiListItem = withStyles({
	root: {
		display: 'flex',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
})(ListItem);

export default function MiniDrawer() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(true);
	const [activeNav, setActiveNav] = React.useState(false);

	const { pathname } = useLocation();

	const handleDrawerOpen = () => {
		setOpen(!open);
	};

	const handleDrawerClose = () => {
		setOpen(!open);
	};

	if (pathname.toLowerCase() === '/signin') {
		return <div></div>;
	}
	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />
			<AppBar position='fixed' open={open}></AppBar>
			<Drawer variant='permanent' open={open}>
				<Divider />
				<List>
					<div className={styles.logo}>
						<img src={Logo} alt='' className={styles.logoimg} />
					</div>

					{drawerContent.map(({ route, title, id, icon }) => (
						// <div
						// 	style={{
						// 		display: 'flex',
						// 		flexDirection: 'column',
						// 		alignItems: 'flex-start',
						// 		justifyContent: 'flex-start',
						// 		width: '100%',
						// 	}}>
						<MuiListItem key={id}>
							<NavLink
								to={route}
								key={id}
								exact={true}
								className={styles.drawerList}
								style={{
									background:
										activeNav && title === 'My Account' ? '#D7E0EB' : '',
									width: activeNav && title === 'My Account' ? '100%' : '',
								}}
								activeStyle={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									background: '#D7E0EB',
									borderRadius: '4px',
									width: '100%',
								}}>
								<ListItemIcon>
									<img src={icon} alt='' />
								</ListItemIcon>
								<ListItemText>
									{' '}
									{/* <img src={icon} alt="icons" /> */}
									<div className={styles.title}>{title}</div>
								</ListItemText>
							</NavLink>
						</MuiListItem>
						// </div>
						// <li>kosh</li>
					))}
				</List>
				<Divider />
				<List>
					{moreContent.map(({ route, title, id, icon }) => (
						<MuiListItem key={id}>
							<NavLink
								to={route}
								key={id}
								exact={true}
								className={styles.drawerList}
								activeStyle={{
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									background: '#D7E0EB',
									borderRadius: '4px',
									width: '100%',
								}}>
								<ListItemIcon>
									<img src={icon} alt='icons' />
								</ListItemIcon>
								<ListItemText>
									{/* <img src={icon} alt="icons" /> */}
									<div className={styles.title}>{title}</div>
								</ListItemText>
							</NavLink>
						</MuiListItem>
					))}
				</List>

				{/* <div className={styles.drawerWidth}>
          <ul className={styles.drawerContent}>
            <div className={styles.logo}>
              <img src={Logo} />
              <div className={styles.logoName}>ITEX</div>
            </div>
            {drawerContent.map(({ route, title, id, icon }) => (
              <NavLink
                to={route}
                key={id}
                className={styles.drawerList}
                activeStyle={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-end",
                  background: "#D7E0EB",
                  borderRadius: "4px",
                }}
              >
                <img src={icon} alt="icons" />
                <div className={styles.title}>{title}</div>
              </NavLink>
            ))}

            <div className={styles.moreContent}>
              {moreContent.map(({ route, title, id, icon }) => (
                <NavLink
                  to={route}
                  key={id}
                  className={styles.drawerList}
                  activeStyle={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    background: "#D7E0EB",
                    borderRadius: "4px",
                  }}
                >
                  <img src={icon} alt="icons" />
                  <div className={styles.title}>{title}</div>
                </NavLink>
              ))}
            </div>
          </ul>
        </div> */}
				<DrawerHeader>
					<IconButton></IconButton>
				</DrawerHeader>

				<List>
					{theme.direction === 'rtl' ? null : (
						<MuiListItem onClick={handleDrawerClose}>
							<div className={styles.drawerList}>
								<ListItemIcon>
									<img src={CollapseIcon} alt='icons' className={styles.icon} />
								</ListItemIcon>
								<ListItemText>
									{/* <img src={icon} alt="icons" /> */}
									<div className={styles.title}>Collapse SideBar</div>
								</ListItemText>
							</div>
						</MuiListItem>
					)}
				</List>
			</Drawer>
		</Box>
	);
}

// import React from "react";
// import styles from "./Drawer.module.scss";
// import Logo from "../../assets/images/logo.svg";
// import { NavLink } from "react-router-dom";
// import DashboardIcon from "../../assets/images/dashboard.svg";
// import TransactionsIcon from "../../assets/images/transactions.svg";
// import TopupIcon from "../../assets/images/topup.svg";
// import WalletIcon from "../../assets/images/wallet.svg";
// import AccountIcon from "../../assets/images/account.svg";
// import HelpIcon from "../../assets/images/help.svg";
// import CollapseIcon from "../../assets/images/collapse.svg";
// import PrivacyIcon from "../../assets/images/privacy.svg";

// const drawerContent = [
//   { id: 1, title: "Dashboard", route: "/dashboard", icon: DashboardIcon },
//   {
//     id: 2,
//     title: "Transactions",
//     route: "/transactions",
//     icon: TransactionsIcon,
//   },
//   { id: 3, title: "Top Up Log", route: "/topup", icon: TopupIcon },
//   { id: 4, title: "Wallet", route: "/wallet", icon: WalletIcon },
//   { id: 5, title: "My Account", route: "/account", icon: AccountIcon },
// ];

// const moreContent = [
//   { id: 1, title: "Help", route: "/help", icon: HelpIcon },
//   {
//     id: 2,
//     title: "Privacy",
//     route: "/privacy",
//     icon: PrivacyIcon,
//   },
// ];

// const Drawer = () => {
//   return (
//     <div>
//       <div className={styles.drawerWidth}>
//         <ul className={styles.drawerContent}>
//           <div className={styles.logo}>
//             <img src={Logo} />
//             <div className={styles.logoName}>ITEX</div>
//           </div>
//           {drawerContent.map(({ route, title, id, icon }) => (
//             <NavLink
//               to={route}
//               key={id}
//               className={styles.drawerList}
//               activeStyle={{
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "flex-end",
//                 background: "#D7E0EB",
//                 borderRadius: "4px",
//               }}
//             >
//               <img src={icon} alt="icons" />
//               <div className={styles.title}>{title}</div>
//             </NavLink>
//           ))}

//           <div className={styles.moreContent}>
//             {moreContent.map(({ route, title, id, icon }) => (
//               <NavLink
//                 to={route}
//                 key={id}
//                 className={styles.drawerList}
//                 activeStyle={{
//                   display: "flex",
//                   flexDirection: "row",
//                   alignItems: "flex-end",
//                   background: "#D7E0EB",
//                   borderRadius: "4px",
//                 }}
//               >
//                 <img src={icon} alt="icons" />
//                 <div className={styles.title}>{title}</div>
//               </NavLink>
//             ))}
//           </div>
//           <div className={styles.collapse}>
//             <img src={CollapseIcon} />
//             <div className={styles.collapseText}>Collapse Sidebar</div>
//           </div>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Drawer;
