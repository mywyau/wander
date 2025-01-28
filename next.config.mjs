import dotenv from 'dotenv';
dotenv.config({ path: '.env.custom' }); // Specify your custom environment file here

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/wander', // Set the base path for Traefik routing
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL, // Pass the NEXTAUTH_URL
  },
  reactStrictMode: true,
};

export default nextConfig;
