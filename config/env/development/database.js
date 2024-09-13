module.exports = ({ env }) => ({
  connection: {
    client: "sqlite",
    connection: {
      filename: env("DATABASE_PRIVATE_URL") || ".tmp/strapi.db",
    },
    useNullAsDefault: true,
  },
});
