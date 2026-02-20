import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Prevent bundling of react-pdf so it uses the same React instance as require("react")
  serverExternalPackages: ["@react-pdf/renderer"],
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
