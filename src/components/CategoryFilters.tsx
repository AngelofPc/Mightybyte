import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';

const categories = [
  'All',
  'Deep House',
  'Playlists',
  'Chill-out music',
  'Live',
  'Acoustic guitar',
  'Music',
  'Brazilian Music',
  'Arrocha',
  'History',
  'Comedy',
  'Sports',
  'Gaming',
  'Movies',
  'News',
];

const CategoryFilters: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <Pressable
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.selectedCategoryButton,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.selectedCategoryText,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f2f2f2',
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#0f0f0f',
  },
  categoryText: {
    fontSize: 14,
    color: '#0f0f0f',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#ffffff',
  },
});

export default CategoryFilters;
