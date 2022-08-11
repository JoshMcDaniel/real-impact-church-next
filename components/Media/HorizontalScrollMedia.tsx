import { ImageList, Box, ImageListItem, ImageListItemBar } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export type HorizontalScrollMediaItem = {
  id: string;
  src: string;
  alt: string;
  title: string;
};

type Props = {
  mediaItems: any[];
};

const HorizontalScrollMedia = (props: Props) => {
  const { mediaItems } = props;
  const activeRoute = useRouter().pathname;

  const getScrollableMediaItems = (
    items: any[]
  ): HorizontalScrollMediaItem[] => {
    return items.map((video) => ({
      id: video?.id?.videoId,
      src: video?.snippet?.thumbnails?.medium?.url,
      alt: video?.snippet?.title,
      title: video?.snippet?.title,
    }));
  };

  const scrollableMedia = getScrollableMediaItems(mediaItems);

  return (
    <ImageList
      className="hide-scrollbar"
      gap={32}
      sx={{
        display: 'grid',
        maxWidth: '100%',
        width: 'fit-content',
        height: '250px',
        overflowX: 'auto',
        alignItems: 'center',
        margin: 0,
        padding: '0 1rem',
      }}
      cols={scrollableMedia.length}
    >
      {scrollableMedia.map((item) => (
        <Box
          boxShadow={3}
          key={item.id}
          className="grow-on-hover-medium"
          position="relative"
          width="300px"
          height="200px"
        >
          <Link
            href={`${activeRoute}/${item?.id}`}
            style={{ textDecoration: 'none' }}
          >
            <ImageListItem
              sx={{
                minWidth: '100% !important',
                minHeight: '100% !important',
                boxShadow: 3,
                // position: 'relative',
              }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                layout="fill"
                priority={true}
              />
              <ImageListItemBar title={item.title} />
            </ImageListItem>
          </Link>
        </Box>
      ))}
    </ImageList>
  );
};

export default HorizontalScrollMedia;
