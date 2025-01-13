import dotenv from 'dotenv';
dotenv.config({ path: '.env.custom' }); // Specify your custom environment file here

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/wander', // Set the base path for Traefik routing
  env: {
    // Include environment variables if needed
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  reactStrictMode: true,
};

export default nextConfig;
