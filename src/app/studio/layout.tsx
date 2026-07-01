export const metadata = {
  title: 'Gangan & Partners — Studio',
  robots: { index: false, follow: false },
};

// The Studio route lives outside the [locale] tree (it's not translated and
// shouldn't be wrapped in the site's Nav/Footer/next-intl provider), so it
// gets its own minimal root layout with html/body.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
