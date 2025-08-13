import React from 'react';
import '../i18n';
import { ThemeProvider } from '../theme/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<QueryClientProvider client={client}>
			<ThemeProvider>
				{children}
			</ThemeProvider>
		</QueryClientProvider>
	);
};