/**
 * Brand color tokens used by the redesigned layout.
 * These match the palette in `app-config/theme.json`, plus a few tints/shades
 * derived from it for borders, muted text and hover states.
 */
export const brand = {
  charcoal: '#2b2b2b',
  red: '#d90429',
  redDark: '#b0031f',
  redTint: '#fde6ea',
  redSoft: '#ffe3e7',
  mist: '#edf2f4',
  paper: '#f7fcff',
  white: '#ffffff',
  text: '#4a4a4a',
  muted: '#5c6266',
  line: '#e3e8eb',
  lineStrong: '#d5dce0',
  footer: '#1f1f1f',
  footerText: '#c9ced1',
} as const;

/** Max content width for page sections. */
export const contentMaxWidth = 1240;
