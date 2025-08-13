import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { GradientHeader } from '../components/GradientHeader';
import { PrayerTimesCard } from '../components/PrayerTimesCard';
import { ReciterPicker } from '../components/ReciterPicker';

const Card: React.FC<{ title: string; subtitle?: string; onPress?: () => void }>
= ({ title, subtitle, onPress }) => {
	const { theme } = useTheme();
	return (
		<TouchableOpacity onPress={onPress} style={{ backgroundColor: theme.card, padding: 16, borderRadius: 12, marginBottom: 12, borderColor: theme.border, borderWidth: 1 }}>
			<Text style={{ color: theme.text, fontSize: 18, fontWeight: '600' }}>{title}</Text>
			{subtitle ? <Text style={{ color: theme.mutedText, marginTop: 4 }}>{subtitle}</Text> : null}
		</TouchableOpacity>
	);
};

export default function HomeScreen() {
	const { theme } = useTheme();
	const { t } = useTranslation();
	const [reciter, setReciter] = useState('ar.abdulbasitmurattal');
	return (
		<ScrollView style={{ flex: 1, backgroundColor: theme.background }} contentContainerStyle={{ padding: 16, gap: 12 }}>
			<GradientHeader title={t('appName')} subtitle={t('sriLanka')} />
			<Card title={t('lastRead')} subtitle="Al-Fatiha • Ayah 3" onPress={() => {}} />
			<PrayerTimesCard />
			<View style={{ backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1, borderRadius: 12, padding: 12 }}>
				<Text style={{ color: theme.text, fontWeight: '700', marginBottom: 8 }}>{t('qari')}</Text>
				<ReciterPicker value={reciter} onChange={setReciter} />
			</View>
		</ScrollView>
	);
}