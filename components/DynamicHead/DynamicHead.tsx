import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import { useOrganizationConfig } from '../../constants/app-config/app-config-hooks';
import { absoluteUrl, siteUrl } from '../../constants/site';

type Props = {
  description: string;
  /** Page name; rendered as "<title> - Real Impact Church". */
  title?: string;
  /** Overrides the whole <title> (used by the home page). */
  fullTitle?: string;
  /** Social share image (site-relative or absolute). */
  image?: string;
  imageAlt?: string;
  /** JSON-LD structured data objects to embed in the page. */
  jsonLd?: object[];
};

const DEFAULT_SHARE_IMAGE = '/images/revival.jpg';

const DynamicHead = (props: Props) => {
  const organizationConfig = useOrganizationConfig();
  const router = useRouter();
  const title =
    props.fullTitle ??
    `${props.title ? `${props.title} - ` : ''}${organizationConfig.full_name}`;
  const path = (router.asPath || '/').split(/[?#]/)[0];
  const canonical = siteUrl ? absoluteUrl(path) : undefined;
  const image = siteUrl ? absoluteUrl(props.image ?? DEFAULT_SHARE_IMAGE) : undefined;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={props.description} />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={organizationConfig.full_name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:locale" content="en_US" />
      {canonical && <meta property="og:url" content={canonical} />}
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:alt" content={props.imageAlt ?? organizationConfig.full_name} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={props.description} />
      {image && <meta name="twitter:image" content={image} />}

      {props.jsonLd?.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          // JSON.stringify output is safe here; escape "<" to avoid closing the script tag early.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
        />
      ))}

      <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-icon-192x192.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />
      <meta name="theme-color" content="#2b2b2b" />
    </Head>
  );
};

export default DynamicHead;
