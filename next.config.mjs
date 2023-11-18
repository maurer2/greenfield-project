import {createVanillaExtractPlugin} from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin({
  identifiers: 'debug'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default withVanillaExtract(nextConfig);
