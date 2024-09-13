"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@strapi/utils");
exports.default = ({ strapi }) => ({
    // Method to export entries of any specified model to CSV
    async exportToCSV() {
        var _a;
        const ctx = strapi.requestContext.get();
        const { modelName } = ctx.request.body;
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
    // Method to export submission data to CSV
    async exportSubmissionToCSV() {
        var _a;
        const ctx = strapi.requestContext.get();
        const { challengeId } = ctx.request.body;
        try {
            // Prepare query object, filtering by challengeId if provided
            const query = {
                populate: {
                    user: {
                        fields: ["username", "email"],
                        populate: {
                            address: {
                                fields: ["postcode"],
                            },
                        },
                    },
                },
            };
            // Apply filter only if challengeId is provided
            if (challengeId && challengeId !== 0) {
                query.filters = { challengeId };
            }
            // Fetch submission entries based on the query
            const entries = (await ((_a = strapi.entityService) === null || _a === void 0 ? void 0 : _a.findMany("api::submission.submission", query)));
            // Throw validation error if no data is found
            if (!entries || entries.length === 0) {
                throw new utils_1.errors.ValidationError(`No data found for model: api::submission.submission`);
            }
            // Flatten and format the entries for CSV export
            const flattenedEntries = entries.map((entry) => ({
                ...entry,
                userName: entry.user.username,
                userEmail: entry.user.email,
                userPostcode: entry.user.address ? entry.user.address.postcode : null,
                createdAt: new Date(entry.createdAt).toLocaleString("en-NZ"),
                updatedAt: new Date(entry.updatedAt).toLocaleString("en-NZ"),
                publishedAt: entry.publishedAt
                    ? new Date(entry.publishedAt).toLocaleString("en-NZ")
                    : null,
                user: undefined, // Remove nested user object
            }));
            // Reorganize the flattened entries for a better structure
            const reorganizedEntries = flattenedEntries.map((entry) => ({
                SubmissionId: entry.id,
                ChallengeId: entry.challengeId,
                UserId: entry.userId,
                UserName: entry.userName,
                UserEmail: entry.userEmail,
                UserPostcode: entry.userPostcode,
                SubmissionState: entry.state,
                SubmissionTitle: entry.title,
                SubmissionBody: entry.body,
                RewardTier: entry.rewardTier,
                VideoId: entry.videoId,
                VideoThumbnailUrl: entry.videoThumbnail,
                VideoHLSUrl: entry.videoHLS,
                VideoMP4Url: entry.videoMP4,
                PublicImageUrl: entry.publicImageUrl,
                PublicAudioUrl: entry.publicAudioUrl,
                PublicDocumentUrl: entry.publicDocumentUrl,
                CreatedAt: entry.createdAt,
                LastUpdatedAt: entry.updatedAt,
                PublishedAt: entry.publishedAt,
            }));
            // Return reorganized data as JSON
            ctx.body = reorganizedEntries;
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
                populate: {
                    user_submissions: {
                        fields: ["challengeId"],
                    },
                    address: {
                        fields: ["postcode"],
                    },
                },
            };
            // Fetch user entries based on the query
            const entries = (await ((_a = strapi.entityService) === null || _a === void 0 ? void 0 : _a.findMany("plugin::users-permissions.user", query)));
            // Throw validation error if no data is found
            if (!entries || entries.length === 0) {
                throw new utils_1.errors.ValidationError(`No data found for model: api::submission.submission`);
            }
            // Flatten and format the entries for CSV export
            const flattenedEntries = entries.map((entry) => ({
                ...entry,
                user_submission_ids: entry.user_submissions.map((submission) => submission.challengeId),
                confirmed: entry.confirmed ? "Yes" : "No",
                blocked: entry.blocked ? "Yes" : "No",
                IsRestricted: entry.restricted ? "Yes" : "No",
                createdAt: new Date(entry.createdAt).toLocaleString("en-NZ"),
                updatedAt: new Date(entry.updatedAt).toLocaleString("en-NZ"),
                postcode: entry.address ? entry.address.postcode : "",
                user: undefined,
                password: undefined,
                resetPasswordToken: undefined,
                confirmationToken: undefined,
                uid: undefined,
                profileImage: undefined,
                user_submissions: undefined,
                address: undefined,
                provider: undefined,
            }));
            // Reorganize the flattened entries for a better structure
            const reorganizedEntries = flattenedEntries.map((entry) => ({
                UserId: entry.id,
                UserName: entry.username,
                UserEmail: entry.email,
                IsConfirmed: entry.confirmed,
                FirstName: entry.firstName || null,
                LastName: entry.lastName || null,
                UserEthnicity: entry.ethnicity || null,
                UserPostcode: entry.postcode || null,
                DateOfBirth: entry.dateOfBirth || null,
                UserBio: entry.bio || null,
                SubmissionIds: entry.user_submission_ids,
                IsRestricted: entry.IsRestricted,
                ReputationScore: entry.reputationScore || 0,
                AccountCreatedAt: entry.createdAt,
                AccountUpdatedAt: entry.updatedAt,
                IsBlocked: entry.blocked,
            }));
            // Return reorganized data as JSON
            ctx.body = reorganizedEntries;
        }
        catch (error) {
            // Log the error and send a 500 response if there's an issue
            console.error("Error exporting data:", error);
            ctx.throw(500, "Failed to export data");
        }
    },
    // Method to export challenge data to CSV
    async exportChallengesToCSV() {
        var _a;
        const ctx = strapi.requestContext.get();
        try {
            // Prepare query object for challenge data export
            const query = {
                populate: {
                    rewardTiers: {
                        fields: ["tierName", "value", "total"],
                    },
                    sponsor: {
                        fields: ["organisationName"],
                    },
                },
            };
            // Fetch challenge entries based on the query
            const entries = (await ((_a = strapi.entityService) === null || _a === void 0 ? void 0 : _a.findMany("api::challenge.challenge", query)));
            // Throw validation error if no data is found
            if (!entries || entries.length === 0) {
                throw new utils_1.errors.ValidationError(`No data found for model: api::challenge.challenge`);
            }
            // Flatten and format the entries for CSV export
            const flattenedEntries = entries.map((entry) => ({
                ...entry,
                sponsorName: entry.sponsor.organisationName,
                Rewards: entry.rewardTiers
                    ? entry.rewardTiers
                        .map((tier, index) => `Reward Tier ${index + 1}: Name = ${tier.tierName}, Value = ${tier.value}, Total = ${tier.total}`)
                        .join(" | ")
                    : "No rewards set",
                createdAt: new Date(entry.createdAt).toLocaleString("en-NZ"),
                updatedAt: new Date(entry.updatedAt).toLocaleString("en-NZ"),
                startAt: entry.startAt
                    ? new Date(entry.startAt).toLocaleString("en-NZ")
                    : null,
                endAt: entry.endAt
                    ? new Date(entry.endAt).toLocaleString("en-NZ")
                    : null,
                publishedAt: entry.publishedAt
                    ? new Date(entry.publishedAt).toLocaleString("en-NZ")
                    : null,
            }));
            // Reorganize the flattened entries for a better structure
            const reorganizedEntries = flattenedEntries.map((entry) => ({
                ChallengeId: entry.id,
                SponsorName: entry.sponsorName,
                ChallengeName: entry.name,
                ChallengeTitle: entry.title,
                ChallengeStartAt: entry.startAt,
                ChallengeEndAt: entry.endAt,
                RewardDescription: entry.Rewards,
                CreatedAt: entry.createdAt,
                LastUpdatedAt: entry.updatedAt,
                PublishedAt: entry.publishedAt,
            }));
            // Return reorganized data as JSON
            ctx.body = reorganizedEntries;
        }
        catch (error) {
            // Log the error and send a 500 response if there's an issue
            console.error("Error exporting data:", error);
            ctx.throw(500, "Failed to export data");
        }
    },
    // Method to export sponsor data to CSV
    async exportSponsorsToCSV() {
        var _a;
        const ctx = strapi.requestContext.get();
        try {
            // Prepare query object for sponsor data export
            const query = {
                populate: {
                    contacts: {
                        fields: ["firstName", "lastName", "email"],
                    },
                },
            };
            // Fetch sponsor entries based on the query
            const entries = (await ((_a = strapi.entityService) === null || _a === void 0 ? void 0 : _a.findMany("api::sponsor.sponsor", query)));
            // Throw validation error if no data is found
            if (!entries || entries.length === 0) {
                throw new utils_1.errors.ValidationError(`No data found for model: api::sponsor.sponsor`);
            }
            // Flatten and format the entries for CSV export
            const flattenedEntries = entries.map((entry) => ({
                ...entry,
                contactEmails: entry.contacts
                    ? entry.contacts.map((contact) => contact.email).join(" | ")
                    : "No contacts set",
                contactNames: entry.contacts
                    ? entry.contacts
                        .map((contact) => `${contact.firstName} ${contact.lastName}`)
                        .join(" | ")
                    : "No contacts set",
                createdAt: new Date(entry.createdAt).toLocaleString("en-NZ"),
                updatedAt: new Date(entry.updatedAt).toLocaleString("en-NZ"),
                publishedAt: entry.publishedAt
                    ? new Date(entry.publishedAt).toLocaleString("en-NZ")
                    : null,
            }));
            // Reorganize the flattened entries for a better structure
            const reorganizedEntries = flattenedEntries.map((entry) => ({
                SponsorId: entry.id,
                SponsorUniqueIdentifer: entry.slug,
                Name: entry.organisationName,
                OrganisationType: entry.organisationType,
                ContactNames: entry.contactNames,
                ContactEmails: entry.contactEmails,
                Website: entry.website,
                SponsorBio: entry.bio,
                NZBN: entry.nzbn,
                OrganisationLogo: entry.profileImage,
                CreatedAt: entry.createdAt,
                LastUpdatedAt: entry.updatedAt,
                PublishedAt: entry.publishedAt,
            }));
            // Return reorganized data as JSON
            ctx.body = reorganizedEntries;
        }
        catch (error) {
            // Log the error and send a 500 response if there's an issue
            console.error("Error exporting data:", error);
            ctx.throw(500, "Failed to export data");
        }
    },
});
