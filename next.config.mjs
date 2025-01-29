import dotenv from 'dotenv';
dotenv.config({ path: '.env.custom' }); // Specify your custom environment file here

/** @type {import('next').NextConfig} */

console.log(`NEXTAUTH_URL: ${process.env.NEXTAUTH_URL}`)

const nextConfig = {
  basePath: '/wander', // Set the base path for Traefik routing
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3002/reggie/api/auth/',  // Adjust the base URL
  },
  reactStrictMode: true,
};

export default nextConfig;
