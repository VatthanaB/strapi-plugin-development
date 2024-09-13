import { Strapi } from "@strapi/strapi";

module.exports = async ({ strapi }) => {
  const actions = [
    {
      section: "plugins",
      displayName: "Read",
      uid: "read",
      pluginName: "data-exporter",
    },
  ];

  await strapi.admin.services.permission.actionProvider.registerMany(actions);
};
// Default export
export default module.exports;
