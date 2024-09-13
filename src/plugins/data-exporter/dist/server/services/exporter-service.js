"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = ({ strapi }) => ({
    // Method to export entries of any specified model to CSV
    async exportToCSV() {
        var _a;
        const ctx = strapi.requestContext.get();
        const { modelName } = ctx.request.body;
        console.log(modelName);
        // Validate that modelName is provided
        if (!modelName) {
            throw new utils_1.errors.ValidationError("modelName is required");
        }
        try {
            // Fetch entries for the specified model
            const entries = await ((_a = strapi.entityService) === null || _a === void 0 ? void 0 : _a.findMany(modelName));
            // If no entries found, throw a validation error
            if (!entries || entries.length === 0) {
                throw new utils_1.errors.ValidationError(`No data found for model: ${modelName}`);
            }
            // Return entries as JSON
            ctx.body = entries;
        }
        catch (error) {
            // Log the error and send a 500 response if there's an issue
            console.error("Error exporting data:", error);
            ctx.throw(500, "Failed to export data");
        }
    },
    async getAllContentTypes() {
        const ctx = strapi.requestContext.get();
        // Ensure the base URL is defined; you might need to fetch this dynamically
        const baseUrl = process.env.STRAPI_BASE_URL || "http://127.0.0.1:1337"; // Replace with your actual base URL
        const fetchToken = process.env.FETCH_TOKEN;
        console.log(fetchToken);
        const response = await fetch(`${baseUrl}/api/content-type-builder/content-types`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${fetchToken}`,
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            // Remove the specific content types
            const filteredData = data.data.filter((contentType) => contentType.uid !== "admin::permission" &&
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
                contentType.uid !== "plugin::i18n.locale");
            return filteredData;
        }
    },
});
