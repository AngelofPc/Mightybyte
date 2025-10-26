import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Platform,
  Pressable,
} from 'react-native';
import { Video } from '../data/videos';
import Icon from './Icon';

const avatarImages = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=6',
  'https://i.pravatar.cc/150?img=7',
  'https://i.pravatar.cc/150?img=8',
  'https://i.pravatar.cc/150?img=9',
  'https://i.pravatar.cc/150?img=10',
  'https://i.pravatar.cc/150?img=11',
  'https://i.pravatar.cc/150?img=12',
  'https://i.pravatar.cc/150?img=13',
  'https://i.pravatar.cc/150?img=14',
  'https://i.pravatar.cc/150?img=15',
  'https://i.pravatar.cc/150?img=16',
  'https://i.pravatar.cc/150?img=17',
  'https://i.pravatar.cc/150?img=18',
  'https://i.pravatar.cc/150?img=19',
  'https://i.pravatar.cc/150?img=20',
];

interface VideoCardProps {
  video: Video;
  onHover?: (video: Video | null, cardRef: any) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onHover }) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const hoverTimer = useRef<NodeJS.Timeout | null>(null);
  const cardRef = useRef<View>(null);

  const handleHoverIn = () => {
    if (Platform.OS !== 'web') return;
    hoverTimer.current = setTimeout(() => {
      setPopupVisible(true);
      if (onHover) {
        onHover(video, cardRef.current);
      }
    }, 300);
  };

  const handleHoverOut = () => {
    if (Platform.OS !== 'web') return;
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
    }
    setPopupVisible(false);
    if (onHover) {
      onHover(null, null);
    }
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
  };

  const getAvatarImage = (videoId: string) => {
    const index = parseInt(videoId) % avatarImages.length;
    return avatarImages[index];
  };

  return (
    <Pressable
      ref={cardRef}
      style={[styles.container, isPopupVisible && styles.hoveredContainer]}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
    >
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: video.thumbnail }} style={styles.thumbnail} />
      </View>
      <View style={styles.infoContainer}>
        <Image
          source={{ uri: getAvatarImage(video.id) }}
          style={styles.channelAvatar}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {video.title}
          </Text>
          <View style={styles.channelRow}>
            <Text style={styles.channelName}>{video.channelName}</Text>
            {video.isVerified && (
              <Icon name="check-circle" size={12} color="#606060" />
            )}
          </View>
          <Text style={styles.publishedDate}>
            {formatDate(video.publishedAt)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    position: 'relative',
    zIndex: 1,
    overflow: 'visible',
    paddingBottom: 12,
  },
  hoveredContainer: {
    zIndex: 99998,
    elevation: 998,
    position: 'relative',
  },
  thumbnailContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 8,
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  channelAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f0f0f',
    marginBottom: 4,
  },
  channelName: {
    fontSize: 14,
    color: '#606060',
    marginRight: 4,
  },
  publishedDate: {
    fontSize: 13,
    color: '#606060',
  },
  channelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
});

export default VideoCard;
