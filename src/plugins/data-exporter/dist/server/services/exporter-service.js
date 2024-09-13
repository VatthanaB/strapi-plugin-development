"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
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
    // Method to export user data to CSV
    async exportUsersToCSV() {
        var _a;
        const ctx = strapi.requestContext.get();
        try {
            // Prepare query object for user data export
            const query = {
                populate: {},
            };
            // Fetch user entries based on the query
            const entries = (await ((_a = strapi.entityService) === null || _a === void 0 ? void 0 : _a.findMany("plugin::users-permissions.user", query)));
            // Throw validation error if no data is found
            if (!entries || entries.length === 0) {
                throw new utils_1.errors.ValidationError(`No data found for model: api::submission.submission`);
            }
            // // Flatten and format the entries for CSV export
            // const flattenedEntries = entries.map((entry) => ({
            //   ...entry,
            //   user_submission_ids: entry.user_submissions.map(
            //     (submission) => submission.challengeId
            //   ),
            //   confirmed: entry.confirmed ? "Yes" : "No",
            //   blocked: entry.blocked ? "Yes" : "No",
            //   IsRestricted: entry.restricted ? "Yes" : "No",
            //   createdAt: new Date(entry.createdAt).toLocaleString("en-NZ"),
            //   updatedAt: new Date(entry.updatedAt).toLocaleString("en-NZ"),
            //   postcode: entry.address ? entry.address.postcode : "",
            //   user: undefined,
            //   password: undefined,
            //   resetPasswordToken: undefined,
            //   confirmationToken: undefined,
            //   uid: undefined,
            //   profileImage: undefined,
            //   user_submissions: undefined,
            //   address: undefined,
            //   provider: undefined,
            // }));
            // Reorganize the flattened entries for a better structure
            // const reorganizedEntries = flattenedEntries.map((entry) => ({
            //   UserId: entry.id,
            //   UserName: entry.username,
            //   UserEmail: entry.email,
            //   IsConfirmed: entry.confirmed,
            //   FirstName: entry.firstName || null,
            //   LastName: entry.lastName || null,
            //   UserEthnicity: entry.ethnicity || null,
            //   UserPostcode: entry.postcode || null,
            //   DateOfBirth: entry.dateOfBirth || null,
            //   UserBio: entry.bio || null,
            //   SubmissionIds: entry.user_submission_ids,
            //   IsRestricted: entry.IsRestricted,
            //   ReputationScore: entry.reputationScore || 0,
            //   AccountCreatedAt: entry.createdAt,
            //   AccountUpdatedAt: entry.updatedAt,
            //   IsBlocked: entry.blocked,
            // }));
            // Return reorganized data as JSON
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
        const response = await fetch(`/api/content-type-builder/content-types`, {
            method: "GET",
            headers: {
                Authorization: `Bearer 11703591363602973460d2c0fae9ebb6bd6cb319629f5106049512c6230ad6e5d9e304d6f2f99d552515f6eb95b6283dcc0d90ac53f75255b79c592b9f49c60aa54ab37964cebe9ee88302739b56891567bdee18a231f14883fb9e0ab227d9cae3d4e2110e25c10aee09ff154cd255651daf71981322a5fe97866c79ba9330ec`,
                "Content-Type": "application/json",
            },
        });
        if (response.ok) {
            const data = await response.json();
            // Remove the specific content types (you can adjust the list of UIDs to exclude)
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
