/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'prodimage.images-bn.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
}

module.exports = nextConfig
