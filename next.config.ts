import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // IMPLEMENTATION.md: real photography at quality={80}. Next 16
    // only serves qualities explicitly allow-listed here; 75 is the
    // default this repo doesn't otherwise use, kept in case any future
    // image genuinely wants it.
    qualities: [75, 80],
  },
};

export default nextConfig;
