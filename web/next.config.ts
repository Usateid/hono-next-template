import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  distDir: "dist",
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
