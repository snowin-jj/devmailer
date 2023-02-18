import { extendTheme } from '@chakra-ui/react';

const config = {
	initialColorMode: 'light',
	useSystemColorMode: false,
};

const colors = {
	primary: '#FFF85B',
	secondary: '#1A1A1A',
	black: '#121212',
};

const breakpoints = {
	sm: '0px',
	md: '850px',
	lg: '990px',
	xl: '1300px',
};

const styles = {
	global: {
		html: {
			fontSize: '1.6em',
		},
		body: {
			color: 'secondary',
		},

		a: {
			color: 'secondary',
			transition: 'all 0.3s ease-in-out',
			_hover: {
				color: 'black',
			},
		},
	},
};

export const theme = extendTheme({
	config,
	breakpoints,
	colors,
	styles,
});
