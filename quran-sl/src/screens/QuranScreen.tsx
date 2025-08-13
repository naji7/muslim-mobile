import React, { useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { useSurahs } from '../services/quran';
import { TextInput, List, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export default function QuranScreen() {
	const { theme } = useTheme();
	const { t } = useTranslation();
	const nav = useNavigation<any>();
	const [q, setQ] = useState('');
	const { data, isLoading } = useSurahs();
	const filtered = useMemo(() => (data || []).filter(s => `${s.number}. ${s.englishName}`.toLowerCase().includes(q.toLowerCase())), [q, data]);
	return (
		<View style={{ flex: 1, backgroundColor: theme.background, padding: 16 }}>
			<TextInput
				placeholder={t('searchSurah')}
				value={q}
				onChangeText={setQ}
				mode="outlined"
				left={<TextInput.Icon icon="magnify" />}
			/>
			{isLoading ? (
				<ActivityIndicator style={{ marginTop: 16 }} />
			) : (
				<FlatList
					data={filtered}
					keyExtractor={(item) => String(item.number)}
					renderItem={({ item }) => (
						<List.Item
							title={`${item.number}. ${item.englishName}`}
							description={`${item.englishNameTranslation} • ${item.revelationType}`}
							onPress={() => nav.navigate('Surah', { number: item.number, name: item.englishName })}
						/>
					)}
				/>
			)}
		</View>
	);
}