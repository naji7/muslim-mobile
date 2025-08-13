import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { PatternBackground } from './PatternBackground';
import { Text, Button } from 'react-native-paper';

export const HeroHeader: React.FC<{ title: string; subtitle?: string; ctaLabel?: string; onPressCta?: () => void }>
= ({ title, subtitle, ctaLabel, onPressCta }) => {
	return (
		<View style={{ borderRadius: 20, overflow: 'hidden' }}>
			<LinearGradient
				colors={["#22c55e","#16a34a"]}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
				style={{ padding: 20 }}
			>
				<PatternBackground opacity={0.08} />
				<Text variant="titleLarge" style={{ color: 'white', fontWeight: '800' }}>{title}</Text>
				{subtitle ? <Text style={{ color: 'white', opacity: 0.9, marginTop: 4 }}>{subtitle}</Text> : null}
				{ctaLabel ? <Button mode="contained-tonal" onPress={onPressCta} style={{ marginTop: 12, alignSelf: 'flex-start' }} textColor="#052e16">{ctaLabel}</Button> : null}
			</LinearGradient>
		</View>
	);
};