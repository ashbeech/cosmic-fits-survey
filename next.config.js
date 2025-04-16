/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Skip building API routes during static build time to avoid issues with environment variables
  experimental: {
    serverComponentsExternalPackages: ["resend"],
  },
};

module.exports = nextConfig;
