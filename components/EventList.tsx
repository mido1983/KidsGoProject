import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useTranslation } from 'react-i18next';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ThemedView } from './ThemedView';
import { EventCard } from './EventCard';

interface Event {
  id: string;
  title: {
    [key: string]: string;
  };
  date: string;
  location: string;
  price: string;
  imageUrl: string;
  distance?: string;
}

export default function EventList() {
  const { i18n } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEvents = async () => {
    try {
      const eventsRef = collection(db, 'events');
      const q = query(eventsRef); // Add filters here later
      const querySnapshot = await getDocs(q);
      
      const fetchedEvents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Event[];

      setEvents(fetchedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchEvents();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <ThemedView style={styles.content}>
        {events.map(event => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title[i18n.language] || event.title.en}
            date={event.date}
            location={event.location}
            price={event.price}
            imageUrl={event.imageUrl}
            distance={event.distance}
          />
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
});
