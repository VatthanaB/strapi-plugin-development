"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    // Generic export method for any model
    async export(ctx) {
        const { model } = ctx.params; // Extract model name from request parameters
        try {
            // Call the service to export the specified model to CSV
            const data = await strapi
                .plugin("data-exporter")
                .service("exporter")
                .exportToCSV(model);
            return data; // Return the CSV data
        }
        catch (error) {
            console.error("Error exporting CSV:", error); // Log any error encountered
            ctx.throw(500, "Failed to export CSV"); // Send a 500 error response
        }
    },
    // Export users to CSV
    async exportUsersToCSV(ctx) {
        try {
            // Call the service to export user data to CSV
            const data = await strapi
                .plugin("data-exporter")
                .service("exporter")
                .exportUsersToCSV();
            return data; // Return the CSV data
        }
        catch (error) {
            console.error("Error exporting CSV:", error); // Log any error encountered
            ctx.throw(500, "Failed to export CSV"); // Send a 500 error response
        }
    },
    async getAllContentTypes(ctx) {
        try {
            const data = await strapi
                .plugin("data-exporter")
                .service("exporter")
                .getAllContentTypes();
            return data;
        }
        catch (error) {
            console.error("Error gettin content Types", error);
            ctx.throw(500, "Failed to export CSV");
        }
    },
});
