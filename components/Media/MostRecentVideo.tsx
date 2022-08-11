import {
  useMediaQuery,
  Box,
  useTheme,
  ImageListItem,
  ImageListItemBar,
  Chip,
  IconButton,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Image from 'next/image';
import styles from '../../styles/Media.module.css';

type Props = {
  video: any;
};

const MostRecentVideo = (props: Props) => {
  const isSmallView = useMediaQuery(useTheme().breakpoints.up('sm'));
  const { video } = props;

  return (
    <Box display="grid" gap="2rem">
      <Box
        display="grid"
        position="relative"
        width="100%"
        height={isSmallView ? '550px' : '250px'}
        boxShadow={5}
        className="grow-on-hover-small"
      >
        <Chip
          label="Most Recent"
          variant="filled"
          className={styles.categoryChip}
        />
        <IconButton className={styles.playButton}>
          <PlayArrowIcon
            sx={{
              fontSize: isSmallView ? '5rem' : '3.5rem',
            }}
            className={styles.playButtonIcon}
          />
        </IconButton>
        {video?.snippet?.thumbnails?.medium?.url && (
          <ImageListItem>
            <Image
              src={video.snippet.thumbnails.medium.url}
              alt={video?.snippet?.title}
              layout="fill"
              priority={true}
            />
            <ImageListItemBar
              title={video?.snippet?.title}
              subtitle={video?.snippet?.description?.slice(0, 100)}
            />
          </ImageListItem>
        )}
      </Box>
    </Box>
  );
};

export default MostRecentVideo;
