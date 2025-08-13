import React from 'react';
import { View } from 'react-native';
import { Card, Text, TouchableRipple } from 'react-native-paper';

export const QuickAction: React.FC<{ icon: string; label: string; onPress: () => void }>
= ({ icon, label, onPress }) => {
	return (
		<Card mode="elevated" style={{ width: '48%', marginBottom: 12, borderRadius: 16 }}>
			<TouchableRipple onPress={onPress} borderless style={{ borderRadius: 16 }}>
				<View style={{ padding: 16 }}>
					<Text variant="titleMedium">{label}</Text>
					<Text style={{ color: '#6B7280', marginTop: 4 }}>{icon}</Text>
				</View>
			</TouchableRipple>
		</Card>
	);
};