import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },

  experimental: {
    scrollRestoration: true,
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/i,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;