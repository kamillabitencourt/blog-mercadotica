
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { News } from "../../interfaces/News";
import Banner from "../../components/Banner";
import FourOhFour from "../404";
import Form from "../../components/Form";
import functions from "../../api/functions";
import Header from "../../components/Header";
import ShareBox from "../../components/ShareBox";
import Footer from "../../components/Footer";
import ProductStrip from "../../components/ProductStrip";
import Newsletter from "../../components/Newsletter";
import { PRODUTOS_DESTAQUE } from "../../data/produtos";
import { SITE } from "../../data/site";
import { postSchema } from "../../lib/schema";
import { FiExternalLink, FiCalendar } from "react-icons/fi";

import styles from "../../styles/pages/PostPage.module.css";

interface PostPageProps {
  news: News | null;
}

interface NewsProps extends Omit<News, "createdAt" | "editedAt"> {
  createdAt?: { seconds: number } | number | string | null;
  editedAt?: { seconds: number } | number | string | null;
}

function formatDate(value: NewsProps["createdAt"]): string | null {
  if (value == null) {
    return null;
  }

  let date: Date;

  if (typeof value === "object") {
    date = new Date(value.seconds * 1000);
  } else if (typeof value === "number") {
    date = new Date(value * 1000);
  } else {
    date = new Date(value);
  }

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function toIso(value: NewsProps["createdAt"]): string | undefined {
  if (value == null) return undefined;
  const d =
    typeof value === "object"
      ? new Date(value.seconds * 1000)
      : typeof value === "number"
        ? new Date(value * 1000)
        : new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

function normalizeNews(data: NewsProps): News {
  return {
    ...data,
    createdAt:
      data.createdAt == null
        ? null
        : typeof data.createdAt === "object"
          ? data.createdAt.seconds
          : typeof data.createdAt === "number"
            ? data.createdAt
            : data.createdAt,
    editedAt:
      data.editedAt == null
        ? null
        : typeof data.editedAt === "object"
          ? data.editedAt.seconds
          : typeof data.editedAt === "number"
            ? data.editedAt
            : data.editedAt,
  } as News;
}

export default function PostPage({ news: initialNews }: PostPageProps) {
  const [news, setNews] = useState<News | null>(initialNews);

  useEffect(() => {
    if (!initialNews?.slug) {
      return;
    }

    let active = true;

    functions
      .get(`/news/${initialNews.slug}`)
      .then((res) => {
        if (!active || !res.data?.news) {
          return;
        }

        const data = normalizeNews(res.data.news as NewsProps);
        setNews(data);
      })
      .catch((err) => {
        console.error("Erro ao carregar notícia:", err);
      });

    return () => {
      active = false;
    };
  }, [initialNews?.slug]);

  if (!news) {
    return <FourOhFour />;
  }

  const formattedDate = formatDate(
    (news as NewsProps).createdAt
  );
  const isoDate = toIso((news as NewsProps).createdAt);
  const isoModified = toIso((news as NewsProps).editedAt) || isoDate;
  const canonical = `${SITE.blogUrl}/noticias/${news.slug}`;

  return (
    <div className={styles.page}>
      <Head>
        <title>{`${news.title} - Blog Mercadótica`}</title>

        <meta
          name="description"
          content={news.description || ""}
        />

        <meta
          name="keywords"
          content={
            news.keywords
              ?.map((item) =>
                typeof item === "object" && item !== null && "text" in item
                  ? item.text
                  : String(item)
              )
              .join(",") || ""
          }
        />

        <meta property="og:title" content={news.title} />
        <meta
          property="og:description"
          content={news.description || ""}
        />
        <meta property="og:image" content={news.imageURL || ""} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="og:site_name" content="Blog Mercadótica" />
        <link rel="canonical" href={canonical} />
        {isoDate && <meta property="article:published_time" content={isoDate} />}
        {isoModified && <meta property="article:modified_time" content={isoModified} />}
        <meta property="article:author" content={SITE.name} />
        {news.keywords?.map((k, i) => (
          <meta key={i} property="article:tag" content={typeof k === "object" && k !== null && "text" in k ? k.text : String(k)} />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema(news)) }}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={news.title} />
        <meta
          name="twitter:description"
          content={news.description || ""}
        />
        <meta name="twitter:image" content={news.imageURL || ""} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Header />

      <main id="main" className={styles.main}>
        <article className={styles.article}>
          <header className={styles.articleHeader}>
            <h1>{news.title}</h1>
            {formattedDate && isoDate && (
              <p className={styles.meta}>
                <FiCalendar size={16} aria-hidden />
                <time dateTime={isoDate}>{formattedDate}</time>
                {isoModified && isoModified.slice(0, 10) !== isoDate.slice(0, 10) && (
                  <span>
                    {" "}· Atualizado em{" "}
                    <time dateTime={isoModified}>
                      {new Date(isoModified).toLocaleDateString("pt-BR")}
                    </time>
                  </span>
                )}
              </p>
            )}
          </header>

          {news.description && (
            <aside className={styles.summary} aria-label="Em resumo">
              <strong>Em resumo</strong>
              <p>{news.description}</p>
            </aside>
          )}

          {news.imageURL && (
            <figure className={styles.cover}>
              <img src={news.imageURL} alt={news.title} />
            </figure>
          )}

          <div className={styles.share}>
            <ShareBox slug={news.slug} title={news.title} />
          </div>

          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: news.content || "" }}
          />

          <div className={styles.share}>
            <ShareBox slug={news.slug} title={news.title} />
          </div>
        </article>

        <div className={styles.wide}>
          <ProductStrip
            title="Veja na loja"
            subtitle="Produtos para cuidar da sua visão"
            items={PRODUTOS_DESTAQUE}
          />
        </div>

        <div className={styles.wide}>
          <Newsletter source="post" />
        </div>

        {news.relatedNews && news.relatedNews.length > 0 && (
          <section className={styles.related} aria-labelledby="related-title">
            <h2 id="related-title">Notícias relacionadas</h2>
            <ul>
              {news.relatedNews.map((item) => (
                <li key={item.slug}>
                  <Link href={`/noticias/${item.slug}`}>
                    {item.title}
                    <FiExternalLink aria-hidden size={16} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className={styles.wide}>
          <Banner />
        </div>

        <div className={styles.wide}>
          <Form />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const res = await functions.get(`/news/${params.slug}`);
    const rawNews = res.data?.news;

    if (!rawNews) {
      return {
        notFound: true,
        revalidate: 60,
      };
    }

    const news = normalizeNews(rawNews as NewsProps);

    return {
      props: {
        news,
      },
      revalidate: 60,
    };
  } catch (err) {
    console.error("Erro ao buscar notícia:", err);

    return {
      notFound: true,
      revalidate: 60,
    };
  }
}

export async function getStaticPaths() {
  try {
    const res = await functions.get("/news");
    const news = (res.data?.news || []) as News[];

    return {
      paths: news
        .filter((item) => Boolean(item.slug))
        .map((item) => ({
          params: { slug: item.slug },
        })),
      fallback: "blocking",
    };
  } catch (err) {
    console.error("Erro ao buscar lista de notícias:", err);

    return {
      paths: [],
      fallback: "blocking",
    };
  }
}
