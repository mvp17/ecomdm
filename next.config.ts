import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tell Next.js to produce static HTML
  output: "export",

  // Remove assetPrefix unless you’re serving under a subpath
  // If you leave "assetPrefix: '/_next/'", Next.js will prepend "/_next/_next/"
  // which causes missing chunks.
  assetPrefix: undefined,

  // (Optional) If you use <Image>, you may need:
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
