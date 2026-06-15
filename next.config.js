/** @type {import('next').NextConfig} */
const nextConfig = {
  // No static export — full Next.js on Vercel
  images: {
    domains: [],
  },
  experimental: {
    reactCompiler: false,
  },
}

module.exports = nextConfig
