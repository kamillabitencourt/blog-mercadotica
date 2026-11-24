import { GetServerSideProps } from "next";
import functions from "../api/functions";
import { SITE } from "../data/site";

function iso(value: any): string | undefined {
  if (value == null) return undefined;
  const d =
    typeof value === "object"
      ? new Date(value.seconds * 1000)
      : typeof value === "number"
        ? new Date(value * 1000)
        : new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let news: any[] = [];
  try {
    const r = await functions.get("/news");
    news = r.data?.news || [];
  } catch {
    news = [];
  }

  const urls = [
    `<url><loc>${SITE.blogUrl}/</loc></url>`,
    ...news
      .filter((n) => n.slug)
      .map((n) => {
        const last = iso(n.editedAt) || iso(n.createdAt);
        return `<url><loc>${SITE.blogUrl}/noticias/${n.slug}</loc>${
          last ? `<lastmod>${last}</lastmod>` : ""
        }</url>`;
      }),
  ];

  res.setHeader("Content-Type", "application/xml");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate");
  res.write(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`
  );
  res.end();
  return { props: {} };
};

export default function Sitemap() {
  return null;
}
