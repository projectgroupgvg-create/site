// Renders a JSON-LD <script> tag. `data` is trusted, server-generated
// structured data (never raw user input), so JSON.stringify is safe here.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
