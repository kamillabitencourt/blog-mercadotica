/** @type {import('next').NextConfig} */
module.exports = {
  // Staging (*.vercel.app) nunca deve ser indexado: evita conteúdo duplicado no Google.
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(.*)\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  // Redirecionamentos 301 do blog antigo. Liste aqui as URLs antigas indexadas
  // cujo formato mudou, para não perder autoridade no Google nem citações em IAs.
  async redirects() {
    return [
      // { source: "/post/:slug", destination: "/noticias/:slug", permanent: true },
    ];
  },
};
