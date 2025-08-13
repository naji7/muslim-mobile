export const lightTheme = {
	background: '#FFFFFF',
	text: '#0B1B13',
	mutedText: '#6B7280',
	primary: '#16a34a',
	card: '#F0FDF4',
	accent: '#22c55e',
	border: '#DCFCE7',
	gradient: ['#22c55e', '#16a34a'],
};

export const darkTheme = {
	background: '#07130C',
	text: '#ECFDF5',
	mutedText: '#9CA3AF',
	primary: '#22c55e',
	card: '#0B1B13',
	accent: '#34d399',
	border: '#14532d',
	gradient: ['#14532d', '#065f46'],
};

export type Theme = typeof lightTheme;