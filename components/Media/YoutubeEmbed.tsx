import { Box } from '@mui/material';

type Props = {
  videoId?: string;
};

const YoutubeEmbed = (props: Props) => {
  const getVideoUrl = (): string => {
    return `https://www.youtube.com/embed/${props.videoId}?autoplay=1`;
  };

  return (
    <Box>
      <iframe
        width="100%"
        height="480"
        src={getVideoUrl()}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube video"
      />
    </Box>
  );
};

export default YoutubeEmbed;
