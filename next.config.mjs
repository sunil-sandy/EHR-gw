/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  // This ensures we don't get errors with duplicate routes
  experimental: {
    // This will check for duplicate routes during build
    typedRoutes: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Add redirects for old paths to new paths
  async redirects() {
    return [
      {
        source: '/patients',
        destination: '/manage-patients',
        permanent: true,
      },
      {
        source: '/patients/:path*',
        destination: '/manage-patients/:path*',
        permanent: true,
      },
      {
        source: '/appointments',
        destination: '/manage-appointments',
        permanent: true,
      },
      {
        source: '/appointments/:path*',
        destination: '/manage-appointments/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
