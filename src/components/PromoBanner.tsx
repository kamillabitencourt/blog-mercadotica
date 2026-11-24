import React from "react";
import { BANNER_SEMANA } from "../data/produtos";
import styles from "../styles/components/PromoBanner.module.css";

export default function PromoBanner() {
  const { image, imageMobile, alt, href } = BANNER_SEMANA;

  return (
    <aside className={styles.wrap} aria-label="Novidades da semana">
      <a href={href} className={styles.link}>
        {image ? (
          <picture>
            {imageMobile && <source media="(max-width: 650px)" srcSet={imageMobile} />}
            <img src={image} alt={alt} loading="lazy" className={styles.img} />
          </picture>
        ) : (
          <span className={styles.placeholder}>
            <strong>Espaço do banner</strong>
            <small>Edite BANNER_SEMANA em src/data/produtos.ts (1200×300)</small>
          </span>
        )}
      </a>
    </aside>
  );
}
