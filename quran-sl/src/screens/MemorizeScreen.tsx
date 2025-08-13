import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, List, Switch, Text } from 'react-native-paper';
import { playAudio, stopAndUnload } from '../services/audio';

interface MemorizationItem {
	id: string;
	surah: string;
	ayahNumber: number;
	arabic: string;
	translation: string;
	stage: 'new' | 'learning' | 'review' | 'mastered';
	audio?: string;
}

const defaultItems: MemorizationItem[] = [
	{ id: '1:1:1', surah: 'Al-Fatiha', ayahNumber: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', translation: 'In the name of Allah...', stage: 'new', audio: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3' },
];

export default function MemorizeScreen() {
	const { theme } = useTheme();
	const { t } = useTranslation();
	const [items, setItems] = useState<MemorizationItem[]>(defaultItems);
	const [sound, setSound] = useState<Audio.Sound | null>(null);
	const [repeat, setRepeat] = useState(false);

	useEffect(() => {
		(async () => {
			const v = await AsyncStorage.getItem('memItems');
			if (v) setItems(JSON.parse(v));
		})();
	}, []);
	useEffect(() => { AsyncStorage.setItem('memItems', JSON.stringify(items)).catch(() => {}); }, [items]);
	useEffect(() => () => { stopAndUnload(sound); }, [sound]);

	async function play(item: MemorizationItem) {
		await stopAndUnload(sound);
		const s = await playAudio(item.audio!, repeat);
		setSound(s);
	}

	function advance(item: MemorizationItem, correct: boolean) {
		setItems(curr => curr.map(it => {
			if (it.id !== item.id) return it;
			if (!correct) return { ...it, stage: 'learning' };
			if (it.stage === 'new') return { ...it, stage: 'learning' };
			if (it.stage === 'learning') return { ...it, stage: 'review' };
			if (it.stage === 'review') return { ...it, stage: 'mastered' };
			return it;
		}));
	}

	return (
		<View style={{ flex: 1, backgroundColor: theme.background, padding: 16 }}>
			<Text variant="titleLarge" style={{ color: theme.text, marginBottom: 8 }}>{t('memorize')}</Text>
			<View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 }}>
				<Switch value={repeat} onValueChange={setRepeat} />
				<Text style={{ color: theme.text }}>Repeat mode</Text>
			</View>
			<FlatList
				data={items}
				keyExtractor={(it) => it.id}
				renderItem={({ item }) => (
					<List.Item
						title={item.arabic}
						description={`${item.surah} • Ayah ${item.ayahNumber} • Stage: ${item.stage}`}
						right={() => (
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<Button compact onPress={() => play(item)}>{t('play')}</Button>
								<Button compact onPress={() => advance(item, true)}>I knew it</Button>
								<Button compact onPress={() => advance(item, false)}>I forgot</Button>
							</View>
						)}
					/>
				)}
			/>
		</View>
	);
}