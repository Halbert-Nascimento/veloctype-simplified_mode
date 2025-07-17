/** @type {import('next').NextConfig} */
const nextConfig = {
  // Habilita o modo standalone para Docker (mais eficiente)
  output: 'standalone',
  
  // Configurações de produção
  compress: true,
  
  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  
  // Configurações de imagem
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Configurações de cache
  async rewrites() {
    return []
  },
}

module.exports = nextConfig
