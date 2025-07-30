/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  env: {
    VITE_API_URL: process.env.VITE_API_URL,
    VITE_HUGGINGFACE_URL: process.env.VITE_HUGGINGFACE_URL,
    VITE_SUPABASE_URL: process.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_KEY: process.env.VITE_SUPABASE_KEY,
  }
}

module.exports = nextConfig