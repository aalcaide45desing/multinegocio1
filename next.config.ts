import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Permite imágenes de cualquier dominio externo https (URL de usuario)
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http",  hostname: "**" },
    ],
    // Formatos optimizados: Next.js sirve WebP o AVIF automáticamente
    formats: ["image/avif", "image/webp"],
    // Calidad por defecto de compresión (85 = gran calidad, mucho menos peso)
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 días de caché
  },
};

export default nextConfig;
