import '@fontsource-variable/parkinsans';
import '@fontsource-variable/host-grotesk';
import '@fontsource-variable/ubuntu-sans-mono';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { business } from '../content/business';
import { getHeadlineManagementPercent } from '../content/fees';
import { site } from '../lib/site';
import './tailwind.input.css';

const headlinePct = getHeadlineManagementPercent();
const defaultDescription = `Alder Key manages and leases rental homes across Portland for a clear ${headlinePct}% of collected rent. See every fee, request a free rental appraisal, or report a repair.`;

export const metadata: Metadata = {
  title: { default: business.name, template: `%s — ${business.name}` },
  description: defaultDescription,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: business.name,
    description: defaultDescription,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: `${business.name} — Rentals managed for ${headlinePct}% of collected rent in Portland` }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main">Skip to content</a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
