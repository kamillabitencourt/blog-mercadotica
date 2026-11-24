import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import styles from "../styles/components/SearchBar.module.css";

interface SearchBarProps {
  onSearch: (param: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [value, setValue] = useState("");

  // Busca ao vivo enquanto digita; vazio volta à home completa.
  useEffect(() => {
    onSearch(value);
  }, [value]);

  return (
    <form
      className={styles.search}
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(value);
      }}
    >
      <label htmlFor="blog-search" className={styles.srOnly}>
        Buscar matérias
      </label>
      <BiSearch className={styles.icon} aria-hidden />
      <input
        id="blog-search"
        type="search"
        value={value}
        placeholder="Busque por saúde visual, franquia, novidades..."
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
