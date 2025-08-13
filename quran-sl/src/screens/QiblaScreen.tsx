import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { useUserLocation } from '../services/location';
import { bearingToQibla, useCompassHeading } from '../services/qibla';

export default function QiblaScreen() {
	const { theme } = useTheme();
	const { location } = useUserLocation();
	const heading = useCompassHeading();
	const bearing = location ? bearingToQibla(location.latitude, location.longitude) : 0;
	const rotate = `${(bearing - heading + 360) % 360}deg`;
	return (
		<View style={{ flex: 1, backgroundColor: theme.background, padding: 16, alignItems: 'center', justifyContent: 'center' }}>
			<Text style={{ color: theme.text, fontSize: 20, fontWeight: '700', marginBottom: 24 }}>Qibla Finder</Text>
			<View style={{ width: 240, height: 240, borderRadius: 120, borderWidth: 8, borderColor: theme.border, alignItems: 'center', justifyContent: 'center' }}>
				<View style={{ width: 4, height: 90, backgroundColor: theme.primary, transform: [{ rotate }], position: 'absolute', top: 30 }} />
				<Text style={{ color: theme.mutedText }}>Heading: {heading.toFixed(0)}°</Text>
				<Text style={{ color: theme.mutedText }}>Qibla: {bearing.toFixed(0)}°</Text>
			</View>
			<Text style={{ color: theme.mutedText, marginTop: 12 }}>{location?.city ? `Location: ${location.city}` : 'Detecting location…'}</Text>
		</View>
	);
}