import { SITE } from "../data/site";

const ORG_ID = `${SITE.mainUrl}/#organization`;

export function organizationNode() {
  return {
    "@type": ["Organization", "Store"],
    "@id": ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.mainUrl,
    logo: SITE.logoUrl,
    taxID: SITE.cnpj,
    foundingDate: SITE.foundingDate,
    telephone: SITE.phone.tel,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vitória da Conquista",
      addressRegion: "BA",
      addressCountry: "BR",
    },
    sameAs: [
      ...Object.values(SITE.social).filter(Boolean),
      ...SITE.sameAs,
    ],
  };
}

export function homeSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode(),
      {
        "@type": "Blog",
        "@id": `${SITE.blogUrl}/#blog`,
        url: SITE.blogUrl,
        name: "Blog Mercadótica",
        publisher: { "@id": ORG_ID },
        inLanguage: "pt-BR",
      },
    ],
  };
}

function toIso(value: any): string | undefined {
  if (value == null) return undefined;
  const d =
    typeof value === "object"
      ? new Date(value.seconds * 1000)
      : typeof value === "number"
        ? new Date(value * 1000)
        : new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

export function extractFaq(html: string) {
  const out: { q: string; a: string }[] = [];
  const re = /<h[23][^>]*>([^<]*\?)\s*<\/h[23]>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html || ""))) {
    out.push({
      q: m[1].trim(),
      a: m[2].replace(/<[^>]+>/g, "").trim(),
    });
  }
  return out;
}

export function postSchema(news: any) {
  const url = `${SITE.blogUrl}/noticias/${news.slug}`;
  const keywords: string[] = (news.keywords || []).map((k: any) =>
    typeof k === "object" && k !== null && "text" in k ? k.text : String(k)
  );
  const published = toIso(news.createdAt);
  const modified = toIso(news.editedAt) || published;
  const faq = extractFaq(news.content || "");

  const graph: any[] = [
    organizationNode(),
    {
      "@type": "BlogPosting",
      "@id": `${url}#post`,
      mainEntityOfPage: url,
      headline: news.title,
      description: news.description || undefined,
      image: news.imageURL || undefined,
      datePublished: published,
      dateModified: modified,
      inLanguage: "pt-BR",
      author: { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
      about: keywords.slice(0, 3).map((name) => ({ "@type": "Thing", name })),
      mentions: keywords.slice(3).map((name) => ({ "@type": "Thing", name })),
    },
  ];

  if (faq.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
