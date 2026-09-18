/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Allow Three.js and other packages that need transpiling
  transpilePackages: [],
  images: {
    // Allow external images from CDNs used in footer socials
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
    ],
  },
  // Preserve trailing slash behavior
  trailingSlash: false,
};

export default nextConfig;
