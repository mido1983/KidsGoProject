import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { t } = useTranslation();

  // TODO: Replace with actual event data fetching
  const event = {
    id,
    title: 'Kids Art Workshop',
    description: 'Join us for a fun and creative art workshop designed specifically for children! Our experienced instructors will guide your kids through various artistic techniques and help them create their own masterpieces.',
    date: 'Tomorrow, 10:00',
    time: '10:00 - 12:00',
    location: {
      name: 'Tel Aviv Museum',
      address: '27 Shaul Hamelech Blvd',
      city: 'Tel Aviv',
    },
    price: {
      amount: 50,
      currency: '₪',
      isFree: false,
    },
    ageRange: {
      min: 5,
      max: 12,
    },
    imageUrl: 'https://example.com/art-workshop.jpg',
    organizerName: 'Creative Kids Israel',
    languages: ['Hebrew', 'English'],
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTintColor: '#ffffff',
          headerBackTitle: t('common.back'),
        }}
      />
      <ScrollView style={styles.container} bounces={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: event.imageUrl }} style={styles.image} />
          <BlurView intensity={80} tint="dark" style={styles.titleContainer}>
            <Text style={styles.title}>{event.title}</Text>
            <View style={styles.organizerRow}>
              <MaterialCommunityIcons name="account" size={16} color="#ffffff" />
              <Text style={styles.organizerName}>{event.organizerName}</Text>
            </View>
          </BlurView>
        </View>

        <View style={styles.content}>
          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="calendar" size={24} color="#1976D2" />
              <View>
                <Text style={styles.infoLabel}>{t('event.date_and_time')}</Text>
                <Text style={styles.infoText}>{event.date}</Text>
                <Text style={styles.infoText}>{event.time}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="map-marker" size={24} color="#1976D2" />
              <View>
                <Text style={styles.infoLabel}>{t('event.location')}</Text>
                <Text style={styles.infoText}>{event.location.name}</Text>
                <Text style={styles.infoText}>{event.location.address}</Text>
                <Text style={styles.infoText}>{event.location.city}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="ticket" size={24} color="#1976D2" />
              <View>
                <Text style={styles.infoLabel}>{t('event.price')}</Text>
                <Text style={styles.infoText}>
                  {event.price.isFree 
                    ? t('event.free') 
                    : `${event.price.currency}${event.price.amount}`}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="account-child" size={24} color="#1976D2" />
              <View>
                <Text style={styles.infoLabel}>{t('event.age_range')}</Text>
                <Text style={styles.infoText}>
                  {t('event.ages', { min: event.ageRange.min, max: event.ageRange.max })}
                </Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <MaterialCommunityIcons name="translate" size={24} color="#1976D2" />
              <View>
                <Text style={styles.infoLabel}>{t('event.languages')}</Text>
                <Text style={styles.infoText}>{event.languages.join(', ')}</Text>
              </View>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>{t('event.about')}</Text>
            <Text style={styles.description}>{event.description}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Pressable style={styles.saveButton}>
            <MaterialCommunityIcons name="bookmark-outline" size={24} color="#1976D2" />
            <Text style={styles.saveButtonText}>{t('event.save')}</Text>
          </Pressable>
          <Pressable style={styles.bookButton}>
            <Text style={styles.bookButtonText}>{t('event.book_now')}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  organizerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  organizerName: {
    fontSize: 14,
    color: '#ffffff',
  },
  content: {
    padding: 16,
  },
  infoSection: {
    gap: 24,
    marginBottom: 32,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  descriptionSection: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  description: {
    fontSize: 16,
    color: '#1a1a1a',
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  saveButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1976D2',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1976D2',
  },
  bookButton: {
    flex: 2,
    padding: 16,
    backgroundColor: '#1976D2',
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
