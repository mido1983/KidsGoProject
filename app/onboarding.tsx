import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../config/firebase';

// Required for Google Sign-In
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
      <StatusBar style="light" />
      <Image
        source={require('../assets/images/kids-background.png')}
        style={styles.backgroundImage}
      />
      <BlurView intensity={60} style={styles.contentContainer}>
        <Text style={styles.title}>{t('onboarding.welcome')}</Text>
        <Text style={styles.subtitle}>{t('onboarding.select_language')}</Text>
        
        <View style={styles.languageContainer}>
          {languages.map((lang) => (
            <TouchableOpacity
              key={lang.code}
              style={[
                styles.languageButton,
                selectedLang === lang.code && styles.selectedLanguage,
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
              ]}>
                {lang.nativeName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.signInButton, isAuthenticating && styles.signInButtonDisabled]}
          onPress={handleSignIn}
          disabled={isAuthenticating}
        >
          <Image 
            source={require('../assets/images/google-logo.png')}
            style={styles.googleLogo}
          />
          <Text style={styles.signInButtonText}>
            {isAuthenticating 
              ? t('onboarding.signing_in')
              : t('onboarding.sign_in_with_google')
            }
          </Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 40,
    textAlign: 'center',
  },
  languageContainer: {
    width: '100%',
    maxWidth: 300,
    gap: 15,
    marginBottom: 40,
  },
  languageButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedLanguage: {
    backgroundColor: '#fff',
  },
  languageText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '500',
  },
  nativeLanguageText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  selectedLanguageText: {
    color: '#000',
  },
  signInButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    maxWidth: 300,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  signInButtonDisabled: {
    opacity: 0.7,
  },
  signInButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  googleLogo: {
    width: 24,
    height: 24,
  },
});
