import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/sistema",
        destination: "/sistema/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/sistema",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          },
        ],
      },
      {
        source: "/sistema/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/sistema/",
        destination: "https://respeito1.websiteseguro.com/sistema/",
      },
      {
        source: "/sistema/:path*",
        destination: "https://respeito1.websiteseguro.com/sistema/:path*",
      },
    ];
  },
};

export default nextConfig;


