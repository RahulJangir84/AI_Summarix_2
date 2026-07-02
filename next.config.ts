import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["canvas", "pdfjs-dist"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
