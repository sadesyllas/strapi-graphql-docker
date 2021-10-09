module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'a42b5e4193229c78cef6976b668a79c5'),
    },
  },
  cron: {
    enabled: true,
  },
});
