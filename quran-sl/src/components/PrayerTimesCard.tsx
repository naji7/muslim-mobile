import React, { useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useUserLocation } from '../services/location';
import { usePrayerTimesByCoords } from '../services/prayer';
import { Button, Chip, Text } from 'react-native-paper';
import { scheduleDailyPrayerReminders } from '../services/notifications';

const METHODS = [
	{ id: 2, name: 'Karachi' },
	{ id: 5, name: 'Egypt' },
	{ id: 7, name: 'Umm al-Qura' },
	{ id: 3, name: 'ISNA' },
];

export const PrayerTimesCard: React.FC = () => {
	const { theme } = useTheme();
	const { location } = useUserLocation();
	const [method, setMethod] = useState(7);
	const { data, isLoading } = usePrayerTimesByCoords(location?.latitude, location?.longitude, method);
	return (
		<View style={{ backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1, borderRadius: 12, padding: 12 }}>
			<Text style={{ color: theme.text, fontWeight: '700', marginBottom: 8 }}>{location?.city ? `${location.city} Prayer Times` : 'Prayer Times'}</Text>
			<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 }}>
				{METHODS.map(m => (
					<Chip key={m.id} selected={method === m.id} onPress={() => setMethod(m.id)}>{m.name}</Chip>
				))}
			</View>
			{isLoading || !data ? (
				<Text style={{ color: theme.mutedText }}>Loading…</Text>
			) : (
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
					{(['Fajr','Dhuhr','Asr','Maghrib','Isha'] as const).map(k => (
						<View key={k} style={{ width: '48%', marginBottom: 6 }}>
							<Text style={{ color: theme.mutedText }}>{k}</Text>
							<Text style={{ color: theme.text, fontSize: 16 }}>{data[k]}</Text>
						</View>
					))}
					<Button mode="contained" style={{ marginTop: 8 }} onPress={() => scheduleDailyPrayerReminders(data)}>Enable reminders</Button>
				</View>
			)}
		</View>
	);
};