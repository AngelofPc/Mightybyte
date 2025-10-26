import React, { useState, useCallback, useRef } from 'react';
import {
  StyleSheet,
  View,
  useWindowDimensions,
  Platform,
  SafeAreaView,
} from 'react-native';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import VideoGrid from './components/VideoGrid';
import CategoryFilters from './components/CategoryFilters';

const App = () => {
  const { width } = useWindowDimensions();
  const isDesktop = width > 768;

  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('programming');

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev: boolean) => !prev);
  }, []);

  const handleCategoryChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header onMenuPress={toggleSidebar} />
        <View style={styles.row}>
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onItemPress={handleCategoryChange}
          />
          <View style={styles.mainContent}>
            <CategoryFilters onCategoryChange={handleCategoryChange} />
            <VideoGrid searchQuery={searchQuery} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  mainContent: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
  },
});

export default App;
