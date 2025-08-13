import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveLastRead(surah: number, ayah: number) {
	await AsyncStorage.setItem('lastRead', JSON.stringify({ surah, ayah, ts: Date.now() }));
}

export async function loadLastRead(): Promise<{ surah: number; ayah: number } | null> {
	const v = await AsyncStorage.getItem('lastRead');
	if (!v) return null;
	try { return JSON.parse(v); } catch { return null; }
}

export async function saveMemItems(items: any) {
	await AsyncStorage.setItem('memItems', JSON.stringify(items));
}

export async function loadMemItems() {
	const v = await AsyncStorage.getItem('memItems');
	if (!v) return [];
	try { return JSON.parse(v); } catch { return []; }
}