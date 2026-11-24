import styles from "../styles/components/Banner.module.css";

export default function Banner() {
  return (
    <div className={styles.bannerContainer}>
      <a href="https://franquiamercadotica.com.br/" className={styles.link}>
        <img
          src="https://cdn.awsli.com.br/1712/1712105/arquivos/banner-blog.png"
          alt="Clique e saiba mais sobre a nossa Franquia"
        />
      </a>
    </div>
  );
}
