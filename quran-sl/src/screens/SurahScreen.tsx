import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useRoute } from '@react-navigation/native';
import { useSurahAyahs } from '../services/quran';
import { TajweedText } from '../components/TajweedText';
import { Button, List, Switch, Text } from 'react-native-paper';
import { Audio } from 'expo-av';
import { playAudio, stopAndUnload } from '../services/audio';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SurahScreen() {
	const { theme } = useTheme();
	const route = useRoute<any>();
	const surahNumber = route.params?.number as number;
	const { data, isLoading } = useSurahAyahs(surahNumber);
	const [currentAyah, setCurrentAyah] = useState<number | null>(null);
	const [sound, setSound] = useState<Audio.Sound | null>(null);
	const [repeat, setRepeat] = useState(false);

	useEffect(() => {
		return () => { stopAndUnload(sound); };
	}, [sound]);

	async function play(ayahIdx: number) {
		if (!data) return;
		await stopAndUnload(sound);
		const uri = data[ayahIdx].audio;
		const s = await playAudio(uri!, repeat);
		setSound(s);
		setCurrentAyah(ayahIdx);
	}

	async function bookmark(ayahIdx: number) {
		await AsyncStorage.setItem(`bookmark:${surahNumber}`, JSON.stringify({ ayah: ayahIdx + 1 }));
	}

	return (
		<View style={{ flex: 1, backgroundColor: theme.background, padding: 12 }}>
			<Text variant="titleLarge" style={{ color: theme.text, marginBottom: 8 }}>Surah {route.params?.name}</Text>
			<View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 }}>
				<Switch value={repeat} onValueChange={setRepeat} />
				<Text style={{ color: theme.text }}>Repeat</Text>
			</View>
			{isLoading || !data ? (
				<Text style={{ color: theme.mutedText }}>Loading…</Text>
			) : (
				<FlatList
					data={data}
					keyExtractor={(a, idx) => `${idx}`}
					renderItem={({ item, index }) => (
						<List.Item
							title={<TajweedText text={item.text} />}
							description={`Ayah ${item.numberInSurah}`}
							right={() => (
								<View style={{ flexDirection: 'row', alignItems: 'center' }}>
									<Button compact onPress={() => play(index)}>{currentAyah === index ? 'Replay' : 'Play'}</Button>
									<Button compact onPress={() => bookmark(index)}>Bookmark</Button>
								</View>
							)}
						/>
					)}
				/>
			)}
		</View>
	);
}