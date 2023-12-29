/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages:['three'], 
  output: 'export', 
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
