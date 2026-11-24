import { useState } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { FiCopy, FiCheck } from "react-icons/fi";
import { SITE } from "../data/site";
import styles from "../styles/components/ShareBox.module.css";

interface ShareBoxProps {
  slug: string;
  title?: string;
  compact?: boolean; // só ícones (usado nos cards)
}

export default function ShareBox({ slug, title, compact }: ShareBoxProps) {
  const [copied, setCopied] = useState(false);
  const getUrl = () =>
    typeof window !== "undefined"
      ? `${window.location.origin}/noticias/${slug}`
      : `${SITE.blogUrl}/noticias/${slug}`;
  const text = title || "Confira esta matéria da Mercadótica";

  function flashCopied() {
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2500);
  }

  // Instagram não tem URL de compartilhamento web: no celular abrimos o menu nativo
  // (Instagram, WhatsApp...) e no desktop copiamos o link para colar no Instagram.
  async function shareInstagram() {
    const url = getUrl();
    try {
      if (navigator.share) {
        await navigator.share({ title: text, text, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      flashCopied();
    } catch {
      // usuário cancelou o compartilhamento
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(getUrl());
      flashCopied();
    } catch {
      window.prompt("Copie o link da matéria:", getUrl());
    }
  }

  const whatsappHref = `https://wa.me/?text=${encodeURIComponent(`${text} ${getUrl()}`)}`;

  return (
    <div
      className={`${styles.shareBox} ${compact ? styles.compact : ""}`}
      aria-label="Compartilhar matéria"
    >
      {!compact && <span className={styles.label}>Compartilhar</span>}

      <a
        className={`${styles.btn} ${styles.whats}`}
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Compartilhar no WhatsApp"
        title="Compartilhar no WhatsApp"
      >
        <FaWhatsapp /> {!compact && <span>WhatsApp</span>}
      </a>

      <button
        type="button"
        className={`${styles.btn} ${styles.insta}`}
        onClick={shareInstagram}
        aria-label="Compartilhar no Instagram"
        title="Compartilhar no Instagram"
      >
        <FaInstagram /> {!compact && <span>{copied ? "Link copiado" : "Instagram"}</span>}
      </button>

      {!compact && (
        <button type="button" className={`${styles.btn} ${styles.copy}`} onClick={copyLink} aria-label="Copiar link">
          {copied ? <FiCheck /> : <FiCopy />} <span>{copied ? "Copiado" : "Copiar link"}</span>
        </button>
      )}
    </div>
  );
}
