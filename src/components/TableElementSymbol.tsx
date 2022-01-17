import React from 'react';
import { ReactComponent as SortIcon } from '../assets/images/sortIcon.svg';

function TableElementSymbol({ title }: any) {
	return (
		<div>
			{title} &nbsp; <SortIcon />
		</div>
	);
}

export default TableElementSymbol;
