import 'react-native-gesture-handler';
import 'react-native-reanimated';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import RootNavigation from './src/navigation';
import { AppProvider } from './src/providers/AppProvider';

export default function App() {
	return (
		<AppProvider>
			<RootNavigation />
			<StatusBar style="auto" />
		</AppProvider>
	);
}
