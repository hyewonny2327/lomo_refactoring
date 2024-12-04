import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // 프로토콜 설정
        hostname: 'lomo-avatar-images.s3.ap-southeast-2.amazonaws.com',
        pathname: '/**', // 허용할 경로
      },
    ],
  },
};

export default nextConfig;
