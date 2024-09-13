"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [
    {
        method: "POST",
        path: "/export/get-entries",
        handler: "exporter.exportEntryDatas",
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
];
