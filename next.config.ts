import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@system/design-ui", "@system/api-client"],
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
