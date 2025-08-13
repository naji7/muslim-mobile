import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

export interface UserLocation { latitude: number; longitude: number; city?: string; }

export function useUserLocation() {
	const [loc, setLoc] = useState<UserLocation | null>(null);
	const [error, setError] = useState<string | null>(null);
	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setError('permission-denied');
				return;
			}
			const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
			let city: string | undefined;
			try {
				const rev = await Location.reverseGeocodeAsync({ latitude: position.coords.latitude, longitude: position.coords.longitude });
				city = (rev?.[0]?.city as string | undefined) || (rev?.[0]?.subregion as string | undefined);
			} catch {}
			setLoc({ latitude: position.coords.latitude, longitude: position.coords.longitude, city });
		})();
	}, []);
	return { location: loc, error };
}