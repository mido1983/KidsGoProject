import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../config/firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

WebBrowser.maybeCompleteAuthSession();

const languages = [
  { code: 'he', name: 'עברית', nativeName: 'Hebrew' },
  { code: 'ru', name: 'Русский', nativeName: 'Russian' },
  { code: 'en', name: 'English', nativeName: 'English' },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: "812631424731-fkvpet24m3av76bc5lo5uonm6c070ii0.apps.googleusercontent.com",
    androidClientId: "812631424731-fkvpet24m3av76bc5lo5uonm6c070ii0.apps.googleusercontent.com",
    iosClientId: "812631424731-fkvpet24m3av76bc5lo5uonm6c070ii0.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      handleGoogleSignIn(id_token);
    }
  }, [response]);

  const handleGoogleSignIn = async (idToken: string) => {
    try {
      setIsAuthenticating(true);
      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
      router.push('/(tabs)');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      Alert.alert(
        t('errors.auth_error'),
        t('errors.try_again_later'),
        [{ text: 'OK' }]
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLang(langCode);
    i18n.changeLanguage(langCode);
  };

  const handleSignIn = async () => {
    if (isAuthenticating) return;
    await promptAsync();
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <LinearGradient
        colors={['#f0f6ff', '#ffffff']}
        style={styles.background}
      />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.logo}>KidsGo</Text>
          <Text style={styles.title}>{t('onboarding.welcome')}</Text>
          <Text style={styles.subtitle}>{t('onboarding.select_language')}</Text>
        </View>
        
        <View style={styles.languageContainer}>
          {languages.map((lang) => (
            <Pressable
              key={lang.code}
              style={({ pressed }) => [
                styles.languageButton,
                selectedLang === lang.code && styles.selectedLanguage,
                pressed && styles.buttonPressed
              ]}
              onPress={() => handleLanguageSelect(lang.code)}
            >
              <Text style={[
                styles.languageText,
                selectedLang === lang.code && styles.selectedLanguageText,
              ]}>
                {lang.name}
              </Text>
              <Text style={[
                styles.nativeLanguageText,
                selectedLang === lang.code && styles.selectedLanguageText,
                selectedLang === lang.code && styles.selectedNativeText,
              ]}>
                {lang.nativeName}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.signInButton,
            isAuthenticating && styles.signInButtonDisabled,
            pressed && styles.buttonPressed
          ]}
          disabled={isAuthenticating}
          onPress={handleSignIn}
        >
          <MaterialCommunityIcons 
            name="google" 
            size={24} 
            color="#DB4437" 
            style={styles.googleIcon}
          />
          <Text style={styles.signInButtonText}>
            {isAuthenticating 
              ? t('onboarding.signing_in')
              : t('onboarding.sign_in_with_google')
            }
          </Text>
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
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 44,
    fontWeight: '700',
    color: '#1976D2',
    marginBottom: 24,
    letterSpacing: -1,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '400',
    color: '#666666',
    marginBottom: 32,
    textAlign: 'center',
  },
  languageContainer: {
    width: '100%',
    maxWidth: 360,
    gap: 16,
    marginBottom: 40,
  },
  languageButton: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedLanguage: {
    backgroundColor: '#1976D2',
    borderColor: '#1976D2',
    shadowColor: '#1976D2',
    shadowOpacity: 0.24,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 16,
    elevation: 8,
  },
  buttonPressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.9,
  },
  languageText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  nativeLanguageText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#666666',
  },
  selectedLanguageText: {
    color: '#ffffff',
  },
  selectedNativeText: {
    color: 'rgba(255, 255, 255, 0.9)',
  },
  signInButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    paddingHorizontal: 36,
    borderRadius: 28,
    width: '100%',
    maxWidth: 360,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  signInButtonDisabled: {
    opacity: 0.5,
  },
  googleIcon: {
    marginRight: 12,
  },
  signInButtonText: {
    fontWeight: '600',
    color: '#1a1a1a',
    fontSize: 18,
    letterSpacing: -0.25,
  },
});
