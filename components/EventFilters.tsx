import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Chip } from '@/components/ui/Chip';
import { ThemedView } from './ThemedView';

interface FilterOption {
  id: string;
  label: {
    en: string;
    he: string;
    ru: string;
  };
}

interface EventFiltersProps {
  onFiltersChange?: (filters: {
    ages: string[];
    category: string;
  }) => void;
}

const ageRanges: FilterOption[] = [
  { id: '0-2', label: { en: '0-2', he: '0-2', ru: '0-2' } },
  { id: '3-5', label: { en: '3-5', he: '3-5', ru: '3-5' } },
  { id: '6-8', label: { en: '6-8', he: '6-8', ru: '6-8' } },
  { id: '9-12', label: { en: '9-12', he: '9-12', ru: '9-12' } },
  { id: '13+', label: { en: '13+', he: '13+', ru: '13+' } },
];

const categories: FilterOption[] = [
  { id: 'all', label: { en: 'All', he: 'הכל', ru: 'Все' } },
  { id: 'sports', label: { en: 'Sports', he: 'ספורט', ru: 'Спорт' } },
  { id: 'art', label: { en: 'Art', he: 'אומנות', ru: 'Искусство' } },
  { id: 'music', label: { en: 'Music', he: 'מוזיקה', ru: 'Музыка' } },
  { id: 'education', label: { en: 'Education', he: 'חינוך', ru: 'Образование' } },
  { id: 'entertainment', label: { en: 'Entertainment', he: 'בידור', ru: 'Развлечения' } },
];

export default function EventFilters({ onFiltersChange }: EventFiltersProps) {
  const { i18n } = useTranslation();
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleAgeSelect = (ageId: string) => {
    setSelectedAges(prev => {
      if (prev.includes(ageId)) {
        return prev.filter(id => id !== ageId);
      }
      return [...prev, ageId];
    });
    onFiltersChange?.({
      ages: selectedAges.includes(ageId) ? selectedAges.filter(id => id !== ageId) : [...selectedAges, ageId],
      category: selectedCategory,
    });
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onFiltersChange?.({
      ages: selectedAges,
      category: categoryId,
    });
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          {ageRanges.map(age => (
            <Chip
              key={age.id}
              label={age.label[i18n.language as keyof typeof age.label]}
              selected={selectedAges.includes(age.id)}
              onPress={() => handleAgeSelect(age.id)}
            />
          ))}
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          {categories.map(category => (
            <Chip
              key={category.id}
              label={category.label[i18n.language as keyof typeof category.label]}
              selected={selectedCategory === category.id}
              onPress={() => handleCategorySelect(category.id)}
            />
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 16,
  },
  section: {
    flexDirection: 'row',
    gap: 8,
  },
  divider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginHorizontal: 8,
  },
});
