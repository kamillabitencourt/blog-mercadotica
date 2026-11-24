import React from "react";
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FiPhone, FiMail } from "react-icons/fi";
import { SITE, mainLink } from "../data/site";
import styles from "../styles/components/Footer.module.css";

export default function Footer() {
  const social = [
    { href: SITE.social.instagram, label: "Instagram", Icon: FaInstagram },
    { href: SITE.social.facebook, label: "Facebook", Icon: FaFacebookF },
    { href: SITE.social.youtube, label: "YouTube", Icon: FaYoutube },
    { href: SITE.social.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
  ].filter((s) => s.href);

  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <p className={styles.brand}>MERCADÓTICA</p>
          <span className={styles.since}>Desde 1991</span>
          <p className={styles.tagline}>
            Aqui não é só ótica, é Mercadótica.
            <br />
            Um novo jeito de enxergar a vida.
          </p>
        </div>

        <nav aria-label="Navegar">
          <h3>Navegar</h3>
          <ul>
            <li><a href={mainLink("/nossas-lojas")}>Encontre uma loja</a></li>
            <li><a href={mainLink("/franquia")}>Seja um franqueado</a></li>
            <li><a href={mainLink("/laboratorio")}>Laboratório</a></li>
            <li><a href="/">Blog</a></li>
          </ul>
        </nav>

        <div>
          <h3>Contato</h3>
          <ul>
            <li>
              <a href={`tel:${SITE.phone.tel}`}><FiPhone aria-hidden /> {SITE.phone.label}</a>
            </li>
            <li>
              <a
                href={`https://wa.me/${SITE.whatsapp.number}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp aria-hidden /> WhatsApp {SITE.whatsapp.label}
              </a>
            </li>
            <li className={styles.email}>
              <a href={`mailto:${SITE.email}`}><FiMail aria-hidden /> {SITE.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <h3>Siga</h3>
          <ul className={styles.socialList}>
            {social.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon aria-hidden /> {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.legal}>
        <p>
          {SITE.legalName} · CNPJ {SITE.cnpj} · © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
