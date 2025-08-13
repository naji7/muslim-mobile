import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

const resources = {
  en: {
    translation: {
      appName: 'Quran Sri Lanka',
      home: 'Home',
      quran: 'Quran',
      memorize: 'Memorize',
      settings: 'Settings',
      searchSurah: 'Search Surah',
      recent: 'Recent',
      continue: 'Continue',
      lastRead: 'Last Read',
      download: 'Download',
      play: 'Play',
      pause: 'Pause',
      sriLanka: 'Sri Lanka',
      tajweed: 'Tajweed',
      qari: 'Qari',
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      dailyGoal: 'Daily goal',
      ayah: 'ayah',
      ayahs: 'ayahs',
    },
  },
  si: {
    translation: {
      appName: 'ශ්‍රී ලංකා අල් කුර්ආන්',
      home: 'මුල්',
      quran: 'කුර්ආන්',
      memorize: 'මතකයට ගන්න',
      settings: 'සැකසීම්',
      searchSurah: 'සුරා සොයන්න',
      recent: 'ප්රසිද්ධ',
      continue: 'දිගටම',
      lastRead: 'අවසාන කියවූ',
      download: 'බාගන්න',
      play: 'වාදනය කරන්න',
      pause: 'නවතන්න',
      sriLanka: 'ශ්‍රී ලංකා',
      tajweed: 'තජ්විද්',
      qari: 'කාරි',
      language: 'භාෂාව',
      theme: 'තේමා',
      light: 'ආලෝක',
      dark: 'අඳුරු',
      dailyGoal: 'දිනපතා ඉලක්කය',
      ayah: 'ආයත',
      ayahs: 'ආයත',
    },
  },
  ta: {
    translation: {
      appName: 'இலங்கை குர்ஆன்',
      home: 'முகப்பு',
      quran: 'குர்ஆன்',
      memorize: 'மனனம்',
      settings: 'அமைப்புகள்',
      searchSurah: 'ஸூரா தேடுக',
      recent: 'சமீபத்திய',
      continue: 'தொடரவும்',
      lastRead: 'கடந்த வாசிப்பு',
      download: 'பதிவிறக்க',
      play: 'இயக்கு',
      pause: 'இடைநிறுத்து',
      sriLanka: 'இலங்கை',
      tajweed: 'தஜ்வீத்',
      qari: 'காரி',
      language: 'மொழி',
      theme: 'தீம்',
      light: 'ஒளி',
      dark: 'இருள்',
      dailyGoal: 'நாள் இலக்கு',
      ayah: 'ஆயா',
      ayahs: 'ஆயாத்கள்',
    },
  },
};

const fallbackLng = 'en';
const deviceLocales = Localization.getLocales();
const deviceLanguage = deviceLocales && deviceLocales.length > 0 ? deviceLocales[0].languageCode : fallbackLng;

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: deviceLanguage || fallbackLng,
    fallbackLng,
    interpolation: { escapeValue: false },
  });

export default i18n;