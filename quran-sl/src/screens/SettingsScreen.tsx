import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../theme/ThemeProvider';

export default function SettingsScreen() {
	const { t, i18n } = useTranslation();
	const { theme, scheme, setScheme } = useTheme();

	return (
		<View style={{ flex: 1, backgroundColor: theme.background, padding: 16 }}>
			<Text style={{ color: theme.text, fontSize: 20, fontWeight: '700', marginBottom: 16 }}>{t('settings')}</Text>
			<Text style={{ color: theme.mutedText, marginBottom: 8 }}>{t('language')}</Text>
			<View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
				{['en','si','ta'].map(lng => (
					<TouchableOpacity key={lng} onPress={() => i18n.changeLanguage(lng)} style={{ backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}>
						<Text style={{ color: theme.text }}>{lng.toUpperCase()}</Text>
					</TouchableOpacity>
				))}
			</View>
			<Text style={{ color: theme.mutedText, marginBottom: 8 }}>{t('theme')}</Text>
			<View style={{ flexDirection: 'row', gap: 12 }}>
				<TouchableOpacity onPress={() => setScheme('light')} style={{ backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}>
					<Text style={{ color: theme.text }}>{t('light')}</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => setScheme('dark')} style={{ backgroundColor: theme.card, borderColor: theme.border, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}>
					<Text style={{ color: theme.text }}>{t('dark')}</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}