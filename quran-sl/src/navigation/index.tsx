import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../theme/ThemeProvider';
import HomeScreen from '../screens/HomeScreen';
import QuranScreen from '../screens/QuranScreen';
import MemorizeScreen from '../screens/MemorizeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

type TabName = 'Home' | 'Quran' | 'Memorize' | 'Settings';

function Tabs() {
	const { t } = useTranslation();
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarActiveTintColor: '#0ea5e9',
				tabBarStyle: { height: 60 },
				tabBarIcon: ({ color, size }) => {
					const name = route.name as TabName;
					const icon = name === 'Home' ? 'home' : name === 'Quran' ? 'book' : name === 'Memorize' ? 'bookmarks' : 'settings';
					return <Ionicons name={icon as any} size={size} color={color} />;
				},
			})}
		>
			<Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: t('home') }} />
			<Tab.Screen name="Quran" component={QuranScreen} options={{ tabBarLabel: t('quran') }} />
			<Tab.Screen name="Memorize" component={MemorizeScreen} options={{ tabBarLabel: t('memorize') }} />
			<Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: t('settings') }} />
		</Tab.Navigator>
	);
}

export default function RootNavigation() {
	const { scheme } = useTheme();
	return (
		<NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen name="root" component={Tabs} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}