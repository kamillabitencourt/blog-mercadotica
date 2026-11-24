import React, { useContext, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { News, NewsPart } from "../interfaces/News";
import { CategoryContext } from "../contexts/CategoryContext";
import Post from "../components/Post";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import ProductStrip from "../components/ProductStrip";
import Newsletter from "../components/Newsletter";
import PromoBanner from "../components/PromoBanner";
import functions from "../api/functions";
import { CATEGORIES, SITE } from "../data/site";
import { PRODUTOS_DESTAQUE } from "../data/produtos";
import { homeSchema } from "../lib/schema";

import styles from "../styles/pages/Home.module.css";

interface HomeProps {
  posts: NewsPart[];
}

const PER_PAGE = 9;

function toSeconds(v: NewsPart["createdAt"]): number {
  if (v == null) return 0;
  return typeof v === "object" ? v.seconds : v;
}

function mapPosts(data: News[] | undefined): NewsPart[] {
  if (!data) return [];
  const list = data.map(
    (item) =>
      ({
        title: item.title,
        imageURL: item.imageURL,
        slug: item.slug,
        categories: item.categories,
        description: item.description,
        createdAt: item.createdAt,
      }) as NewsPart
  );
  // Mais recentes primeiro (se a API não mandar a data, mantém a ordem original).
  return list
    .map((p, i) => ({ p, i }))
    .sort((a, b) => toSeconds(b.p.createdAt) - toSeconds(a.p.createdAt) || a.i - b.i)
    .map((x) => x.p);
}

export default function Home({ posts }: HomeProps) {
  const [allNews, setAllNews] = useState<NewsPart[]>(posts || []);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { categorySelected, changeCategory } = useContext(CategoryContext);

  // Se o servidor não conseguiu carregar, tenta de novo no navegador.
  useEffect(() => {
    if (allNews.length === 0) {
      functions
        .get("/news")
        .then((res) => setAllNews(mapPosts(res?.data?.news)))
        .catch(() => {});
    }
  }, []);

  const clearText = (t: string) =>
    t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const list = useMemo(() => {
    const q = clearText(query.trim());
    return allNews.filter(
      (item) =>
        (categorySelected === 0 || item.categories?.includes(categorySelected)) &&
        (q === "" || clearText(item.title || "").includes(q))
    );
  }, [allNews, categorySelected, query]);

  useEffect(() => setPage(1), [categorySelected, query]);

  const searching = query.trim() !== "";

  // Hierarquia: 1 destaque + 2 laterais, 3 médios, 4 compactos, resto em grade paginada.
  const hero = list[0];
  const side = list.slice(1, 3);
  const mid = list.slice(3, 6);
  const compact = list.slice(6, 10);
  const rest = searching ? list : list.slice(10);

  const totalPages = Math.ceil(rest.length / PER_PAGE);
  const pageItems = rest.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  function goToPage(p: number) {
    setPage(p);
    document.getElementById("mais-materias")?.scrollIntoView({ behavior: "smooth" });
  }

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1
  );

  return (
    <div className={styles.page}>
      <Head>
        <title>Blog Mercadótica | Saúde visual, franquia e novidades</title>
        <meta
          name="description"
          content="Notícias sobre saúde visual, empreendedorismo e novidades da Mercadótica, rede de óticas desde 1991 em Vitória da Conquista (BA)."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href={`${SITE.blogUrl}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Blog Mercadótica" />
        <meta property="og:title" content="Blog Mercadótica" />
        <meta
          property="og:description"
          content="Saúde visual, empreendedorismo e novidades da rede Mercadótica."
        />
        <meta property="og:url" content={`${SITE.blogUrl}/`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema()) }}
        />
      </Head>

      <Header />

      <main className={styles.main}>
        <section className={styles.intro}>
          <h1>Blog Mercadótica</h1>
          <p>Saúde visual, empreendedorismo e novidades da rede.</p>
          <SearchBar onSearch={setQuery} />
          <nav className={styles.tabs} aria-label="Categorias">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className={categorySelected === c.id ? styles.tabActive : styles.tab}
                onClick={() => changeCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </nav>
        </section>

        {list.length === 0 && <p className={styles.empty}>Nenhuma matéria encontrada.</p>}

        {!searching && hero && (
          <>
            {/* NÍVEL 1 */}
            <section className={styles.level1} aria-label="Destaques">
              <Post item={hero} variant="hero" priority />
              {side.length > 0 && (
                <div className={styles.sideCol}>
                  {side.map((item) => (
                    <Post key={item.slug} item={item} variant="medium" />
                  ))}
                </div>
              )}
            </section>

            {/* NÍVEL 2 */}
            {mid.length > 0 && (
              <section className={styles.level2} aria-label="Mais lidas">
                {mid.map((item) => (
                  <Post key={item.slug} item={item} variant="medium" />
                ))}
              </section>
            )}

            {/* NÍVEL 3 */}
            {compact.length > 0 && (
              <section className={styles.level3} aria-label="Outras matérias">
                {compact.map((item) => (
                  <Post key={item.slug} item={item} variant="compact" />
                ))}
              </section>
            )}

            <ProductStrip
              title="Veja na loja"
              subtitle="Produtos para cuidar da sua visão"
              items={PRODUTOS_DESTAQUE}
            />
          </>
        )}

        {rest.length > 0 && (
          <section id="mais-materias" aria-label={searching ? "Resultados da busca" : "Mais matérias"}>
            <h2 className={styles.sectionTitle}>
              {searching ? `Resultados para “${query.trim()}”` : "Mais matérias"}
            </h2>
            <div className={styles.grid}>
              {pageItems.map((item) => (
                <Post key={item.slug} item={item} variant="grid" />
              ))}
            </div>

            {totalPages > 1 && (
              <nav className={styles.pagination} aria-label="Paginação">
                <button disabled={page === 1} onClick={() => goToPage(page - 1)}>
                  Anterior
                </button>
                {pages.map((n, i) => (
                  <React.Fragment key={n}>
                    {i > 0 && n - pages[i - 1] > 1 && <span>…</span>}
                    <button
                      className={n === page ? styles.pageActive : ""}
                      aria-current={n === page ? "page" : undefined}
                      onClick={() => goToPage(n)}
                    >
                      {n}
                    </button>
                  </React.Fragment>
                ))}
                <button disabled={page === totalPages} onClick={() => goToPage(page + 1)}>
                  Próxima
                </button>
              </nav>
            )}
          </section>
        )}

        {!searching && (
          <>
            <div className={styles.newsletterWrap}>
              <Newsletter source="home" />
            </div>
            <PromoBanner />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await functions
    .get("/news")
    .then((res) => mapPosts(res?.data?.news as News[]))
    .catch(() => [] as NewsPart[]);

  // createdAt pode vir como objeto Firestore; JSON-serializável, mas undefined não é.
  return { props: { posts: JSON.parse(JSON.stringify(posts)) } };
}
