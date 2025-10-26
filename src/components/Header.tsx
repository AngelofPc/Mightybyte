import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import Icon from './Icon';

interface HeaderProps {
  onMenuPress: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuPress }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  const handleVoiceSearch = () => {
    console.log('Voice search activated');
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Pressable onPress={onMenuPress} style={styles.menuButton}>
          <Icon name="menu" size={24} color="#606060" />
        </Pressable>
        <Icon name="youtube" size={24} color="red" />
        <Text style={styles.logoText}>YouTube</Text>
      </View>
      <View style={styles.centerContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          <Pressable style={styles.searchButton} onPress={handleSearch}>
            <Icon name="search" size={20} color="#606060" />
          </Pressable>
        </View>
        <Pressable style={styles.voiceButton} onPress={handleVoiceSearch}>
          <Icon name="mic" size={20} color="#606060" />
        </Pressable>
      </View>
      <View style={styles.rightContainer}>
        <Pressable style={styles.iconButton}>
          <Icon name="apps" size={24} color="#606060" />
        </Pressable>
        <Pressable style={styles.iconButton}>
          <Icon name="more-vert" size={24} color="#606060" />
        </Pressable>
        <Pressable style={styles.signInButton}>
          <Text style={styles.signInText}>SIGN IN</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  logoIcon: {
    width: 28,
    height: 28,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f0f0f',
    marginLeft: 4,
  },
  centerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    maxWidth: 600,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',

    overflow: 'hidden',
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#0f0f0f',
  },
  searchButton: {
    height: 40,
    width: 64,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderLeftWidth: 1,
    borderLeftColor: '#cccccc',
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voiceButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#065fd4',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginLeft: 8,
  },
  signInText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#065fd4',
  },
});

export default Header;
