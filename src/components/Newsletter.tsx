import React, { useState } from "react";
import { FiMail, FiCheckCircle } from "react-icons/fi";
import styles from "../styles/components/Newsletter.module.css";

const RD_TOKEN = process.env.NEXT_PUBLIC_RD_PUBLIC_TOKEN;
const CONVERSION_ID = "newsletter-blog";

async function sendToRD(email: string): Promise<boolean> {
  if (!RD_TOKEN) return false;
  const res = await fetch(
    `https://api.rd.services/platform/conversions?api_key=${RD_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_type: "CONVERSION",
        event_family: "CDP",
        payload: {
          conversion_identifier: CONVERSION_ID,
          email,
          legal_bases: [
            { category: "communications", type: "consent", status: "granted" },
          ],
        },
      }),
    }
  );
  return res.ok;
}

async function saveToFirestore(email: string, source: string): Promise<boolean> {
  const { default: firebase } = await import("../../firebase");
  await firebase
    .firestore()
    .collection("newsletter")
    .add({
      email,
      source,
      consent: true,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  return true;
}

interface NewsletterProps {
  source?: "home" | "post";
}

export default function Newsletter({ source = "home" }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");

    // RD Station (automação/Meta) e Firestore (backup) em paralelo: basta um dar certo.
    const results = await Promise.allSettled([
      sendToRD(email.trim()),
      saveToFirestore(email.trim(), source),
    ]);
    const ok = results.some((r) => r.status === "fulfilled" && r.value === true);
    setStatus(ok ? "ok" : "error");
    if (ok) setEmail("");
  }

  return (
    <section className={styles.box} aria-labelledby={`nl-title-${source}`}>
      <div className={styles.copy}>
        <FiMail className={styles.icon} aria-hidden />
        <h2 id={`nl-title-${source}`}>Receba as novidades da Mercadótica</h2>
        <p>Dicas de saúde visual, lançamentos e promoções direto no seu e-mail. Sem spam.</p>
      </div>

      {status === "ok" ? (
        <p className={styles.success} role="status">
          <FiCheckCircle aria-hidden /> Pronto! Você está na lista.
        </p>
      ) : (
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.row}>
            <label htmlFor={`nl-email-${source}`} className={styles.srOnly}>
              Seu melhor e-mail
            </label>
            <input
              id={`nl-email-${source}`}
              type="email"
              required
              value={email}
              placeholder="Seu melhor e-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "Enviando..." : "Quero receber"}
            </button>
          </div>
          <label className={styles.consent}>
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>Concordo em receber e-mails da Mercadótica e posso cancelar quando quiser.</span>
          </label>
          {status === "error" && (
            <p className={styles.error} role="alert">
              Não foi possível cadastrar agora. Tente novamente em instantes.
            </p>
          )}
        </form>
      )}
    </section>
  );
}
