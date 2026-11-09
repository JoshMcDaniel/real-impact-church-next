import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import LinkIcon from '@mui/icons-material/Link';
import { useState } from 'react';
import { brand } from '../../constants/brand';

/** Copies a URL to the clipboard and briefly confirms it. */
export const CopyLinkButton = ({ url }: { url: string }) => {
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
        minHeight: 44,
        px: '18px',
        borderRadius: '999px',
        border: `2px solid ${brand.charcoal}`,
        color: brand.charcoal,
        fontWeight: 700,
        fontSize: 14,
        textTransform: 'none',
        '&:hover': { backgroundColor: brand.charcoal, color: brand.white },
      }}
    >
      {copied ? 'Link copied' : 'Copy Link'}
    </Button>
  );
};

export default CopyLinkButton;
