import React, { useState, ReactNode, useEffect, CSSProperties } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

interface TabType {
	label: ReactNode;
	component?: ReactNode;
}

interface TabsType {
	indicatorColor?: CSSProperties['color'];
	tabsArr: TabType[];
	rootStyle: CSSProperties;
	tabStyle?: CSSProperties;
	tabStyleSelected?: CSSProperties;
	tabStyleNotSelected?: CSSProperties;
	tabParentStyle?: CSSProperties;
}

export default function ZijelaTabs({
	indicatorColor,
	tabsArr,
	tabStyle,
	tabStyleSelected,
	tabStyleNotSelected,
	rootStyle,
	tabParentStyle,
}: TabsType) {
	const [value, setValue] = useState(0);
	const [display, setDisplay] = useState<ReactNode>('');
	const handleChange = (
		event: React.ChangeEvent<Record<string, unknown>>,
		newValue: number
	) => {
		setValue(newValue);
	};

	useEffect(() => {
		if (tabsArr[value]?.component) {
			setDisplay(tabsArr[value]?.component);
		}
	}, [value, tabsArr]);

	const useStyles = makeStyles({
		indicator: {
			backgroundColor: indicatorColor,
			width: '62px',
			height: '4px',
			borderRadius: '80px',
		},
		flexContainer: {
			justifyContent: 'space-between',
		},
		scrollButtons: {
			marginBottom: '13px',
		},
	});
	const classes = useStyles();

	return (
		<div
			style={{
				width: '100%',
				backgroundColor: '#121212',
				color: '#F1F1F0',
				borderRadius: '24px',
				...rootStyle,
			}}>
			<Tabs
				value={value}
				onChange={handleChange}
				variant='scrollable'
				scrollButtons='auto'
				aria-label='loan request details'
				classes={{
					indicator: classes.indicator,
					flexContainer: classes.flexContainer,
					scrollButtons: classes.scrollButtons,
				}}
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					minHeight: 'auto',
					...tabParentStyle,
				}}>
				{tabsArr.map((each, index) => {
					return (
						<Tab
							key={index}
							label={
								<div
									style={{
										width: '100%',
										height: '100%',
										padding: 0,
										margin: 0,
									}}>
									{each.label}
								</div>
							}
							style={{
								minWidth: 'unset',
								fontSize: '12px',
								fontWeight: 500,
								color: '#F1F1F0',
								fontFamily: 'GeometriaBold',
								lineHeight: '18px',
								minHeight: 'auto',
								textTransform: 'initial',
								padding: '0',
								width: '33%',
								...tabStyle,
								...(value === index ? tabStyleSelected : tabStyleNotSelected),
							}}
						/>
					);
				})}
			</Tabs>
			<div style={{ padding: '0 25px' }}>{display}</div>
		</div>
	);
}

ZijelaTabs.defaultProps = {
	tabsArr: [],
	rootStyle: {},
	tabStyle: {},
	tabBackgroundSelected: '#46489a',
	tabColorSelected: 'white',
	tabBackgroundNotSelected: 'white',
	tabColorNotSelected: 'black',
};
