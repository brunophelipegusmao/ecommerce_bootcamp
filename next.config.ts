import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: false,
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
