"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = module.exports;
