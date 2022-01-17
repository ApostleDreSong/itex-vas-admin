import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
// import areaChartTypes from '../../types/areaChartTypes';
import {
	ResponsiveContainer,
	AreaChart,
	XAxis,
	YAxis,
	Area,
	Tooltip,
	CartesianGrid,
	Legend,
	Line,
} from 'recharts';
import { format } from 'date-fns';

const formatCash = (n: any) => {
	if (n < 1e3) return n;
	if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
	if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
	if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
	if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
};

function CustomTooltip({ active, payload, label }: any) {
	const styledwrapper: React.CSSProperties = {
		borderRadius: '0.25rem',
		background: '#ffffff',
		padding: '1rem',
		boxShadow: '15px 30px 40px 5px rgba(0, 0, 0, 0.5)',
		textAlign: 'center',
	};
	const styledh4: React.CSSProperties = {
		color: 'gray',
		fontSize: '10px',
	};
	const styledp: React.CSSProperties = {
		color: 'black',
		fontSize: '13px',
		margin: 0,
		padding: 0,
	};
	// console.log('watimagbo:', active, payload[0], label);
	if (active) {
		return (
			<div style={styledwrapper}>
				<h4 style={styledh4}>{label && format(label, 'eee, MMM d')}</h4>
				{/* <p style={styledp}>NGN {payload && formatCash(payload[0].value)}</p> */}
				<p style={styledp}>
					{' '}
					{payload && `${payload[0].dataKey}: ${formatCash(payload[0].value)}`}
				</p>
				<p style={styledp}>
					{' '}
					{payload && `${payload[1].dataKey}: ${formatCash(payload[1].value)}`}
				</p>
				<p style={styledp}>
					{' '}
					{payload && `${payload[2].dataKey}: ${formatCash(payload[2].value)}`}
				</p>
			</div>
		);
	}
	return null;
}

function AreChart() {
	// const [data, setData] = useState<areaChartTypes[]>([]);
	const data = [
		{
			amt: 5000000,
			date: new Date(2018, 11, 23),
			mtn: 4000000,
			glo: 2400000,
			airtel: 1400000,
		},
		{
			amt: 10000000,
			date: new Date(2018, 11, 24),
			mtn: 3000000,
			glo: 1308000,
			airtel: 1300000,
		},
		{
			amt: 40000000,
			date: new Date(2018, 11, 25),
			mtn: 2000000,
			glo: 9000000,
			airtel: 8000000,
		},
		{
			amt: 20000000,
			date: new Date(2018, 11, 26),
			mtn: 278000,
			glo: 398000,
			airtel: 3400000,
		},
		{
			amt: 22000000,
			date: new Date(2018, 11, 27),
			mtn: 180000,
			glo: 4800000,
			airtel: 1500000,
		},
		{
			amt: 24000000,
			date: new Date(2018, 11, 28),
			mtn: 2390000,
			glo: 3000000,
			airtel: 13200000,
		},
		{
			amt: 60000000,
			date: new Date(2018, 11, 29),
			mtn: 34900000,
			glo: 450000,
			airtel: 43000000,
		},
	];

	// useEffect(() => {
	// 	axios.get<areaChartTypes[]>('mockfolder/areaChartData.json').then((res) => {
	// 		console.log('res', res.data);
	// 		setData(res.data);
	// 	});
	// }, []);

	return (
		<StyledAreaChart>
			<ResponsiveContainer width='90%' height={490}>
				<AreaChart data={data}>
					<defs>
						<linearGradient id='mtn' x1='0' y1='0' x2='0' y2='1'>
							<stop
								offset='0%'
								stopColor='rgb(7, 137, 172)'
								stopOpacity={0.19}
							/>
							<stop
								offset='100%'
								stopColor='rgb(7, 137, 172)'
								stopOpacity={0}
							/>
						</linearGradient>
						<linearGradient id='glo' x1='0' y1='0' x2='0' y2='1'>
							<stop
								offset='24.93%'
								stopColor='rgb(124, 58, 237)'
								stopOpacity={0.19}
							/>
							<stop
								offset='94.64%'
								stopColor='rgb(124, 58, 237)'
								stopOpacity={0.09}
							/>
						</linearGradient>
						<linearGradient id='airtel' x1='0' y1='0' x2='0' y2='1'>
							<stop
								offset='0%'
								stopColor='rgb(58, 76, 237)'
								stopOpacity={0.19}
							/>
							<stop
								offset='100%'
								stopColor='rgba(58, 76, 237)'
								stopOpacity={0.09}
							/>
						</linearGradient>
					</defs>
					<Area
						dataKey='mtn'
						stroke='#0789AC'
						fill='url(#mtn)'
						type='monotone'
						dot={{ strokeWidth: 2 }}
					/>
					<Area
						dataKey='glo'
						stroke='#7C3AED'
						fill='url(#glo)'
						type='monotone'
						dot={{ strokeWidth: 2 }}
					/>
					<Area
						dataKey='airtel'
						stroke='#3A4CED'
						fill='url(#airtel)'
						type='monotone'
						dot={{ strokeWidth: 2 }}
					/>
					<XAxis
						dataKey='date'
						axisLine={false}
						tickLine={false}
						tickFormatter={(str) => {
							if (str.getDay() % 1 === 0) {
								return format(str, 'eee').toUpperCase();
							}
							return '';
						}}
					/>
					<YAxis
						dataKey='amt'
						axisLine={false}
						tickLine={false}
						tickFormatter={(number) => formatCash(number)}
					/>
					{/* <Line
						type='monotone'
						dataKey='mtn'
						stroke='#0789AC'
						activeDot={{ r: 8 }}
					/>

					<Line
						type='monotone'
						dataKey='glo'
						stroke='#7C3AED'
						activeDot={{ r: 6 }}
					/>
					<Line
						type='monotone'
						dataKey='airtel'
						stroke='#3A4CED'
						activeDot={{ r: 4 }}
					/> */}
					<Tooltip content={<CustomTooltip />} />
					{/* <Tooltip /> */}

					<Legend iconType='circle' iconSize={8} />
					<CartesianGrid opacity={0.1} vertical={false} />
				</AreaChart>
			</ResponsiveContainer>
		</StyledAreaChart>
	);
}

const StyledAreaChart = styled.div`
	font-size: 13px;
`;

export default AreChart;
