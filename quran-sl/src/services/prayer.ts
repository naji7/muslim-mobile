import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export interface PrayerTimes { Fajr: string; Dhuhr: string; Asr: string; Maghrib: string; Isha: string; }

export async function fetchPrayerTimesByCoords(lat: number, lon: number, method: number) {
	const url = `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=${method}`;
	const res = await axios.get(url);
	return res.data.data.timings as PrayerTimes;
}

export function usePrayerTimesByCoords(lat?: number, lon?: number, method: number = 2) {
	return useQuery({ queryKey: ['prayerTimes', lat, lon, method], queryFn: () => fetchPrayerTimesByCoords(lat!, lon!, method), enabled: !!lat && !!lon, staleTime: 1000 * 60 * 60 });
}