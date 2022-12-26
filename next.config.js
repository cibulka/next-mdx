/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental:{
    appDir: true,
    fontLoaders: [
      { 
        loader: '@next/font/google', 
        options: { subsets: ['latin', 'cyrillic'] } 
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })
    config.resolve.alias['next-intl/config'] = require.resolve('./i18n.tsx');
    return config;
  }
}

module.exports = nextConfig
