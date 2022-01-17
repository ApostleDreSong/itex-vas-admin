import { createTheme } from '@material-ui/core/styles';

// Create a theme instance.
export const theme = createTheme({
	palette: {
		secondary: {
			main: '#002841',
		},
	},
	// },
	// typography: {
	// 	fontFamily: 'Comic Sans MS',
	// 	body2: {
	// 		fontFamily: 'Times New Roman',
	// 		fontSize: '1.1rem',
	// 	},
	// },
	// shape: {
	// 	borderRadius: 30,
	// },
	// spacing: 8,
	overrides: {
		MuiButton: {
			root: {
				textTransform: 'none',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			},
		},
	},
});
