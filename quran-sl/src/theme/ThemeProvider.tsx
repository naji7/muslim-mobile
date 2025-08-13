import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme, type Theme } from './colors';

interface ThemeContextValue {
	theme: Theme;
	scheme: 'light' | 'dark';
	setScheme: (s: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const system = useColorScheme();
	const [overrideScheme, setOverrideScheme] = useState<'light' | 'dark' | null>(null);
	const scheme: 'light' | 'dark' = overrideScheme ?? (system === 'dark' ? 'dark' : 'light');

	const theme = useMemo(() => (scheme === 'dark' ? darkTheme : lightTheme), [scheme]);

	return (
		<ThemeContext.Provider value={{ theme, scheme, setScheme: (s) => setOverrideScheme(s) }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
	return ctx;
};