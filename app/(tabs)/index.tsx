import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useTranslation } from 'react-i18next';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import EventFilters from '@/components/EventFilters';
import EventList from '@/components/EventList';

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <ParallaxScrollView
      title={t('events.nearby')}
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/kids-background.png')}
          style={styles.headerImage}
        />
      }
      stickyHeader={<EventFilters />}
    >
      <EventList />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.8,
  },
});
