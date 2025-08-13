import React, { useEffect } from 'react';
import '../i18n';
import { ThemeProvider, useTheme } from '../theme/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { Provider as PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

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

function PaperThemeBridge({ children }: { children: React.ReactNode }) {
	const { scheme, theme } = useTheme();
	const paperTheme = scheme === 'dark' ? MD3DarkTheme : MD3LightTheme;
	const merged = {
		...paperTheme,
		colors: {
			...paperTheme.colors,
			primary: theme.primary,
			secondary: theme.accent,
			background: theme.background,
			surface: theme.card,
			onSurface: theme.text,
			outline: theme.border,
		},
	};
	return <PaperProvider theme={merged}>{children}</PaperProvider>;
}

async function ensureAndroidChannel() {
	if (Platform.OS === 'android') {
		await Notifications.setNotificationChannelAsync('prayers', {
			name: 'Prayer Reminders',
			importance: Notifications.AndroidImportance.HIGH,
			sound: 'default',
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#22c55e',
		});
	}
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	useEffect(() => {
		ensureAndroidChannel();
	}, []);
	return (
		<QueryClientProvider client={client}>
			<ThemeProvider>
				<PaperThemeBridge>
					{children}
				</PaperThemeBridge>
			</ThemeProvider>
		</QueryClientProvider>
	);
};