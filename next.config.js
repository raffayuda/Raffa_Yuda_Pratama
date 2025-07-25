/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveExtensions: [
      '.tsx',
      '.ts',
      '.jsx',
      '.js',
      '.mjs',
      '.json',
    ],
  },
  images: {
    domains: ['api.placeholder.com', 'images.unsplash.com', 'picsum.photos'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
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
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
