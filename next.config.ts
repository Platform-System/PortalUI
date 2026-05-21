import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@platform/design-system", "@platform/api-client"],
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
