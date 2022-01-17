import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../redux/actions/modal/modalActions';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const styles = {
	main: {
		backgroundColor: 'rgba(137, 146, 163, 0.5)',
		zIndex: 1300,
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	} as React.CSSProperties,
	messageBox: {
		backgroundColor: 'white',
		width: '591px',
		overflow: 'auto',
		textAlign: 'center',
		position: 'relative',
	} as React.CSSProperties,
};

export default function Modal() {
	const modalProps = useSelector((state) => state.modal);
	const dispatch = useDispatch();
	const { modalOpened, modalContent, modalStyles } = modalProps;
	const Close = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		dispatch(closeModal());
	};
	return (
		<>
			{modalOpened ? (
				<div style={{ ...styles.main, left: 0 }} onClick={(e) => Close(e)}>
					<div style={{ ...styles.messageBox, ...modalStyles }}>
						<ClearOutlinedIcon
							style={{
								zIndex: 20,
								cursor: 'pointer',
								position: 'absolute',
								top: '20px',
								right: '20px',
							}}
							onClick={(e: any) => Close(e)}
							sx={{ color: 'rgba(0, 40, 65, 0.5)' }}
						/>
						<div
							onClick={(e) => {
								e.stopPropagation();
							}}>
							{modalContent}
						</div>
					</div>
				</div>
			) : null}
		</>
	);
}
