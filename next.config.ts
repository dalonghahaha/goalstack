import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel 部署优化
  output: "standalone",

  // 启用压缩
  compress: true,

  // 图片优化配置
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Vercel 优化：使用 Vercel Image Optimization API
    unoptimized: false,
  },

  // 重定向配置
  async redirects() {
    return [];
  },

  // 请求头配置
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  // 实验性功能
  experimental: {
    // 优化打包
    optimizePackageImports: ["recharts", "framer-motion"],
  },

  // 开启 strict mode
  reactStrictMode: true,

  // 生产环境优化
  poweredByHeader: false,
};

export default nextConfig;