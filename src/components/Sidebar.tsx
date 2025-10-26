import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from './Icon';

interface SidebarProps {
  isCollapsed: boolean;
  group?: string;
  onItemPress?: (searchQuery: string) => void;
}

const SidebarItem = ({
  icon,
  label,
  isCollapsed,
  isActive,
  onPress,
  group,
}: any) => (
  <Pressable
    style={[
      styles.itemContainer,
      isCollapsed && styles.collapsedItemContainer,
      isActive && styles.activeItem,
    ]}
    onPress={onPress}
  >
    <View style={[group === 'best-of-youtube' && styles.groupContainer]}>
      <Icon
        name={icon}
        size={group === 'best-of-youtube' ? 16 : 20}
        color={
          isActive
            ? group === 'best-of-youtube'
              ? 'white'
              : '#0f0f0f'
            : group === 'best-of-youtube'
            ? 'white'
            : '#606060'
        }
      />
    </View>

    {!isCollapsed && (
      <Text
        style={[styles.itemLabel, { color: isActive ? '#0f0f0f' : '#0f0f0f' }]}
      >
        {label}
      </Text>
    )}
  </Pressable>
);

const Separator = () => <View style={styles.separator} />;

const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  onItemPress,
}: SidebarProps) => {
  const [activeItem, setActiveItem] = useState('home');

  const mainItems = [
    { id: 'home', icon: 'home', label: 'Home', searchQuery: 'programming' },
    {
      id: 'explore',
      icon: 'explore',
      label: 'Explore',
      searchQuery: 'trending',
    },
    {
      id: 'shorts',
      icon: 'video-library',
      label: 'Shorts',
      searchQuery: 'shorts',
    },
    {
      id: 'subscriptions',
      icon: 'subscriptions',
      label: 'Subscriptions',
      searchQuery: 'tech',
    },
  ];

  const libraryItems = [
    { id: 'library', icon: 'video-library', label: 'Library' },
    { id: 'history', icon: 'history', label: 'History' },
  ];

  const bestOfYouTubeItems = [
    {
      id: 'music',
      icon: 'music-note',
      label: 'Music',
      group: 'best-of-youtube',
      searchQuery: 'music',
    },
    {
      id: 'sports',
      icon: 'sports',
      label: 'Sports',
      group: 'best-of-youtube',
      searchQuery: 'sports',
    },
    {
      id: 'gaming',
      icon: 'sports-esports',
      label: 'Gaming',
      searchQuery: 'gaming',
      group: 'best-of-youtube',
    },
    {
      id: 'movies',
      icon: 'movie',
      label: 'Movies',
      group: 'best-of-youtube',
      searchQuery: 'movies',
    },
    {
      id: 'news',
      icon: 'article',
      label: 'News',
      group: 'best-of-youtube',
      searchQuery: 'news',
    },
  ];

  return (
    <View style={[styles.container, isCollapsed && styles.collapsedContainer]}>
      {/* Main Navigation */}
      {mainItems.map((item) => (
        <SidebarItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          isCollapsed={isCollapsed}
          isActive={activeItem === item.id}
          onPress={() => {
            setActiveItem(item.id);
            if (onItemPress && item.searchQuery) {
              onItemPress(item.searchQuery);
            }
          }}
        />
      ))}

      <Separator />

      {/* Library Section */}
      {libraryItems.map((item) => (
        <SidebarItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          isCollapsed={isCollapsed}
          isActive={activeItem === item.id}
          onPress={() => setActiveItem(item.id)}
        />
      ))}

      <Separator />

      {/* Sign In Section */}
      {!isCollapsed && (
        <View style={styles.signInSection}>
          <Text style={styles.signInText}>
            Sign in to like videos, comment, and subscribe.
          </Text>
          <Pressable style={styles.signInButton}>
            <Text style={styles.signInButtonText}>SIGN IN</Text>
          </Pressable>
        </View>
      )}

      <Separator />

      {/* Best of YouTube Section */}
      {!isCollapsed && (
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>BEST OF YOUTUBE</Text>
        </View>
      )}

      {bestOfYouTubeItems.map((item) => (
        <SidebarItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          group={item.group}
          isCollapsed={isCollapsed}
          isActive={activeItem === item.id}
          onPress={() => {
            setActiveItem(item.id);
            if (onItemPress && item.searchQuery) {
              onItemPress(item.searchQuery);
            }
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 240,
    backgroundColor: '#ffffff',
    paddingTop: 8,
  },
  collapsedContainer: {
    width: 72,
    alignItems: 'center',
    paddingTop: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 0,
  },
  collapsedItemContainer: {
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  activeItem: {
    backgroundColor: '#f2f2f2',
  },
  itemLabel: {
    marginLeft: 24,
    fontSize: 14,
    color: '#0f0f0f',
    fontWeight: '400',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  signInSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  signInText: {
    fontSize: 14,
    color: '#606060',
    marginBottom: 12,
    lineHeight: 20,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#065fd4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  signInButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#065fd4',
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#606060',
    textTransform: 'uppercase',
  },
  groupContainer: {
    borderRadius: 20,
    padding: 8,
    backgroundColor: 'black',
  },
});

export default Sidebar;
