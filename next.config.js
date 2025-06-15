/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'res.cloudinary.com'],
  },
  // Enable more detailed error messages in development
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  // Add this to see more detailed error messages in development
  onError: (err) => {
    console.error('Next.js error:', err);
  },
}

module.exports = nextConfig 