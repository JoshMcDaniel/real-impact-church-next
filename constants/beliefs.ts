import appConfig from './app-config/config.json';

export type Verse = { label: string; link: string };
export type Belief = { title: string; text: string; verses: Verse[] };

export const beliefs: Belief[] = appConfig.website.beliefs.doctrine.beliefs;

/** URL fragment for a belief, e.g. "Jesus’ Blood" -> "jesus-blood". */
export const beliefSlug = (title: string): string =>
  title
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Shortens text to about `max` characters on a word boundary. */
export const excerpt = (text: string, max = 120): string => {
  if (text.length <= max) return text;
  return `${text.slice(0, max).replace(/\s+\S*$/, '').replace(/[,;:]$/, '')}…`;
};
