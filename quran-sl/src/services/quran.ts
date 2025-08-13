import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export interface SurahMeta {
	number: number;
	name: string;
	englishName: string;
	englishNameTranslation: string;
	revelationType: 'Meccan' | 'Medinan';
}

export interface Ayah {
	numberInSurah: number;
	text: string;
	audio?: string;
}

const API = 'https://api.alquran.cloud/v1';

export async function getSurahs() {
	const res = await axios.get(`${API}/surah`);
	return res.data.data as SurahMeta[];
}

export async function getSurahAyahs(surahNumber: number) {
	const res = await axios.get(`${API}/surah/${surahNumber}/ar.alafasy`);
	// api returns audio per ayah
	return res.data.data.ayahs as { numberInSurah: number; text: string; audio: string }[];
}

export function useSurahs() {
	return useQuery({ queryKey: ['surahs'], queryFn: getSurahs });
}

export function useSurahAyahs(surahNumber: number) {
	return useQuery({ queryKey: ['surah', surahNumber], queryFn: () => getSurahAyahs(surahNumber), enabled: !!surahNumber });
}