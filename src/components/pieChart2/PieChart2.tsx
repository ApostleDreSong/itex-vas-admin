import React, { useState, useEffect } from 'react';
import {
	PieChart as PI,
	Pie,
	Legend,
	Tooltip,
	Cell,
	ResponsiveContainer,
	Label,
} from 'recharts';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
	pieTypes,
	summaryDashboardDetailsTypes,
} from '../../types/UserTableTypes';
import { number } from 'yup/lib/locale';

const StyledUl = styled.ul`
	margin-left: 0px;
	margin-top: 30px;
	/* @media (max-width: 950px) {
		
	} */
`;

const CustomLabel = ({ viewBox, total }: any) => {
	const { cx, cy } = viewBox;
	return (
		<React.Fragment>
			<text x={cx - 40} y={cy + 10}>
				<tspan
					style={{
						fontFamily: 'Inter',
						fontStyle: 'normal',
						fontWeight: '600',
						fontSize: '24px',
						lineHeight: '120%',
						color: 'rgba(0, 40, 65, 0.8)',
					}}>
					{total === 0 ? `${total}.00%` : total}
				</tspan>
			</text>
		</React.Fragment>
	);
};

const renderLegend = (props: any) => {
	const { payload } = props;
	/* const styledwrapper: React.CSSProperties = {
		
	}; */
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

	return (
		<StyledUl>
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
						<p style={styledpV}>{entry.payload.percentage}%</p>
						<p style={styledpT}>({entry.payload.transaction} Transactions)</p>
					</div>
				</li>
			))}
		</StyledUl>
	);
};
// interface dataTypes {
// 	transaction_count: {
// 		percent_change: number;
// 		count: number;
// 	};
// 	transaction_amount: {
// 		percent_change: number;
// 		amount: number;
// 	};
// 	pie_chart: {
// 		success_amount: number;
// 		failed_amount: number;
// 		cancelled_amount: number;
// 		success_percent: number;
// 		fail_percent: number;
// 		cancelled_percent: number;
// 		success_count: number;
// 		fail_count: number;
// 		cancelled_count: number;
// 	};
// }

function PieChart2({ data }: any) {
	const data02 = [
		{
			name: 'Success',
			value:
				data?.data?.pie_chart?.success_amount <= 0
					? 1
					: data?.data?.pie_chart?.success_amount,
			color: '#169859',
			transaction: data?.data?.pie_chart?.success_count,
			percentage: data?.data?.pie_chart?.success_percent,
		},
		{
			name: 'Failed',
			value:
				data?.data?.pie_chart?.failed_amount <= 0
					? 1
					: data?.data?.pie_chart?.failed_amount,
			color: '#f71717',
			transaction: data?.data?.pie_chart?.fail_count,
			percentage: data?.data?.pie_chart?.fail_percent,
		},
		{
			name: 'Cancelled',
			value:
				data?.data?.pie_chart?.cancelled_amount <= 0
					? 1
					: data?.data?.pie_chart?.cancelled_amount,
			color: '#8017f7',
			transaction: data?.data?.pie_chart?.cancelled_count,
			percentage: data?.data?.pie_chart?.cancelled_percent,
		},
	];

	const dataReduce = data02.reduce(
		(acc: any, item: any) => item.percentage + acc,
		0
	);

	return (
		<StyledChart>
			<ResponsiveContainer width='100%' height={450}>
				<PI>
					<Pie
						dataKey='value'
						cx='50%'
						cy='50%'
						data={data02}
						innerRadius={70}
						outerRadius={120}
						fill='#82ca9d'>
						{data02.map((entry: any, index: any) => (
							<Cell key={`cell-${index}`} fill={entry.color} />
						))}
						<Label
							content={<CustomLabel total={dataReduce} />}
							position='center'
						/>
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
						align='center'
						verticalAlign='bottom'
					/>
				</PI>
			</ResponsiveContainer>
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

export default PieChart2;
