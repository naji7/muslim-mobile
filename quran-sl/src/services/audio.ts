import * as FileSystem from 'expo-file-system';
import { Audio, AVPlaybackStatusSuccess } from 'expo-av';

function toFileName(uri: string) {
	return uri.replace(/[^a-z0-9]/gi, '_').toLowerCase();
}

const CACHE_DIR = FileSystem.cacheDirectory + 'audioCache/';

export async function getCachedAudioUri(remoteUri: string): Promise<string> {
	await FileSystem.makeDirectoryAsync(CACHE_DIR, { intermediates: true }).catch(() => {});
	const fileUri = CACHE_DIR + toFileName(remoteUri);
	const info = await FileSystem.getInfoAsync(fileUri);
	if (!info.exists) {
		await FileSystem.downloadAsync(remoteUri, fileUri);
	}
	return fileUri;
}

export async function playAudio(remoteUri: string, repeat: boolean = false) {
	const localUri = await getCachedAudioUri(remoteUri);
	const { sound } = await Audio.Sound.createAsync({ uri: localUri }, { shouldPlay: true, isLooping: repeat });
	return sound;
}

export async function stopAndUnload(sound: Audio.Sound | null) {
	if (!sound) return;
	const status = (await sound.getStatusAsync()) as AVPlaybackStatusSuccess | any;
	if (status.isLoaded) {
		await sound.stopAsync();
		await sound.unloadAsync();
	}
}