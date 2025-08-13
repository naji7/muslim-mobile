import axios from 'axios';

export interface Ayah {
	textArabic: string;
	textTranslation: string;
	surahNumber: number;
	ayahNumber: number;
}

const API = 'https://api.alquran.cloud/v1';

export async function fetchSurah(surahNumber: number) {
	const res = await axios.get(`${API}/surah/${surahNumber}/ar.alafasy`);
	return res.data;
}

export async function fetchAyahAudio(surah: number, ayah: number) {
	return `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${surah}.mp3`;
}