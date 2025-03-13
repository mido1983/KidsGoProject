import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { EventCard } from '../../components/EventCard';
import { IconSymbol } from '../../components/ui/IconSymbol';
import { Event } from '../../types/event';

export default function SavedScreen() {
  const { t } = useTranslation();
  const [savedEvents, setSavedEvents] = useState<Array<{
    id: string;
    title: string;
    date: string;
    location: string;
    price: string;
    imageUrl: string;
  }>>([]);

  if (savedEvents.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <IconSymbol 
          name="house.fill" 
          size={48} 
          color="#666666" 
          style={styles.emptyIcon} 
        />
        <Text style={styles.emptyTitle}>{t('saved.no_events')}</Text>
        <Text style={styles.emptySubtitle}>{t('saved.discover_events')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={savedEvents}
        renderItem={({ item }) => (
          <EventCard
            id={item.id}
            title={item.title}
            date={item.date}
            location={item.location}
            price={item.price}
            imageUrl={item.imageUrl}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
});
