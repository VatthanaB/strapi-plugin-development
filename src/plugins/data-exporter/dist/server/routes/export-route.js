"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        method: "POST",
        path: "/export/csv",
        handler: "exporter.export",
        config: {
            policies: [], // No policies applied to this route
        },
    },
    {
        method: "POST",
        path: "/export/submissions",
        handler: "exporter.exportSubmissionToCSV",
        config: {
            policies: [], // No policies applied to this route
        },
    },
    {
        method: "POST",
        path: "/export/users",
        handler: "exporter.exportUsersToCSV",
        config: {
            policies: [], // No policies applied to this route
        },
    },
    {
        method: "POST",
        path: "/export/challenges",
        handler: "exporter.exportChallengesToCSV",
        config: {
            policies: [], // No policies applied to this route
        },
    },
    {
        method: "POST",
        path: "/export/sponsors",
        handler: "exporter.exportSponsorsToCSV",
        config: {
            policies: [], // No policies applied to this route
        },
    },
];
