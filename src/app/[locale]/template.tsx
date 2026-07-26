// Next.js remounts `template.tsx` on every navigation (unlike layout.tsx,
// which persists) — that remount is what triggers the CSS entrance
// animation below on each page change, giving a soft, slow cross-page
// transition without any client-side JS or extra dependency.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-transition">{children}</div>;
}
