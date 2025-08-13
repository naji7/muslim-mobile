import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export interface PrayerTimes {
	Fajr: string;
	Dhuhr: string;
	Asr: string;
	Maghrib: string;
	Isha: string;
}

async function fetchPrayerTimesColombo() {
	const res = await axios.get('https://api.aladhan.com/v1/timingsByCity?city=Colombo&country=Sri%20Lanka&method=2');
	return res.data.data.timings as PrayerTimes;
}

export function usePrayerTimes() {
	return useQuery({ queryKey: ['prayerTimes', 'Colombo'], queryFn: fetchPrayerTimesColombo, staleTime: 1000 * 60 * 60 });
}