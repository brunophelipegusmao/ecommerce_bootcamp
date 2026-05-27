import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  turbopack: {
    root: __dirname,
  },
  allowedDevOrigins: ["192.168.18.10"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d4lgxe9bm8juw.cloudfront.net",
        port: "",
        pathname: "/products/**",
      },
    ],
  },
};

export default nextConfig;
