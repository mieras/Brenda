/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const basePath = isProd ? '/Brenda' : ''

const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: isProd ? '/Brenda/' : '',
  images: {
    unoptimized: true, // Required for static export
  },
  sassOptions: {
    includePaths: ['./styles', './node_modules'],
  },
  trailingSlash: true, // Better compatibility with GitHub Pages
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  // Fix workspace root warning by explicitly setting Turbopack root
  turbopack: {
    root: __dirname,
  },
}

module.exports = nextConfig

