/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // We generate our own content; skip ESLint during build to keep CI fast.
  eslint: { ignoreDuringBuilds: true },
  // Prefer static generation where possible; dynamic pages opt-in with force-dynamic.
  trailingSlash: false,
};

export default nextConfig;
