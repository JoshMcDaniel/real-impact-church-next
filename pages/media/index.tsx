import {
  useMediaQuery,
  Box,
  Typography,
  Divider,
  useTheme,
  Link,
} from '@mui/material';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import DynamicHead from '../../components/DynamicHead/DynamicHead';
import HorizontalScrollMedia from '../../components/Media/HorizontalScrollMedia';
import MostRecentVideo from '../../components/Media/MostRecentVideo';
import LoadingIndication from '../../components/shared/LoadingIndication';
import {
  useOrganizationConfig,
  useMediaConfig,
} from '../../constants/app-config/app-config-hooks';

export const Media: NextPage = () => {
  const { api_url, channel_id } = useOrganizationConfig().social_media.youtube;
  const { most_recent, most_popular } = useMediaConfig().media_page.youtube;

  const isMediumView = useMediaQuery(useTheme().breakpoints.up('md'));
  const activeRoute = useRouter().pathname;

  const [recentRequestPending, setRecentRequestPending] =
    useState<boolean>(false);
  const [recentVideos, setRecentVideos] = useState<any[]>([]);

  const [popularRequestPending, setPopularRequestPending] =
    useState<boolean>(false);
  const [popularVideos, setPopularVideos] = useState<any[]>([]);

  const isRequestPending = (): boolean =>
    recentRequestPending || popularRequestPending;

  const channelUrl = `${api_url}${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&channelId=${channel_id}`;

  const getVideosUrl = (order: 'date' | 'viewCount', count: number): string => {
    return `${channelUrl}&order=${order}&part=snippet &type=video,id&maxResults=${count}`;
  };

  useEffect(() => {
    if (!recentVideos.length) {
      getMostRecentVideos();
    }
    if (!popularVideos.length) {
      getMostPopularVideos();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getMostRecentVideos = async (): Promise<void> => {
    setRecentRequestPending(true);
    const results = await axios.get(
      getVideosUrl('date', most_recent.number_of_videos)
    );
    const videos = results.data?.items;
    if (videos) {
      setRecentVideos(videos);
    }
    setRecentRequestPending(false);
  };

  const getMostPopularVideos = async (): Promise<void> => {
    setPopularRequestPending(true);
    const results = await axios.get(
      getVideosUrl('viewCount', most_popular.number_of_videos)
    );
    const videos = results.data?.items;
    if (videos) {
      setPopularVideos(videos);
    }
    setPopularRequestPending(false);
  };

  return (
    <Fragment>
      <DynamicHead title={'Media'} description="Media page" />
      <Box display="grid" gap="1rem" padding={isMediumView ? '2rem' : '1rem'}>
        <Box>
          <Typography variant="h4">Sermons</Typography>
        </Box>
        <Divider></Divider>
        {isRequestPending() ? (
          <LoadingIndication loadingText="Loading media..." />
        ) : (
          <Fragment>
            <Link
              href={`${activeRoute}/${recentVideos[0]?.id?.videoId || '#'}`}
              style={{ textDecoration: 'none' }}
            >
              <MostRecentVideo video={recentVideos[0]} />
            </Link>
            <Box width="100%" overflow="hidden">
              <Typography variant="h4">Recent</Typography>
              <HorizontalScrollMedia mediaItems={recentVideos.slice(1)} />
            </Box>
            <Box width="100%" overflow="hidden">
              <Typography variant="h4">Popular</Typography>
              <HorizontalScrollMedia mediaItems={popularVideos} />
            </Box>
          </Fragment>
        )}
      </Box>
    </Fragment>
  );
};

export default Media;
