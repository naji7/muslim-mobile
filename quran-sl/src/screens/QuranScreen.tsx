import React, { useMemo, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';

const SURAH_NAMES = [
	'Al-Fatiha', 'Al-Baqarah', 'Al-Imran', 'An-Nisa', 'Al-Ma’idah', 'Al-An’am', 'Al-A‘raf', 'Al-Anfal', 'At-Tawbah', 'Yunus'
];

export default function QuranScreen() {
	const { theme } = useTheme();
	const { t } = useTranslation();
	const [q, setQ] = useState('');
	const filtered = useMemo(() => SURAH_NAMES.filter(s => s.toLowerCase().includes(q.toLowerCase())), [q]);
	return (
		<View style={{ flex: 1, backgroundColor: theme.background, padding: 16 }}>
			<TextInput
				placeholder={t('searchSurah')}
				placeholderTextColor={theme.mutedText}
				value={q}
				onChangeText={setQ}
				style={{ borderWidth: 1, borderColor: theme.border, backgroundColor: theme.card, color: theme.text, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 12, marginBottom: 12 }}
			/>
			<FlatList
				data={filtered}
				keyExtractor={(item, idx) => `${idx}`}
				renderItem={({ item, index }) => (
					<TouchableOpacity style={{ paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: theme.border }}>
						<Text style={{ color: theme.text, fontSize: 16 }}>{index + 1}. {item}</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}