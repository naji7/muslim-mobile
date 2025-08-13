import React from 'react';
import { Text, TextProps } from 'react-native';
import { useFonts, Amiri_400Regular, Amiri_700Bold } from '@expo-google-fonts/amiri';

export const ArabicText: React.FC<TextProps> = ({ style, children, ...rest }) => {
	const [loaded] = useFonts({ Amiri_400Regular, Amiri_700Bold });
	if (!loaded) return null;
	return (
		<Text {...rest} style={[{ fontFamily: 'Amiri_400Regular', fontSize: 22, lineHeight: 34 }, style]}>{children}</Text>
	);
};