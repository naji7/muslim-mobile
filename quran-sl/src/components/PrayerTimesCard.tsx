import React from 'react';
import { View, Text } from 'react-native';
import { usePrayerTimes } from '../services/prayer';
import { useTheme } from '../theme/ThemeProvider';

export const PrayerTimesCard: React.FC = () => {
	const { data, isLoading } = usePrayerTimes();
	const { theme } = useTheme();
	return (
		<View style={{ backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1, borderRadius: 12, padding: 12 }}>
			<Text style={{ color: theme.text, fontWeight: '700', marginBottom: 8 }}>Colombo Prayer Times</Text>
			{isLoading ? (
				<Text style={{ color: theme.mutedText }}>Loading…</Text>
			) : data ? (
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
					{(['Fajr','Dhuhr','Asr','Maghrib','Isha'] as const).map(k => (
						<View key={k} style={{ width: '48%', marginBottom: 6 }}>
							<Text style={{ color: theme.mutedText }}>{k}</Text>
							<Text style={{ color: theme.text, fontSize: 16 }}>{data[k]}</Text>
						</View>
					))}
				</View>
			) : (
				<Text style={{ color: theme.mutedText }}>Unavailable</Text>
			)}
		</View>
	);
};