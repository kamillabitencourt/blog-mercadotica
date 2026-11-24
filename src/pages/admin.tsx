import { FormEvent, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import firebase from "../../firebase";
import { FiArrowLeft, FiLock, FiLogOut } from "react-icons/fi";
import styles from "../styles/pages/Admin.module.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<firebase.User | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => firebase.auth().onAuthStateChanged(setUser), []);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await firebase.auth().signInWithEmailAndPassword(email.trim(), password);
    } catch (e: any) {
      setError(e.code === "auth/invalid-email" ? "Digite um e-mail válido." : e.code === "auth/user-not-found" || e.code === "auth/wrong-password" || e.code === "auth/invalid-credential" ? "E-mail ou senha incorretos." : "Não foi possível entrar. Confira se o acesso por e-mail e senha está habilitado no Firebase.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await firebase.auth().signOut();
    setPassword("");
  }

  return (
    <div className={styles.page}>
      <Head><title>Área administrativa | Mercadótica</title><meta name="robots" content="noindex,nofollow" /></Head>
      <Link href="/" className={styles.back}><FiArrowLeft /> Voltar ao blog</Link>
      <main className={styles.card}>
        <span className={styles.mark}>M<span>®</span></span>
        <p className={styles.eyebrow}>MERCADÓTICA · ACESSO RESTRITO</p>
        {user ? <>
          <h1>Acesso <em>confirmado.</em></h1>
          <p className={styles.description}>Você entrou com <strong>{user.email}</strong>.</p>
          <div className={styles.notice}>A autenticação está conectada ao Firebase. As ferramentas de gerenciamento de notícias dependem das permissões e dos recursos administrativos configurados no projeto.</div>
          <button className={styles.submit} onClick={handleLogout}><FiLogOut /> Sair da conta</button>
        </> : <>
          <h1>Área <em>administrativa.</em></h1>
          <p className={styles.description}>Entre com a conta autorizada para gerenciar o conteúdo do blog.</p>
          <form onSubmit={handleLogin} className={styles.form}>
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} required placeholder="seu@email.com" />
            <label htmlFor="password">Senha</label>
            <input id="password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Digite sua senha" />
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button className={styles.submit} type="submit" disabled={loading}><FiLock /> {loading ? "Entrando..." : "Entrar com segurança"}</button>
          </form>
        </>}
        <p className={styles.secure}>ACESSO PROTEGIDO · FIREBASE AUTHENTICATION</p>
      </main>
    </div>
  );
}
