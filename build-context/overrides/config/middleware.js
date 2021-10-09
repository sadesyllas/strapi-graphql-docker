module.exports = ({ env }) => ({
  settings: {
    cors: {
      enabled: true,
      origin: env('STRAPI_ORIGIN', '*').split(/\s*,\s*/),
    },
  },
});
