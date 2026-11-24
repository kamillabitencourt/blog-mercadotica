import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiMapPin } from "react-icons/fi";
import logo from "../images/logo1.png";
import { NAV_LINKS, mainLink } from "../data/site";
import styles from "../styles/components/Header.module.css";

// Funciona em qualquer versão do Next (string nas antigas, objeto { src } nas novas)
const logoSrc = typeof logo === "string" ? logo : (logo as { src: string }).src;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.bar}>
        <Link href="/" className={styles.logo} aria-label="Blog Mercadótica - página inicial">
          <img src={logoSrc} alt="Mercadótica" />
        </Link>

        <nav className={styles.nav} aria-label="Navegação principal">
          {NAV_LINKS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className={styles.cta} href={mainLink("/nossas-lojas")}>
          <FiMapPin aria-hidden /> Encontrar loja
        </a>

        <button
          type="button"
          className={styles.burger}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <FiX size={26} /> : <FiMenu size={26} />}
        </button>
      </div>

      {open && (
        <nav className={styles.mobileMenu} aria-label="Menu mobile">
          {NAV_LINKS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <a className={styles.mobileCta} href={mainLink("/nossas-lojas")}>
            Encontrar loja
          </a>
        </nav>
      )}
    </header>
  );
}
