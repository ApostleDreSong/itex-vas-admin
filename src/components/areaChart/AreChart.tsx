import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
	ResponsiveContainer,
	AreaChart,
	XAxis,
	YAxis,
	Area,
	Tooltip,
	CartesianGrid,
	Legend,
} from 'recharts';
import { LineServiceProviderDataTypes } from '../../types/UserTableTypes';

const formatCash = (n: any) => {
	if (n < 1e3) return n;
	if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K';
	if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M';
	if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B';
	if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T';
};

// function CustomTooltip({ active, payload, label }: any) {
// 	const styledwrapper: React.CSSProperties = {
// 		borderRadius: '0.25rem',
// 		background: '#ffffff',
// 		padding: '1rem',
// 		boxShadow: '15px 30px 40px 5px rgba(0, 0, 0, 0.5)',
// 		textAlign: 'center',
// 	};
// 	const styledh4: React.CSSProperties = {
// 		color: 'gray',
// 		fontSize: '10px',
// 	};
// 	const styledp: React.CSSProperties = {
// 		color: 'black',
// 		fontSize: '13px',
// 		margin: 0,
// 		padding: 0,
// 	};
// 	if (active) {
// 		return (
// 			<div style={styledwrapper}>
// 				<p style={styledp}>
// 					{' '}
// 					{payload && `${payload[0].dataKey}: ${formatCash(payload[0].value)}`}
// 				</p>
// 			</div>
// 		);
// 	}
// 	return null;
// }

function AreChart() {
	const [dataChart, setDataChart] = useState<LineServiceProviderDataTypes>();

	useEffect(() => {
		axios
			.get<LineServiceProviderDataTypes>(
				`/api/v1/merchant/dashboard/metric/service/providers`
			)
			.then((res: any) => {
				setDataChart(res.data);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<StyledAreaChart>
			<ResponsiveContainer width='90%' height={490}>
				<AreaChart data={dataChart?.data}>
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
						<linearGradient id='9mobile' x1='0' y1='0' x2='0' y2='1'>
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
						dataKey='amount'
						stroke='#0789AC'
						fill='url(#mtn)'
						type='monotone'
						dot={{ strokeWidth: 2 }}
					/>
					<Area
						dataKey='count'
						stroke='#7C3AED'
						fill='url(#glo)'
						type='monotone'
						dot={{ strokeWidth: 2 }}
					/>
					<XAxis dataKey='name' axisLine={false} tickLine={false} />
					<YAxis
						dataKey='amount'
						axisLine={false}
						tickLine={false}
						tickFormatter={(number) => formatCash(number)}
					/>

					{/* <Line
						type='monotone'
						dataKey='amount'
						stroke='#7C3AED'
						activeDot={{ r: 6 }}
					/>
					<Line
						type='monotone'
						dataKey='amount'
						stroke='#3A4CED'
						activeDot={{ r: 4 }}
					/> */}
					<Tooltip />

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
