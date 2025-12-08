/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/Brenda' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Brenda/' : '',
  images: {
    unoptimized: true, // Required for static export
  },
  sassOptions: {
    includePaths: ['./styles', './node_modules'],
  },
  trailingSlash: true, // Better compatibility with GitHub Pages
}

module.exports = nextConfig

