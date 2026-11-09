import Button, { ButtonProps } from '@mui/material/Button';
import Link from 'next/link';
import { brand } from '../../constants/brand';

type Variant = 'red' | 'dark' | 'ghost' | 'outline' | 'white';

type PillButtonProps = Omit<ButtonProps, 'variant' | 'href'> & {
  href: string;
  tone?: Variant;
  size?: 'medium' | 'small';
};

const toneStyles: Record<Variant, object> = {
  red: {
    backgroundColor: brand.red,
    color: brand.white,
    '&:hover': { backgroundColor: brand.redDark },
  },
  dark: {
    backgroundColor: brand.charcoal,
    color: brand.white,
    '&:hover': { backgroundColor: '#000000' },
  },
  ghost: {
    border: '2px solid rgba(255,255,255,.85)',
    color: brand.white,
    '&:hover': { backgroundColor: brand.white, color: brand.charcoal },
  },
  outline: {
    border: `2px solid ${brand.charcoal}`,
    color: brand.charcoal,
    '&:hover': { backgroundColor: brand.charcoal, color: brand.white },
  },
  white: {
    backgroundColor: brand.white,
    color: brand.charcoal,
    '&:hover': { backgroundColor: brand.mist },
  },
};

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);

/**
 * Rounded call-to-action link styled as a button.
 * Internal routes use Next.js client-side navigation; external links open normally.
 */
export const PillButton = ({
  href,
  tone = 'red',
  size = 'medium',
  sx,
  children,
  ...rest
}: PillButtonProps) => {
  const external = isExternal(href);
  return (
    <Button
      {...rest}
      {...(external
        ? { component: 'a', href, rel: href.startsWith('http') ? 'noopener' : undefined }
        : { component: Link, href })}
      disableElevation
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        minHeight: size === 'small' ? 44 : 48,
        px: size === 'small' ? '18px' : '26px',
        borderRadius: '999px',
        fontWeight: 700,
        fontSize: size === 'small' ? 14 : 15,
        letterSpacing: '.02em',
        textTransform: 'none',
        lineHeight: 1.2,
        transition: 'transform .15s ease, background-color .15s ease',
        '&:hover': { transform: 'translateY(-1px)' },
        ...toneStyles[tone],
        ...(sx as object),
      }}
    >
      {children}
    </Button>
  );
};

export default PillButton;
