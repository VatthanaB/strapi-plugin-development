import path from "path";

export default [
  {
    method: "POST",
    path: "/export/csv",
    handler: "exporter.export", // Handles the export of generic CSV data
    config: {
      policies: [], // No policies applied to this route
    },
  },
  {
    method: "GET",
    path: "/export/get-content-types",
    handler: "exporter.getAllContentTypes", // Handles the export of submission data to CSV
    config: {
      policies: [], // No policies applied to this route
    },
  },
];
