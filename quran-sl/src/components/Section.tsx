import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export const Section: React.FC<{ title: string; action?: React.ReactNode }>
= ({ title, action }) => {
	return (
		<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16, marginBottom: 8 }}>
			<Text variant="titleMedium">{title}</Text>
			{action}
		</View>
	);
};