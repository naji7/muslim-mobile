import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function ensureNotificationPermission() {
	const { status } = await Notifications.requestPermissionsAsync();
	return status === 'granted';
}

export interface PrayerTimings { Fajr: string; Dhuhr: string; Asr: string; Maghrib: string; Isha: string; }

function parseHHmmToDate(time: string) {
	const [h, m] = time.split(':').map(Number);
	const d = new Date();
	d.setHours(h, m, 0, 0);
	return d;
}

export async function scheduleDailyPrayerReminders(timings: PrayerTimings) {
	const granted = await ensureNotificationPermission();
	if (!granted) return;
	// cancel previous
	const prev = await AsyncStorage.getItem('prayerNotificationIds');
	if (prev) {
		const ids: string[] = JSON.parse(prev);
		for (const id of ids) {
			try { await Notifications.cancelScheduledNotificationAsync(id); } catch {}
		}
	}
	const ids: string[] = [];
	for (const [name, time] of Object.entries(timings)) {
		const date = parseHHmmToDate(time);
		const id = await Notifications.scheduleNotificationAsync({
			content: { title: `${name} Prayer`, body: `Time for ${name}` },
			trigger: { hour: date.getHours(), minute: date.getMinutes(), repeats: true, channelId: 'prayers' },
		});
		ids.push(id);
	}
	await AsyncStorage.setItem('prayerNotificationIds', JSON.stringify(ids));
}