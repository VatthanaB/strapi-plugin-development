import { Strapi } from "@strapi/strapi";
import { Context } from "koa";
import { errors } from "@strapi/utils";

import dotenv from "dotenv";
import { ContentType } from "../../Interfaces/interfaces/contenType";

dotenv.config(); // Helper function to recursively transform boolean values

export default ({ strapi }: { strapi: Strapi }) => ({
  // Method to export entries of any specified model to CSV
  async exportEntryDatas() {
    // Helper function to transform a single date into NZ readable format
    function transformDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleString("en-NZ", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    }

    // Helper function to recursively transform boolean values and dates
    function transformData(obj) {
      if (Array.isArray(obj)) {
        return obj.map(transformData); // Recursively handle arrays
      } else if (obj !== null && typeof obj === "object") {
        return Object.keys(obj).reduce((acc, key) => {
          if (typeof obj[key] === "boolean") {
            acc[key] = obj[key] ? "Yes" : "No"; // Convert boolean to "Yes"/"No"
          } else if (
            typeof obj[key] === "string" &&
            !isNaN(Date.parse(obj[key]))
          ) {
            acc[key] = transformDate(obj[key]); // Use transformDate function for date strings
          } else if (Array.isArray(obj[key]) || typeof obj[key] === "object") {
            acc[key] = transformData(obj[key]); // Recursively transform nested objects/arrays
          } else {
            acc[key] = obj[key]; // Keep the original value if not a boolean or object
          }
          return acc;
        }, {});
      }
      return obj;
    }

    const ctx = strapi.requestContext.get() as any;
    const { modelName } = ctx.request.body;

    console.log(modelName);
    // Validate that modelName is provided
    if (!modelName) {
      throw new errors.ValidationError("modelName is required");
    }

    try {
      // Fetch entries for the specified model
      let entries = await strapi.entityService?.findMany(modelName, {
        populate: "*", // Populate all fields and relations
      });

      // If no ent ries found, throw a validation error
      if (!entries || entries.length === 0) {
        throw new errors.ValidationError(
          `No data found for model: ${modelName}`
        );
      }
      console.log("entries", entries);
      entries = entries.map((entry) => transformData(entry)); // Transform boolean values
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

    const fetchToken = process.env.DATA_EXPORTER_PLUGIN_TOKEN;

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
      const filteredData: ContentType[] = data.data.filter(
        (contentType: any) =>
          contentType.uid !== "admin::permission" &&
          contentType.uid !== "admin::role" &&
          contentType.uid !== "admin::user" &&
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
          contentType.uid !== "plugin::i18n.locale"
      );

      return filteredData;
    }
  },
});
