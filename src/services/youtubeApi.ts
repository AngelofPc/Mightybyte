const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export interface YouTubeVideo {
  id: string;
  title: string;
  channelName: string;
  thumbnail: string;
  publishedAt: Date;
  description?: string;
}

export const fetchVideos = async (
  searchQuery: string = 'programming',
  pageToken?: string
): Promise<{ videos: YouTubeVideo[]; nextPageToken?: string }> => {
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    throw new Error(
      'YouTube API key is not configured. Please add your API key to .env file.'
    );
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=25&q=${searchQuery}&key=${API_KEY}${
    pageToken ? `&pageToken=${pageToken}` : ''
  }`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`YouTube API error: ${response.statusText}`);
  }

  const data = await response.json();

  const videos: YouTubeVideo[] = data.items.map((item: any) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    channelName: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.medium.url,
    publishedAt: new Date(item.snippet.publishedAt),
    description: item.snippet.description,
  }));

  return {
    videos,
    nextPageToken: data.nextPageToken,
  };
};
