import React, { useState, useRef } from 'react';
import { View, FlatList, StyleSheet, useWindowDimensions } from 'react-native';
import { videos } from '../data/videos';
import VideoCard from './VideoCard';
import VideoHoverPopup from './VideoHoverPopup';

const VideoGrid: React.FC = () => {
  const { width } = useWindowDimensions();
  const [hoveredVideo, setHoveredVideo] = useState<any>(null);
  const [hoveredCardRef, setHoveredCardRef] = useState<any>(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const gridRef = useRef<View>(null);

  const getNumColumns = () => {
    if (width < 600) return 1;
    if (width < 900) return 2;
    if (width < 1200) return 3;
    if (width < 1500) return 4;
    return 5;
  };

  const numColumns = getNumColumns();

  const handleHover = (video: any, cardRef: any) => {
    setHoveredVideo(video);
    setHoveredCardRef(cardRef);

    if (cardRef) {
      cardRef.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          if (gridRef.current) {
            gridRef.current.measureInWindow((gridX: number, gridY: number) => {
              const relativeX = x - gridX;
              const relativeY = y - gridY;

              setPopupPosition({
                top: relativeY - 20,
                left: relativeX - 20,
              });
            });
          }
        }
      );
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
      />
      {hoveredVideo && (
        <View style={styles.popupOverlay}>
          <View
            style={[
              styles.popupCard,
              { top: popupPosition.top, left: popupPosition.left },
            ]}
          >
            <VideoHoverPopup video={hoveredVideo} />
          </View>
        </View>
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
    width: 280,
    zIndex: 100000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 999,
  },
});

export default VideoGrid;
