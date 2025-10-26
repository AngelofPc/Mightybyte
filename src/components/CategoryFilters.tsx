import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';

const categories = [
  { label: 'All', searchQuery: 'programming' },
  { label: 'Music', searchQuery: 'music' },
  { label: 'Gaming', searchQuery: 'gaming' },
  { label: 'News', searchQuery: 'news' },
  { label: 'Sports', searchQuery: 'sports' },
  { label: 'Comedy', searchQuery: 'comedy' },
  { label: 'History', searchQuery: 'history' },
  { label: 'Movies', searchQuery: 'movies' },
  { label: 'Coding', searchQuery: 'coding' },
  { label: 'Tutorials', searchQuery: 'tutorials' },
];

interface CategoryFiltersProps {
  onCategoryChange?: (searchQuery: string) => void;
}

const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  onCategoryChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryPress = (category: (typeof categories)[0]) => {
    setSelectedCategory(category.label);
    if (onCategoryChange) {
      onCategoryChange(category.searchQuery);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <Pressable
            key={category.label}
            style={[
              styles.categoryButton,
              selectedCategory === category.label &&
                styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryPress(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.label &&
                  styles.selectedCategoryText,
              ]}
            >
              {category.label}
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
