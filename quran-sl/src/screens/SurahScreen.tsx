import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default function SurahScreen() {
	const { theme } = useTheme();
	return (
		<View style={{ flex: 1, backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }}>
			<Text style={{ color: theme.text }}>Surah details coming soon...</Text>
		</View>
	);
}