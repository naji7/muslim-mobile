import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

const RECITERS = [
	{ id: 'ar.alafasy', name: 'Mishary Alafasy' },
	{ id: 'ar.abdulbasitmurattal', name: 'Abdul Basit (Murattal)' },
	{ id: 'ar.husary', name: 'Mahmoud Al-Husary' },
];

export const ReciterPicker: React.FC<{ value: string; onChange: (id: string) => void }>
= ({ value, onChange }) => {
	const { theme } = useTheme();
	return (
		<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
			{RECITERS.map(r => (
				<TouchableOpacity key={r.id} onPress={() => onChange(r.id)} style={{ paddingHorizontal: 12, paddingVertical: 8, borderRadius: 9999, borderWidth: 1, borderColor: value === r.id ? theme.primary : theme.border, backgroundColor: value === r.id ? theme.card : 'transparent' }}>
					<Text style={{ color: theme.text }}>{r.name}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
};