import { Avatar, Skeleton } from '@mui/material';
import React, { useState } from 'react';

type AvatarProps = {
  alt: string;
  src: string;
  justifySelf: string;
  maxHeight: string;
  maxWidth: string;
};

export const AvatarWithFallbacks = (props: AvatarProps) => {
  const [imageLoaded, setIsImageLoaded] = useState(false);

  const imageHasLoaded = () => {
    setIsImageLoaded(true);
  };

  return (
    <React.Fragment>
      <Avatar
        alt={props.alt}
        src={props.src}
        sx={{
          display: imageLoaded ? 'grid' : 'none',
          justifySelf: props.justifySelf,
          maxHeight: props.maxHeight,
          maxWidth: props.maxWidth,
          width: '100%',
          height: '100%',
        }}
        imgProps={{ onLoad: imageHasLoaded }}
      />
      {!imageLoaded && (
        <Skeleton
          variant="circular"
          sx={{
            justifySelf: props.justifySelf,
            maxHeight: props.maxHeight,
            maxWidth: props.maxWidth,
            width: '100%',
            height: '100%',
          }}
        />
      )}
    </React.Fragment>
  );
};

export default AvatarWithFallbacks;
