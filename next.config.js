/** @type {import('next').NextConfig} */

const path = require('path')
const Dotenv = require('dotenv-webpack')

const envName = process.env.APP_ENV || 'development'
const envPath = path.join(__dirname, 'src/environments/.env.' + envName)
require('dotenv').config({ path: envPath })

const nextConfig = {
  // output: 'standalone',
  // reactStrictMode: true,
  // devIndicators: {
  //   buildActivity: false,
  // },
  distDir: '.next',
  // cleanDistDir: true,
  compiler: {
    styledComponents: {
      // Enabled by default.
      cssProp: true,
    },
  },
}

module.exports = nextConfig
