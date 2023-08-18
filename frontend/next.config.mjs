/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => { // Important: return the modified config 

  config.resolve.extensionAlias =  {
    '.js': ['.ts', '.tsx', '.js', '.jsx'],
  };
    if (isServer) { 
      config.externals.push({ bufferutil: "bufferutil", "utf-8-validate": "utf-8-validate"});
    }
   
    return config;
  },
  images:{
    domains: ['gateway.pinata.cloud']
  },
  reactStrictMode: false
};

export default nextConfig;
