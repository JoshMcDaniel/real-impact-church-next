import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import LinkIcon from '@mui/icons-material/Link';
import { useState } from 'react';
import { brand } from '../../constants/brand';

/** Copies a URL to the clipboard and briefly confirms it. */
export const CopyLinkButton = ({ url, onDark = false, sx }: { url: string; onDark?: boolean; sx?: object }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy this link:', url);
    }
  };

  return (
    <Button
      onClick={copy}
      startIcon={copied ? <CheckIcon /> : <LinkIcon />}
      aria-live="polite"
      sx={{
        minHeight: 48,
        px: '18px',
        borderRadius: '999px',
        border: `2px solid ${onDark ? 'rgba(255,255,255,.85)' : brand.charcoal}`,
        color: onDark ? brand.white : brand.charcoal,
        fontWeight: 700,
        fontSize: 15,
        textTransform: 'none',
        '&:hover': onDark
          ? { backgroundColor: brand.white, color: brand.charcoal }
          : { backgroundColor: brand.charcoal, color: brand.white },
        ...sx,
      }}
    >
      {copied ? 'Link copied' : 'Copy Link'}
    </Button>
  );
};

export default CopyLinkButton;
