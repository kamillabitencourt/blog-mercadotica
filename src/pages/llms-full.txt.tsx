import { GetServerSideProps } from "next";
import functions from "../api/functions";
import { SITE } from "../data/site";

function dateStr(value: any): string {
  if (value == null) return "";
  const d =
    typeof value === "object"
      ? new Date(value.seconds * 1000)
      : typeof value === "number"
        ? new Date(value * 1000)
        : new Date(value);
  return Number.isNaN(d.getTime()) ? "" : d.toISOString().slice(0, 10);
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  let news: any[] = [];
  try {
    const r = await functions.get("/news");
    news = r.data?.news || [];
  } catch {
    news = [];
  }

  const body = [
    `# Blog Mercadótica`,
    ``,
    `> Rede de óticas fundada em ${SITE.foundingDate} em Vitória da Conquista (BA), com modelo de franquias.`,
    ``,
    ...news
      .filter((n) => n.slug)
      .flatMap((n) => [
        `## ${n.title}`,
        `- URL: ${SITE.blogUrl}/noticias/${n.slug}`,
        dateStr(n.createdAt) ? `- Data: ${dateStr(n.createdAt)}` : "",
        n.description ? `- Resumo: ${n.description}` : "",
        ``,
      ])
      .filter((l, i, a) => !(l === "" && a[i - 1] === "")),
  ].join("\n");

  res.setHeader("Content-Type", "text/markdown; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate");
  res.write(body);
  res.end();
  return { props: {} };
};

export default function LlmsFull() {
  return null;
}
