import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Video } from '../data/videos';
import Icon from './Icon';

interface VideoHoverPopupProps {
  video: Video;
}

const formatDate = (date: Date) => {
  const d = new Date(date);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
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
            {formatDate(video.publishedAt)}
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
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.15)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 20,
    elevation: 999,
    zIndex: 99999,
  },
  popupThumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  popupInfoContainer: {
    flexDirection: 'row',
    padding: 14,
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
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    margin: 8,
    gap: 8,
    justifyContent: 'center',
  },
  actionButton: {
    backgroundColor: '#e5e5e4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    gap: 8,
    borderRadius: 6,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0f0f0f',
  },
});

export default VideoHoverPopup;
