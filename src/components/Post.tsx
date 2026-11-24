import React, { useState } from "react";
import Link from "next/link";
import { NewsPart } from "../interfaces/News";
import ShareBox from "./ShareBox";
import { CATEGORIES } from "../data/site";
import styles from "../styles/components/Post.module.css";

export type PostVariant = "hero" | "medium" | "compact" | "grid";

interface PostProps {
  item: NewsPart;
  variant?: PostVariant;
  priority?: boolean;
}

const Post: React.FC<PostProps> = ({ item, variant = "grid", priority }) => {
  const [broken, setBroken] = useState(false);
  const href = `/noticias/${item.slug}`;
  const category = CATEGORIES.find((c) => c.id !== 0 && item.categories?.includes(c.id));
  const Title = variant === "hero" ? "h2" : "h3";

  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      <Link href={href} className={styles.imageLink} tabIndex={-1} aria-hidden="true">
        <img
          src={broken || !item.imageURL ? "/default-image.svg" : item.imageURL}
          alt=""
          loading={priority ? "eager" : "lazy"}
          className={broken || !item.imageURL ? styles.fallback : styles.image}
          onError={() => setBroken(true)}
        />
      </Link>

      <div className={styles.body}>
        {category && <span className={styles.category}>{category.label}</span>}
        <Title className={styles.title}>
          <Link href={href}>{item.title}</Link>
        </Title>
        {variant === "hero" && item.description && (
          <p className={styles.excerpt}>{item.description}</p>
        )}
        {variant !== "compact" && (
          <div className={styles.share}>
            <ShareBox slug={item.slug} title={item.title} compact />
          </div>
        )}
      </div>
    </article>
  );
};

export default Post;
