import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@platform-system/design-ui", "@platform/api-client"],
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;
