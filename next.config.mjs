import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin({
  identifiers: 'debug',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  reactStrictMode: true,
  // typedRoutes: true,
  webpack: (config) => {
    // adds support for ?react that is required in vite for vite-plugin-svgr
    config.module.rules.push({
      test: /\.svg$/i,
      // oneOf: [
      //   {
      //     resourceQuery: /react/,
      //     use: ['@svgr/webpack'],
      //   },
      //   {
      //     use: ['@svgr/webpack'],
      //   },
      // ],
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default withVanillaExtract(nextConfig);
