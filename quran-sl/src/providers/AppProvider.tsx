import React, { useEffect } from 'react';
import '../i18n';
import { ThemeProvider } from '../theme/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistQueryClient } from '@tanstack/react-query-persist-client';

const client = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 1000 * 60 * 5,
			gcTime: 1000 * 60 * 60 * 24,
			retry: 1,
		},
	},
});

const persister = createAsyncStoragePersister({ storage: AsyncStorage });

persistQueryClient({
	queryClient: client,
	persister,
	maxAge: 1000 * 60 * 60 * 24 * 7,
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<QueryClientProvider client={client}>
			<ThemeProvider>
				{children}
			</ThemeProvider>
		</QueryClientProvider>
	);
};