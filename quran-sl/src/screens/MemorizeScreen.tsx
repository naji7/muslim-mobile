import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { Audio } from 'expo-av';

interface MemorizationItem {
	id: string;
	surah: string;
	ayahNumber: number;
	arabic: string;
	translation: string;
	stage: 'new' | 'learning' | 'review' | 'mastered';
}

const initialItems: MemorizationItem[] = [
	{ id: '1:1:1', surah: 'Al-Fatiha', ayahNumber: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', translation: 'In the name of Allah...', stage: 'new' },
	{ id: '1:1:2', surah: 'Al-Fatiha', ayahNumber: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', translation: 'All praise is due to Allah...', stage: 'learning' },
];

export default function MemorizeScreen() {
	const { theme } = useTheme();
	const { t } = useTranslation();
	const [items, setItems] = useState<MemorizationItem[]>(initialItems);
	const [sound, setSound] = useState<Audio.Sound | null>(null);

	async function playSample(item: MemorizationItem) {
		if (sound) {
			await sound.unloadAsync();
			setSound(null);
		}
		const { sound: newSound } = await Audio.Sound.createAsync({ uri: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3' });
		setSound(newSound);
		await newSound.playAsync();
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
			<Text style={{ color: theme.text, fontSize: 20, fontWeight: '700', marginBottom: 12 }}>{t('memorize')}</Text>
			<FlatList
				data={items}
				keyExtractor={(it) => it.id}
				renderItem={({ item }) => (
					<View style={{ borderWidth: 1, borderColor: theme.border, backgroundColor: theme.card, padding: 12, borderRadius: 12, marginBottom: 12 }}>
						<Text style={{ color: theme.text, fontSize: 18 }}>{item.surah} • {item.ayahNumber}</Text>
						<Text style={{ color: theme.text, fontSize: 22, marginTop: 8 }}>{item.arabic}</Text>
						<Text style={{ color: theme.mutedText, marginTop: 4 }}>{item.translation}</Text>
						<Text style={{ color: theme.mutedText, marginTop: 8 }}>Stage: {item.stage}</Text>
						<View style={{ flexDirection: 'row', marginTop: 10, gap: 12 }}>
							<TouchableOpacity onPress={() => playSample(item)} style={{ padding: 10, backgroundColor: theme.primary, borderRadius: 8 }}>
								<Text style={{ color: 'white' }}>{t('play')}</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => advance(item, true)} style={{ padding: 10, backgroundColor: theme.accent, borderRadius: 8 }}>
								<Text style={{ color: 'white' }}>I knew it</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => advance(item, false)} style={{ padding: 10, backgroundColor: '#ef4444', borderRadius: 8 }}>
								<Text style={{ color: 'white' }}>I forgot</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			/>
		</View>
	);
}