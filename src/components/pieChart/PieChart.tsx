import React from 'react';
import {
	PieChart as PI,
	Pie,
	Legend,
	Tooltip,
	Cell,
	ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';

const renderLegend = (props: any) => {
	const { payload } = props;
	const styledwrapper: React.CSSProperties = {
		marginLeft: '-50px',
	};
	const styledli: React.CSSProperties = {
		listStyle: 'none',
		display: 'flex',
		alignItems: 'center',
		marginTop: '20px',
	};
	const styledbox: React.CSSProperties = {
		width: '11px',
		height: '11px',
		background: `${payload.color}`,
		borderRadius: '2px',
	};
	const styledp: React.CSSProperties = {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: '14px',
		lineHeight: '140%',
		color: 'rgba(0, 40, 65, 0.8)',
	};

	const styledContent: React.CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		marginLeft: '10px',
	};

	const styledpT: React.CSSProperties = {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '500',
		fontSize: '14px',
		lineHeight: '140%',
		color: 'rgba(0, 40, 65, 0.6)',
		marginLeft: '10px',
	};
	const styledpV: React.CSSProperties = {
		fontFamily: 'Inter',
		fontStyle: 'normal',
		fontWeight: '600',
		fontSize: '14px',
		lineHeight: '140%',
		color: '#002841',
		marginLeft: '10px',
	};

	console.log(payload);
	return (
		<ul style={styledwrapper}>
			{payload.map((entry: any, index: any) => (
				<li style={styledli} key={`item-${index}`}>
					<div
						style={{
							width: '11px',
							height: '11px',
							background: `${entry.color}`,
							borderRadius: '2px',
						}}></div>
					<div style={styledContent}>
						<p style={styledp}>{entry.value}</p>
						<p style={styledpV}>{entry.payload.value}%</p>
						<p style={styledpT}>({entry.payload.transaction} Transactions)</p>
					</div>
				</li>
			))}
		</ul>
	);
};

function PieChart() {
	const data02 = [
		{ name: 'Success', value: 50, color: '#169859', transaction: 10 },
		{ name: 'Failed', value: 20, color: '#F78317', transaction: 4 },
		{ name: 'Cancelled', value: 30, color: '#1262BF', transaction: 6 },
	];

	const dataReduce = data02.reduce(
		(acc: any, item: any) => item.value + acc,
		0
	);

	return (
		<StyledChart>
			<ResponsiveContainer width='100%' height={315}>
				<PI>
					<Pie
						dataKey='value'
						data={data02}
						innerRadius={70}
						outerRadius={120}
						fill='#82ca9d'>
						{data02.map((entry: any, index: any) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
					</Pie>

					<Tooltip />
					{/* <Legend
						iconType='square'
						iconSize={10}
						layout='vertical'
						align='right'
						verticalAlign='middle'
					/> */}

					<Legend
						content={renderLegend}
						iconType='square'
						iconSize={10}
						layout='vertical'
						align='right'
						verticalAlign='middle'
					/>
				</PI>
			</ResponsiveContainer>
			<StyledReduce>{dataReduce}%</StyledReduce>
		</StyledChart>
	);
}

const StyledChart = styled.div`
	width: 90%;
	/* box-shadow: 0px 1.65px 3px rgba(75, 75, 75, 0.34);
	border-radius: 0px 0px 8px 8px; */
	position: relative;
	font-size: 14px;
	/* margin-left: -149px; */
	/* border: 1px solid red; */
`;

const StyledReduce = styled.h4`
	position: absolute;
	width: auto;
	top: 50%;
	left: 31%;
	transform: translate(-50%, -50%);
	font-family: Inter;
	font-style: normal;
	font-weight: 600;
	font-size: 24px;
	line-height: 120%;
	color: rgba(0, 40, 65, 0.8);
`;

export default PieChart;
