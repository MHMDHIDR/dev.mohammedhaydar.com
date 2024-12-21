import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "technodevlabs.s3.eu-west-2.amazonaws.com",
        protocol: "https",
        port: ""
      },
      {
        hostname: "s3.eu-west-2.amazonaws.com",
        protocol: "https",
        port: ""
      }
    ]
  },
  experimental: { serverActions: { bodySizeLimit: "10mb" } }
}

export default nextConfig
