import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { Link } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { BlurView } from 'expo-blur';
import { IconSymbol } from './ui/IconSymbol';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  location: string;
  price: string;
  imageUrl: string;
  distance?: string;
}

export function EventCard({ id, title, date, location, price, imageUrl, distance }: EventCardProps) {
  const { t } = useTranslation();

  return (
    <Link href={`/event/${id}`} asChild>
      <TouchableOpacity style={styles.container}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <BlurView intensity={80} tint="dark" style={styles.infoContainer}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <TouchableOpacity style={styles.favoriteButton}>
              <IconSymbol name="heart" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.details}>
            <View style={styles.detailRow}>
              <IconSymbol name="calendar" size={16} color="#fff" />
              <Text style={styles.detailText}>{date}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <IconSymbol name="mappin" size={16} color="#fff" />
              <Text style={styles.detailText}>{location}</Text>
              {distance && (
                <Text style={styles.distanceText}>{distance}</Text>
              )}
            </View>

            <View style={styles.detailRow}>
              <IconSymbol name="shekelsign" size={16} color="#fff" />
              <Text style={styles.detailText}>{price}</Text>
            </View>
          </View>
        </BlurView>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    marginRight: 8,
  },
  favoriteButton: {
    padding: 4,
  },
  details: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  distanceText: {
    color: '#fff',
    fontSize: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
});
