import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

import styles from "../styles/pages/404.module.css";

export default function FourOhFour() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Página não encontrada</h1>
      <BiArrowBack className={styles.icon} />
      <Link href="/">
        Ir para inicial
      </Link>
    </div>
  );
}
