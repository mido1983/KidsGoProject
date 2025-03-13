import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { auth } from '../../config/firebase';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.replace('/onboarding');
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert(
        t('errors.sign_out_error'),
        t('errors.try_again_later'),
        [{ text: 'OK' }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('profile.title')}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('profile.language')}</Text>
        <View style={styles.languageButtons}>
          <Pressable
            style={[
              styles.languageButton,
              i18n.language === 'he' && styles.selectedLanguage,
            ]}
            onPress={() => handleLanguageChange('he')}
          >
            <Text style={[
              styles.languageText,
              i18n.language === 'he' && styles.selectedLanguageText,
            ]}>עברית</Text>
          </Pressable>
          <Pressable
            style={[
              styles.languageButton,
              i18n.language === 'ru' && styles.selectedLanguage,
            ]}
            onPress={() => handleLanguageChange('ru')}
          >
            <Text style={[
              styles.languageText,
              i18n.language === 'ru' && styles.selectedLanguageText,
            ]}>Русский</Text>
          </Pressable>
          <Pressable
            style={[
              styles.languageButton,
              i18n.language === 'en' && styles.selectedLanguage,
            ]}
            onPress={() => handleLanguageChange('en')}
          >
            <Text style={[
              styles.languageText,
              i18n.language === 'en' && styles.selectedLanguageText,
            ]}>English</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('profile.account')}</Text>
        <Pressable
          style={styles.signOutButton}
          onPress={handleSignOut}
        >
          <MaterialCommunityIcons name="logout" size={24} color="#E53935" />
          <Text style={styles.signOutText}>{t('profile.sign_out')}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  section: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  languageButtons: {
    gap: 12,
  },
  languageButton: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedLanguage: {
    backgroundColor: '#1976D2',
    borderColor: '#1976D2',
  },
  languageText: {
    fontSize: 17,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  selectedLanguageText: {
    color: '#ffffff',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
  },
  signOutText: {
    fontSize: 17,
    color: '#E53935',
    fontWeight: '600',
  },
});
