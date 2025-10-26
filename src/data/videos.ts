export interface Video {
  id: string;
  thumbnail: string;
  title: string;
  channelName: string;
  publishedAt: Date;
  views: number;
  isLive?: boolean;
  liveViewers?: number;
  duration?: string;
  isVerified?: boolean;
  channelAvatar?: string;
}

export const videos: Video[] = [
  {
    id: '1',
    thumbnail: 'https://picsum.photos/seed/1/320/180',
    title: 'The Art of Code: A Journey into Software Development',
    channelName: 'CodeMasters',
    publishedAt: new Date('2025-10-20'),
    views: 123456,
    duration: '12:34',
    isVerified: true,
  },
  {
    id: '2',
    thumbnail: 'https://picsum.photos/seed/2/320/180',
    title: 'Live look at Kyiv as Russia invades Ukraine',
    channelName: 'Fox News',
    publishedAt: new Date('2025-10-18'),
    views: 962,
    isLive: true,
    liveViewers: 962,
    isVerified: true,
  },
  {
    id: '3',
    thumbnail: 'https://picsum.photos/seed/3/320/180',
    title: 'Relaxing Whiskey Blues Music | Best Of Slow Blues /Rock...',
    channelName: 'JAZZ & BLUES',
    publishedAt: new Date('2025-10-15'),
    views: 9000000,
    duration: '5:50:10',
    isVerified: false,
  },
  {
    id: '4',
    thumbnail: 'https://picsum.photos/seed/4/320/180',
    title: 'The Secrets of Gourmet Cooking',
    channelName: 'ChefLife',
    publishedAt: new Date('2025-10-12'),
    views: 901234,
  },
  {
    id: '5',
    thumbnail: 'https://picsum.photos/seed/5/320/180',
    title: 'Building a Smart Home with Raspberry Pi',
    channelName: 'TechGeeks',
    publishedAt: new Date('2025-10-10'),
    views: 567890,
  },
  {
    id: '6',
    thumbnail: 'https://picsum.photos/seed/6/320/180',
    title: 'Financial Freedom: A Guide to Investing',
    channelName: 'MoneyWise',
    publishedAt: new Date('2025-10-08'),
    views: 112233,
  },
  {
    id: '7',
    thumbnail: 'https://picsum.photos/seed/7/320/180',
    title: 'The Philosophy of Stoicism: Ancient Wisdom for Modern Life',
    channelName: "Philosopher's Stone",
    publishedAt: new Date('2025-09-22'),
    views: 445566,
  },
  {
    id: '8',
    thumbnail: 'https://picsum.photos/seed/8/320/180',
    title: "Digital Art with Procreate: A Beginner's Tutorial",
    channelName: 'ArtStation',
    publishedAt: new Date('2025-09-20'),
    views: 778899,
  },
  {
    id: '9',
    thumbnail: 'https://picsum.photos/seed/9/320/180',
    title: 'A Deep Dive into Neural Networks and Deep Learning',
    channelName: 'AI Explained',
    publishedAt: new Date('2025-09-18'),
    views: 998877,
  },
  {
    id: '10',
    thumbnail: 'https://picsum.photos/seed/10/320/180',
    title: 'The Ultimate Guide to Landscape Photography',
    channelName: 'PhotoFocus',
    publishedAt: new Date('2025-09-15'),
    views: 665544,
  },
  {
    id: '11',
    thumbnail: 'https://picsum.photos/seed/11/320/180',
    title: 'Creating Your First 3D Game with Unity',
    channelName: 'GameDev Academy',
    publishedAt: new Date('2025-09-12'),
    views: 332211,
  },
  {
    id: '12',
    thumbnail: 'https://picsum.photos/seed/12/320/180',
    title: 'Meditation for Beginners: A Path to Mindfulness',
    channelName: 'ZenHub',
    publishedAt: new Date('2025-09-10'),
    views: 112345,
  },
  {
    id: '13',
    thumbnail: 'https://picsum.photos/seed/13/320/180',
    title: 'The History of Ancient Rome: The Rise and Fall of an Empire',
    channelName: 'History Uncovered',
    publishedAt: new Date('2025-09-08'),
    views: 654321,
  },
  {
    id: '14',
    thumbnail: 'https://picsum.photos/seed/14/320/180',
    title: 'Advanced CSS Techniques for Modern Web Design',
    channelName: 'CSS Wizards',
    publishedAt: new Date('2025-09-05'),
    views: 987654,
  },
  {
    id: '15',
    thumbnail: 'https://picsum.photos/seed/15/320/180',
    title: 'The Physics of Spacetime and Black Holes',
    channelName: 'CosmosToday',
    publishedAt: new Date('2025-09-01'),
    views: 101010,
  },
];
