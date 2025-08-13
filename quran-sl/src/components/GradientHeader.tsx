import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../theme/ThemeProvider';

export const GradientHeader: React.FC<{ title: string; subtitle?: string }>
= ({ title, subtitle }) => {
	const { theme } = useTheme();
	return (
		<LinearGradient colors={theme.gradient as any} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ borderRadius: 16, padding: 16 }}>
			<Text style={{ color: 'white', fontSize: 22, fontWeight: '800' }}>{title}</Text>
			{subtitle ? <Text style={{ color: 'white', opacity: 0.9, marginTop: 4 }}>{subtitle}</Text> : null}
		</LinearGradient>
	);
};