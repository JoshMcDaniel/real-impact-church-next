import {
  Box,
  Card,
  CardActions,
  CardContent,
  Skeleton,
  Typography,
} from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect } from 'react';
import DynamicHead from '../../../components/DynamicHead/DynamicHead';
import YoutubeEmbed from '../../../components/Media/YoutubeEmbed';
import ArrowLink from '../../../components/shared/ArrowLink';

/**
 * The Youtube snippet info used by this website.
 */
export type YoutubeSnippet = {
  categoryId: string;
  channelId: string;
  channelTitle: string;
  description: string;
  liveBroadcastContent: string;
  publishedAt: string;
  title: string;
};

const SelectedMedia = () => {
  const [videoInfo, setVideoInfo] = React.useState<YoutubeSnippet>();
  const router = useRouter();
  const videoId = router.query.selectedId;

  const videoSnippetUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`;

  const watchVideoOnYoutubeUrl = `https://www.youtube.com/watch?v=${videoId}`;

  useEffect(() => {
    if (!!videoId && !videoInfo) {
      getVideoInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const getVideoInfo = () => {
    axios.get(videoSnippetUrl).then((res) => {
      if (res?.data?.items[0]?.snippet) {
        setVideoInfo(res.data.items[0].snippet);
        console.log({ videoInfo });
      }
    });
  };

  const getFormattedPublishedAtDate = (publishedAt: string): string => {
    return dayjs(publishedAt).format('MMMM DD, YYYY');
  };

  return (
    <Fragment>
      <DynamicHead
        title={videoInfo?.title || 'Watch'}
        description={videoInfo?.description || 'Enjoy the media!'}
      />
      <Box display="grid" gap="2rem">
        {videoId && <YoutubeEmbed videoId={videoId as string} />}
        <Box display="grid" padding="0 1rem 2rem 1rem">
          <Card
            sx={{
              width: '100%',
              maxWidth: 800,
              justifySelf: 'center',
            }}
            raised
          >
            <CardContent>
              <Typography variant="h5" fontWeight="bolder">
                {videoInfo?.title || <Skeleton width="60%" />}
              </Typography>
              <Typography variant="caption" gutterBottom>
                {videoInfo?.publishedAt ? (
                  `Published: ${getFormattedPublishedAtDate(
                    videoInfo.publishedAt
                  )}`
                ) : (
                  <Skeleton width="100px" />
                )}
              </Typography>
              <Typography variant="body2">
                {videoInfo?.description || <Skeleton />}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                padding: '0 0 1rem 1rem',
              }}
            >
              <ArrowLink
                linkText="Watch on YouTube"
                route={watchVideoOnYoutubeUrl}
                openInNewTab={true}
              />
            </CardActions>
          </Card>
        </Box>
      </Box>
    </Fragment>
  );
};

export default SelectedMedia;
