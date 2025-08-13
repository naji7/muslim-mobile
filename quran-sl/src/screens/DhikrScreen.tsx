import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Text, TextInput } from 'react-native-paper';

export default function DhikrScreen() {
	const { theme } = useTheme();
	const [count, setCount] = useState(0);
	const [target, setTarget] = useState('33');
	useEffect(() => {
		(async () => {
			const v = await AsyncStorage.getItem('dhikr');
			if (v) {
				const { count: c, target: t } = JSON.parse(v);
				setCount(c || 0);
				setTarget(String(t || '33'));
			}
		})();
	}, []);
	useEffect(() => {
		AsyncStorage.setItem('dhikr', JSON.stringify({ count, target: Number(target) })).catch(() => {});
	}, [count, target]);
	return (
		<View style={{ flex: 1, backgroundColor: theme.background, padding: 16, gap: 12 }}>
			<Text variant="titleLarge" style={{ color: theme.text }}>Dhikr Counter</Text>
			<View style={{ backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1, padding: 16, borderRadius: 12, alignItems: 'center' }}>
				<Text variant="displaySmall" style={{ color: theme.text }}>{count}</Text>
				<Text style={{ color: theme.mutedText }}>Target: {target}</Text>
				<View style={{ flexDirection: 'row', gap: 12, marginTop: 12 }}>
					<Button mode="contained" onPress={() => setCount(c => c + 1)}>+1</Button>
					<Button mode="outlined" onPress={() => setCount(c => Math.max(0, c - 1))}>-1</Button>
					<Button mode="contained-tonal" onPress={() => setCount(0)}>Reset</Button>
				</View>
				<TextInput label="Set target" value={target} onChangeText={setTarget} keyboardType="numeric" style={{ marginTop: 12, width: '60%' }} />
			</View>
		</View>
	);
}