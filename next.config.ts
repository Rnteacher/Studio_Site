import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Prevent bundling of ALL react-pdf packages so they share the same React instance
  serverExternalPackages: [
    "@react-pdf/renderer",
    "@react-pdf/reconciler",
    "@react-pdf/render",
    "@react-pdf/primitives",
    "@react-pdf/layout",
    "@react-pdf/font",
    "@react-pdf/pdfkit",
    "@react-pdf/stylesheet",
    "@react-pdf/image",
    "@react-pdf/fns",
    "@react-pdf/types",
    "@react-pdf/textkit",
    "@react-pdf/png-js",
  ],
  // Pin the root to this project directory (avoids parent lockfile detection)
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
