import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@platform/design-system"],
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
