import { mainLink } from "./site";

export interface Produto {
  name: string;
  tag?: string;
  image?: string; // URL ou /arquivo em /public. Sem imagem, aparece um bloco colorido.
  href: string;
}

// Troque nomes, imagens e links por produtos reais. Aparece na home e no fim de cada notícia.
export const PRODUTOS_DESTAQUE: Produto[] = [
  { name: "Armações de grau", tag: "Novidades",image:"/grau.jpeg",href: mainLink("") },
  { name: "Óculos de sol", tag: "Coleção", image: "/solar.jpeg", href: mainLink("") },
  { name: "Ray-Ban Meta", tag: "Tecnologia", image: "/meta.webp", href: mainLink("") },
  { name: "Lentes de contato", tag: "Conforto",image: "lentes.jpeg", href: mainLink("") },
];

// BANNER ÚNICO da base da home ("Novidades da semana"). Para trocar de campanha, só edite aqui.
// Tamanhos recomendados: image 1200x300 (desktop) e imageMobile 750x600 (celular, opcional).
// Coloque os arquivos em /public/banners/ e use o caminho "/banners/arquivo.jpg".
// Sem image, aparece um espaço reservado (lembre de preencher antes de publicar).
export const BANNER_SEMANA = {
  image: "/banners/ia.webp",
  imageMobile: "/banners/ia.webp",
  alt: "Novidades da semana na Mercadótica",
  href: mainLink(""),
};
