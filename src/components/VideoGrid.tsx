import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  Animated,
} from 'react-native';
import VideoCard from './VideoCard';
import VideoHoverPopup from './VideoHoverPopup';
import { fetchVideos, YouTubeVideo } from '../services/youtubeApi';

interface VideoGridProps {
  searchQuery: string;
}

const VideoGrid: React.FC<VideoGridProps> = ({ searchQuery }) => {
  const { width } = useWindowDimensions();
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [hoveredVideo, setHoveredVideo] = useState<any>(null);
  const [hoveredCardRef, setHoveredCardRef] = useState<any>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const popupOpacity = useRef(new Animated.Value(0)).current;
  const popupScale = useRef(new Animated.Value(0.85)).current;
  const gridRef = useRef<View>(null);

  useEffect(() => {
    loadVideos(true);
  }, [searchQuery]);

  useEffect(() => {
    const handleResize = () => {
      if (hoveredVideo && hoveredCardRef) {
        setTimeout(() => {
          if (hoveredCardRef && gridRef.current) {
            hoveredCardRef.measureInWindow(
              (x: number, y: number, width: number, height: number) => {
                if (gridRef.current) {
                  gridRef.current.measureInWindow(
                    (gridX: number, gridY: number) => {
                      const relativeX = x - gridX;
                      const relativeY = y - gridY;

                      setPopupPosition({
                        top: relativeY - 20,
                        left: relativeX + 5,
                      });
                    }
                  );
                }
              }
            );
          }
        }, 100);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hoveredVideo, hoveredCardRef]);

  const loadVideos = async (reset: boolean = false) => {
    if (loading) return;

    try {
      setLoading(true);
      const result = await fetchVideos(
        searchQuery,
        reset ? undefined : nextPageToken
      );

      if (reset) {
        setVideos(result.videos);
      } else {
        setVideos((prev) => [...prev, ...result.videos]);
      }

      setNextPageToken(result.nextPageToken);
    } catch (error) {
      console.error('Failed to load videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const getNumColumns = () => {
    if (width < 600) return 1;
    if (width < 900) return 2;
    if (width < 1200) return 3;
    if (width < 1500) return 4;
    return 5;
  };

  const numColumns = getNumColumns();

  const handleHover = (video: any, cardRef: any) => {
    if (video && cardRef) {
      setHoveredVideo(video);
      setHoveredCardRef(cardRef);

      cardRef.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          if (gridRef.current) {
            gridRef.current.measureInWindow((gridX: number, gridY: number) => {
              const relativeX = x - gridX;
              const relativeY = y - gridY;

              setPopupPosition({
                top: relativeY - 20,
                left: relativeX + 5,
              });
            });
          }
        }
      );

      Animated.parallel([
        Animated.timing(popupOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(popupScale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(popupOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(popupScale, {
          toValue: 0.95,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setHoveredVideo(null);
        setHoveredCardRef(null);
        popupScale.setValue(0.85);
      });
    }
  };

  const loadMore = () => {
    if (nextPageToken && !loading) {
      loadVideos(false);
    }
  };

  return (
    <View ref={gridRef} style={styles.gridContainer}>
      <FlatList
        data={videos}
        key={numColumns}
        numColumns={numColumns}
        renderItem={({ item }: { item: any }) => (
          <VideoCard video={item} onHover={handleHover} />
        )}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.container}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
      {hoveredVideo && (
        <Animated.View
          style={[
            styles.popupOverlay,
            {
              opacity: popupOpacity,
              transform: [{ scale: popupScale }],
            },
          ]}
        >
          <View
            style={[
              styles.popupCard,
              { top: popupPosition.top, left: popupPosition.left },
            ]}
          >
            <VideoHoverPopup video={hoveredVideo} />
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    position: 'relative',
  },
  container: {
    padding: 8,
    overflow: 'visible',
  },
  popupOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 99999,
    pointerEvents: 'none',
  },
  popupCard: {
    position: 'absolute',
    width: 320,
    zIndex: 100000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 999,
  },
});

export default VideoGrid;
