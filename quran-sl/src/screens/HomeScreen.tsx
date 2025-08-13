import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

const Card: React.FC<{ title: string; subtitle?: string; onPress?: () => void }> = ({ title, subtitle, onPress }) => {
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
	return (
		<ScrollView style={{ flex: 1, backgroundColor: theme.background }} contentContainerStyle={{ padding: 16 }}>
			<Text style={{ color: theme.text, fontSize: 24, fontWeight: '700', marginBottom: 16 }}>{t('appName')}</Text>
			<Card title={t('lastRead')} subtitle="Al-Fatiha • Ayah 3" onPress={() => {}} />
			<Card title={t('sriLanka')} subtitle="Colombo • Localized experience for Sinhala/Tamil" onPress={() => {}} />
			<Card title={t('qari')} subtitle="Abdul Basit • Stream/Download" onPress={() => {}} />
		</ScrollView>
	);
}