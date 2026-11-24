import { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { CategoryContext } from "../contexts/CategoryContext";

import styles from "../styles/components/Drawer.module.css";

export default function Drawer() {
  const [isShowed, setIsShowed] = useState(false);

  const { changeCategory } = useContext(CategoryContext);

  return (
    <>
      <button
        className={styles.buttonOpenDrawer}
        onClick={() => setIsShowed(true)}
      >
        <AiOutlineMenu />
      </button>
      {isShowed && (
        <div className={styles.fullDrawer}>
          <div className={styles.drawerComponent}>
            <button onClick={() => setIsShowed(false)}>
              <BiArrowBack className={styles.iconBack} />
            </button>

            <a
              href="https://franquia.mercadotica.com.br/"
              target="_blank"
              rel="noreferrer"
            >
              FRANQUIA
            </a>

            <a
              href="https://www.mercadotica.com/pagina/sobre-nos.html"
              target="_blank"
              rel="noreferrer"
            >
              SOBRE NÓS
            </a>

            <a
              href="https://www.mercadotica.com/pagina/nossas-lojas.html"
              target="_blank"
              rel="noreferrer"
            >
              NOSSAS LOJAS
            </a>

            <a
              href="https://www.mercadotica.com/pagina/promocoes.html"
              target="_blank"
              rel="noreferrer"
            >
              PROMOÇÕES
            </a>

            <a
              href="https://www.mercadotica.com/pagina/contato.html"
              target="_blank"
              rel="noreferrer"
            >
              CONTATO
            </a>

            <div className={styles.separator} />

            <h3 className={styles.titleCategories}>Categorias</h3>

            <button
              onClick={() => {
                changeCategory(0);
                setIsShowed(false);
              }}
            >
              Todas
            </button>

            <button
              onClick={() => {
                changeCategory(1);
                setIsShowed(false);
              }}
            >
              Saúde Visual
            </button>

            <button
              onClick={() => {
                changeCategory(2);
                setIsShowed(false);
              }}
            >
              Empreendedorismo
            </button>

            <button
              onClick={() => {
                changeCategory(3);
                setIsShowed(false);
              }}
            >
              Insitucional
            </button>
          </div>
        </div>
      )}
    </>
  );
}
