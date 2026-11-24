import React from "react";
import { FaGlasses } from "react-icons/fa";
import { Produto } from "../data/produtos";
import styles from "../styles/components/ProductStrip.module.css";

interface ProductStripProps {
  title: string;
  subtitle?: string;
  items: Produto[];
}

export default function ProductStrip({ title, subtitle, items }: ProductStripProps) {
  if (!items?.length) return null;

  return (
    <aside className={styles.strip} aria-label={title}>
      <header className={styles.head}>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </header>

      <ul className={styles.list}>
        {items.map((p, i) => (
          <li key={`${p.name}-${i}`}>
            <a href={p.href} className={styles.card}>
              <span className={`${styles.media} ${styles[`tone${i % 4}`]}`}>
                {p.image ? <img src={p.image} alt={p.name} loading="lazy" /> : <FaGlasses aria-hidden />}
              </span>
              {p.tag && <span className={styles.tag}>{p.tag}</span>}
              <span className={styles.name}>{p.name}</span>
              <span className={styles.link}>Ver na loja →</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
