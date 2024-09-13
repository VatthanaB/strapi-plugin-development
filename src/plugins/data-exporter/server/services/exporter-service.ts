import { Strapi } from "@strapi/strapi";
import { Context } from "koa";
import { errors } from "@strapi/utils";
import { IUserSubmission } from "../../Interfaces/interfaces/user-submission";
import { IUser } from "../../Interfaces/interfaces/user";
import { IChallenge } from "../../Interfaces/interfaces/challenge";
import { ISponsor } from "../../Interfaces/interfaces/sponsor";
import res from "express/lib/response";
import dotenv from "dotenv";

dotenv.config();
export default ({ strapi }: { strapi: Strapi }) => ({
  // Method to export entries of any specified model to CSV
  async exportToCSV() {
    const ctx = strapi.requestContext.get() as any;
    const { modelName } = ctx.request.body;

    console.log(modelName);
    // Validate that modelName is provided
    if (!modelName) {
      throw new errors.ValidationError("modelName is required");
    }

    try {
      // Fetch entries for the specified model
      const entries = await strapi.entityService?.findMany(modelName);

      // If no entries found, throw a validation error
      if (!entries || entries.length === 0) {
        throw new errors.ValidationError(
          `No data found for model: ${modelName}`
        );
      }

      // Return entries as JSON
      ctx.body = entries;
    } catch (error) {
      // Log the error and send a 500 response if there's an issue
      console.error("Error exporting data:", error);
      ctx.throw(500, "Failed to export data");
    }
  },

  async getAllContentTypes() {
    const ctx = strapi.requestContext.get() as Context;

    // Ensure the base URL is defined; you might need to fetch this dynamically
    const baseUrl = process.env.STRAPI_BASE_URL || "http://127.0.0.1:1337"; // Replace with your actual base URL
    const fetchToken = process.env.FETCH_TOKEN;
    console.log(fetchToken);
    const response = await fetch(
      `${baseUrl}/api/content-type-builder/content-types`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${fetchToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data: any = await response.json();

      // Remove the specific content types
      const filteredData = data.data.filter(
        (contentType: any) =>
          contentType.uid !== "admin::permission" &&
          contentType.uid !== "admin::role" &&
          contentType.uid !== "admin::api-token" &&
          contentType.uid !== "admin::api-token-permission" &&
          contentType.uid !== "admin::transfer-token" &&
          contentType.uid !== "admin::transfer-token-permission" &&
          contentType.uid !== "plugin::upload.file" &&
          contentType.uid !== "plugin::upload.folder" &&
          contentType.uid !== "plugin::content-releases.release" &&
          contentType.uid !== "plugin::content-releases.release-action" &&
          contentType.uid !== "plugin::users-permissions.permission" &&
          contentType.uid !== "plugin::users-permissions.role" &&
          contentType.uid !== "plugin::users-permissions.user" &&
          contentType.uid !== "plugin::i18n.locale"
      );

      return filteredData;
    }
  },
});
