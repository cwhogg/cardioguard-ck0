interface JsonLdProps {
  type: string;
  data: Record<string, any>;
}

export function JsonLd({ type, data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2),
      }}
    />
  )
}