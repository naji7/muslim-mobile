import { useEffect, useState } from 'react';
import { Magnetometer } from 'expo-sensors';

const KAABA = { lat: 21.4225 * Math.PI / 180, lon: 39.8262 * Math.PI / 180 };

export function bearingToQibla(latDeg: number, lonDeg: number) {
	const lat = latDeg * Math.PI / 180;
	const lon = lonDeg * Math.PI / 180;
	const dLon = KAABA.lon - lon;
	const y = Math.sin(dLon) * Math.cos(KAABA.lat);
	const x = Math.cos(lat) * Math.sin(KAABA.lat) - Math.sin(lat) * Math.cos(KAABA.lat) * Math.cos(dLon);
	let brng = Math.atan2(y, x) * 180 / Math.PI;
	brng = (brng + 360) % 360;
	return brng; // degrees from North
}

function calcHeading(x: number, y: number) {
	let angle = Math.atan2(y, x) * 180 / Math.PI;
	if (angle < 0) angle += 360;
	return angle;
}

export function useCompassHeading() {
	const [heading, setHeading] = useState<number>(0);
	useEffect(() => {
		let sub: any;
		Magnetometer.setUpdateInterval(200);
		sub = Magnetometer.addListener(({ x, y, z }) => {
			setHeading(calcHeading(x, y));
		});
		return () => {
			sub && sub.remove();
		};
	}, []);
	return heading; // degrees from North
}