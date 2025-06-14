/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  // Add this to see more detailed error messages in development
  onError: (err) => {
    console.error('Next.js error:', err);
  },
}

module.exports = nextConfig 