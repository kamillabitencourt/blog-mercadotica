// Dados centrais do site. Edite aqui e todo o blog (header, rodapé, schema) acompanha.
export const SITE = {
  name: "Mercadótica",
  blogUrl: "https://blog.mercadotica.com",
  mainUrl: "https://mercadotica.com",
  logoUrl: "https://blog.mercadotica.com/android-chrome-512x512.png",
  cnpj: "04.781.796/0001-18",
  legalName: "Mercadótica Comércio de Óculos Ltda.",
  foundingDate: "1991",
  phone: { label: "(77) 3429-6068", tel: "+557734296068" },
  // CONFIRME o número: o texto original tinha 8 dígitos "(77) 9972-4665".
  // Se o celular tiver o 9 extra, use "5577999724665".
  whatsapp: { label: "(77) 9972-4665", number: "557799724665" },
  email: "contato@oticasmercadotica.com.br",
  social: {
    instagram: "https://www.instagram.com/oticasmercadotica/",
    // Preencha com as URLs oficiais. Vazio = o link não aparece no rodapé.
    facebook: "",
    youtube: "",
    linkedin: "",
  },
  // URLs externas de autoridade (ABF, PEGN...) entram no schema como sameAs.
  sameAs: [] as string[],
};

export const mainLink = (path: string) => `${SITE.mainUrl}${path}`;

export const NAV_LINKS = [
  { label: "Franquia", href: mainLink("/franquia") },
  { label: "Sobre nós", href: mainLink("/sobre-nos") },
  { label: "Nossas lojas", href: mainLink("/pagina/nossas-lojas") },
  { label: "Promoções", href: mainLink("/promocoes") },
  { label: "Contato", href: mainLink("/contato") },
];

// Índices = valores do campo `categories` das notícias (0 = todas).
export const CATEGORIES = [
  { id: 0, label: "Todas" },
  { id: 1, label: "Saúde Visual" },
  { id: 2, label: "Empreendedorismo" },
  { id: 3, label: "Institucional" },
];
