import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Video } from '../data/videos';
import Icon from './Icon';

interface VideoHoverPopupProps {
  video: Video;
}

const formatViews = (views: number) => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M views`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(0)}K views`;
  }
  return `${views} views`;
};

const timeSince = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) {
    return `${Math.floor(interval)} years ago`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} months ago`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} days ago`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} hours ago`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
};

const ActionButton = ({ icon, text }: { icon: string; text: string }) => (
  <Pressable style={styles.actionButton}>
    <Icon name={icon} size={16} color="#606060" />
    <Text style={styles.actionButtonText}>{text}</Text>
  </Pressable>
);

const VideoHoverPopup: React.FC<VideoHoverPopupProps> = ({ video }) => {
  const getAvatarImage = (channelName: string) => {
    const hash = channelName.split('').reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
    const avatarIndex = (Math.abs(hash) % 70) + 1;
    return `https://i.pravatar.cc/150?img=${avatarIndex}`;
  };

  return (
    <View style={styles.popupContainer}>
      <Image source={{ uri: video.thumbnail }} style={styles.popupThumbnail} />
      <View style={styles.popupInfoContainer}>
        <Image
          source={{
            uri: video.channelAvatar || getAvatarImage(video.channelName),
          }}
          style={styles.popupChannelAvatar}
        />
        <View style={styles.popupTextContainer}>
          <Text style={styles.popupTitle} numberOfLines={2}>
            {video.title}
          </Text>
          <View style={styles.popupChannelRow}>
            <Text style={styles.popupChannelName}>{video.channelName}</Text>
            {video.isVerified && (
              <Text style={styles.popupVerifiedIcon}>✓</Text>
            )}
          </View>
          <Text style={styles.popupMetaInfo}>
            {video.isLive
              ? `${video.liveViewers} watching`
              : `${formatViews(video.views)} • ${timeSince(video.publishedAt)}`}
          </Text>
        </View>
      </View>
      <View style={styles.actionsWrapper}>
        <ActionButton icon="clock" text="WATCH LATER" />
        <ActionButton icon="list" text="ADD TO QUEUE" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 999,
    zIndex: 99999,
  },
  popupThumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  popupInfoContainer: {
    flexDirection: 'row',
    padding: 12,
  },
  popupChannelAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  popupTextContainer: {
    flex: 1,
  },
  popupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0f0f0f',
    marginBottom: 4,
  },
  popupChannelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  popupChannelName: {
    fontSize: 14,
    color: '#606060',
    marginRight: 4,
  },
  popupVerifiedIcon: {
    fontSize: 12,
    color: '#606060',
    fontWeight: 'bold',
  },
  popupMetaInfo: {
    fontSize: 12,
    color: '#606060',
  },
  actionsWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: 'white',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    margin: 6,
    gap: 6,
    justifyContent: 'center',
  },
  actionButton: {
    backgroundColor: '#e5e5e4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f0f0f',
  },
});

export default VideoHoverPopup;
