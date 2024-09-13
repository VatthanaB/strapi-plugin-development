import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
  // Generic export method for any model
  async export(ctx: any) {
    const { model } = ctx.params; // Extract model name from request parameters

    try {
      // Call the service to export the specified model to CSV
      const data = await strapi
        .plugin("data-exporter")
        .service("exporter")
        .exportToCSV(model);
      return data; // Return the CSV data
    } catch (error) {
      console.error("Error exporting CSV:", error); // Log any error encountered
      ctx.throw(500, "Failed to export CSV"); // Send a 500 error response
    }
  },

  // Export submissions filtered by challenge ID
  async exportSubmissionToCSV(ctx: any) {
    const { challengeId } = ctx.params; // Extract challengeId from request parameters

    try {
      // Call the service to export submission data to CSV
      const data = await strapi
        .plugin("data-exporter")
        .service("exporter")
        .exportSubmissionToCSV(challengeId);
      return data; // Return the CSV data
    } catch (error) {
      console.error("Error exporting CSV:", error); // Log any error encountered
      ctx.throw(500, "Failed to export CSV"); // Send a 500 error response
    }
  },

  // Export users to CSV
  async exportUsersToCSV(ctx: any) {
    try {
      // Call the service to export user data to CSV
      const data = await strapi
        .plugin("data-exporter")
        .service("exporter")
        .exportUsersToCSV();
      return data; // Return the CSV data
    } catch (error) {
      console.error("Error exporting CSV:", error); // Log any error encountered
      ctx.throw(500, "Failed to export CSV"); // Send a 500 error response
    }
  },

  // Export challenges to CSV
  async exportChallengesToCSV(ctx: any) {
    try {
      // Call the service to export challenge data to CSV
      const data = await strapi
        .plugin("data-exporter")
        .service("exporter")
        .exportChallengesToCSV();
      return data; // Return the CSV data
    } catch (error) {
      console.error("Error exporting CSV:", error); // Log any error encountered
      ctx.throw(500, "Failed to export CSV"); // Send a 500 error response
    }
  },

  // Export sponsors to CSV
  async exportSponsorsToCSV(ctx: any) {
    try {
      // Call the service to export sponsor data to CSV
      const data = await strapi
        .plugin("data-exporter")
        .service("exporter")
        .exportSponsorsToCSV();
      return data; // Return the CSV data
    } catch (error) {
      console.error("Error exporting CSV:", error); // Log any error encountered
      ctx.throw(500, "Failed to export CSV"); // Send a 500 error response
    }
  },
});
