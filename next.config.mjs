/** @type {import('next').NextConfig} */
const nextConfig = {
  /** @type {import("next").NextConfig} */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://makranapremium.com/api/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
    ],
  },
};

export default nextConfig;
