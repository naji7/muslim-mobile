import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { HeroHeader } from '../components/HeroHeader';
import { PrayerTimesCard } from '../components/PrayerTimesCard';
import { ReciterPicker } from '../components/ReciterPicker';
import { Section } from '../components/Section';
import { QuickAction } from '../components/QuickAction';
import { Card, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
	const { theme } = useTheme();
	const { t } = useTranslation();
	const nav = useNavigation<any>();
	const [reciter, setReciter] = useState('ar.abdulbasitmurattal');
	return (
		<ScrollView style={{ flex: 1, backgroundColor: theme.background }} contentContainerStyle={{ padding: 16, gap: 16 }}>
			<HeroHeader title={t('appName')} subtitle={t('sriLanka')} ctaLabel={t('quran')} onPressCta={() => nav.navigate('Quran')} />
			<Section title={t('recent')} />
			<Card mode="outlined" style={{ borderRadius: 16 }}>
				<View style={{ padding: 16 }}>
					<Text variant="titleSmall" style={{ color: theme.mutedText }}>{t('lastRead')}</Text>
					<Text variant="titleMedium" style={{ marginTop: 4 }}>Al-Fatiha • Ayah 3</Text>
				</View>
			</Card>
			<Section title="Quick Actions" />
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
				<QuickAction icon="Quran" label={t('quran')} onPress={() => nav.navigate('Quran')} />
				<QuickAction icon="Qibla" label="Qibla" onPress={() => nav.navigate('Qibla')} />
				<QuickAction icon="Dhikr" label="Dhikr" onPress={() => nav.navigate('Dhikr')} />
				<QuickAction icon="Memorize" label={t('memorize')} onPress={() => nav.navigate('Memorize')} />
			</View>
			<Section title={t('qari')} />
			<Card mode="outlined" style={{ borderRadius: 16 }}>
				<View style={{ padding: 16 }}>
					<ReciterPicker value={reciter} onChange={setReciter} />
				</View>
			</Card>
			<Section title="Prayer Times" />
			<PrayerTimesCard />
		</ScrollView>
	);
}