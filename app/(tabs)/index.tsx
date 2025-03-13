import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'expo-router';
import { EventCard } from '../../components/EventCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type CategoryIcon = 'palette-outline' | 'basketball' | 'music-note' | 'school' | 'pine-tree' | 'theater';

const CATEGORIES: Array<{
  id: string;
  icon: CategoryIcon;
  name: string;
}> = [
  { id: 'arts', icon: 'palette-outline', name: 'Arts & Crafts' },
  { id: 'sports', icon: 'basketball', name: 'Sports' },
  { id: 'music', icon: 'music-note', name: 'Music' },
  { id: 'education', icon: 'school', name: 'Education' },
  { id: 'nature', icon: 'pine-tree', name: 'Nature' },
  { id: 'theater', icon: 'theater', name: 'Theater' },
];

const FEATURED_EVENTS = [
  {
    id: '1',
    title: 'Kids Art Workshop',
    date: 'Tomorrow, 10:00',
    location: 'Tel Aviv Museum',
    price: '₪50',
    imageUrl: 'https://example.com/art-workshop.jpg',
  },
  {
    id: '2',
    title: 'Junior Soccer Camp',
    date: 'This Weekend',
    location: 'Sportek, Tel Aviv',
    price: '₪120',
    imageUrl: 'https://example.com/soccer-camp.jpg',
  },
];

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('home.discover')}</Text>
        <Text style={styles.subtitle}>{t('home.subtitle')}</Text>
      </View>

      <Text style={styles.sectionTitle}>{t('home.categories')}</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {CATEGORIES.map((category) => (
          <Link 
            key={category.id} 
            href={`/explore?category=${category.id}`}
            asChild
          >
            <Pressable style={styles.categoryCard}>
              <View style={styles.categoryIcon}>
                <MaterialCommunityIcons 
                  name={category.icon} 
                  size={24} 
                  color="#1976D2" 
                />
              </View>
              <Text style={styles.categoryName}>{t(`categories.${category.id}`)}</Text>
            </Pressable>
          </Link>
        ))}
      </ScrollView>

      <View style={styles.featuredSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{t('home.featured')}</Text>
          <Link href="/explore" asChild>
            <Pressable>
              <Text style={styles.seeAllButton}>{t('home.see_all')}</Text>
            </Pressable>
          </Link>
        </View>
        {FEATURED_EVENTS.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            date={event.date}
            location={event.location}
            price={event.price}
            imageUrl={event.imageUrl}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 17,
    color: '#666666',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  categoriesContainer: {
    paddingBottom: 8,
    gap: 12,
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  featuredSection: {
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllButton: {
    color: '#1976D2',
    fontSize: 16,
    fontWeight: '600',
  },
});
