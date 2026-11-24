import { useContext, useState } from "react"
import {
  AiOutlineAppstore,
  AiOutlineEye,
  AiOutlineMenu,
  AiOutlineShop,
  AiOutlineTeam,
} from "react-icons/ai"
import { CategoryContext } from "../contexts/CategoryContext"

import styles from "../styles/components/CategoriesHeader.module.css"

export default function CategoriesHeader() {
  const { categorySelected, changeCategory } = useContext(CategoryContext)

  const [isShowedModal, setIsShowedModal] = useState(false)

  function selectCategory(index: number) {
    changeCategory(index)
    if (isShowedModal) {
      setIsShowedModal(false)
    }
  }

  return (
    <header className={styles.categoriesHeader}>
      <button
        className={styles.categoryIconMenu}
        onClick={() => setIsShowedModal(true)}
      ></button>
      <div
        className={`${styles.categoriesButtons} ${
          isShowedModal ? styles.isShowed : ""
        }`}
      >
        <button
          title="Todas categorias"
          className={`${styles.categoryButton} ${
            categorySelected === 0 && styles.categoryButtonSelected
          }`}
          onClick={() => selectCategory(0)}
        >
          <p className={styles.buttonText}>Todas</p>
        </button>

        <button
          title="Categoria saúde visual"
          className={`${styles.categoryButton} ${
            categorySelected === 1 && styles.categoryButtonSelected
          }`}
          onClick={() => selectCategory(1)}
        >
          <p className={styles.buttonText}>Saúde Visual</p>
        </button>

        <button
          title="Categoria Empreendedorismo"
          className={`${styles.categoryButton} ${
            categorySelected === 2 && styles.categoryButtonSelected
          }`}
          onClick={() => selectCategory(2)}
        >
          <p className={styles.buttonText}>Empreendedorismo</p>
        </button>

        <button
          title="Categoria Institucional"
          className={`${styles.categoryButton} ${
            categorySelected === 3 && styles.categoryButtonSelected
          }`}
          onClick={() => selectCategory(3)}
        >
          <p className={styles.buttonText}>Institucional</p>
        </button>

        <button
          title="Categoria Institucional"
          className={`${styles.categoryButton} ${styles.categoryButtonBack}`}
          onClick={() => selectCategory(categorySelected)}
        >
          <p className={styles.buttonText}>Voltar</p>
        </button>
      </div>
    </header>
  )
}
