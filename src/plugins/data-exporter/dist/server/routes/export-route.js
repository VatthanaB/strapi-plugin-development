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
        method: "GET",
        path: "/export/get-content-types",
        handler: "exporter.getAllContentTypes",
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
];
