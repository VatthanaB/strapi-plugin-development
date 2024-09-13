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
    method: "POST",
    path: "/export/submissions",
    handler: "exporter.exportSubmissionToCSV", // Handles the export of submission data to CSV
    config: {
      policies: [], // No policies applied to this route
    },
  },
  {
    method: "POST",
    path: "/export/users",
    handler: "exporter.exportUsersToCSV", // Handles the export of user data to CSV
    config: {
      policies: [], // No policies applied to this route
    },
  },
  {
    method: "POST",
    path: "/export/challenges",
    handler: "exporter.exportChallengesToCSV", // Handles the export of challenge data to CSV
    config: {
      policies: [], // No policies applied to this route
    },
  },
  {
    method: "POST",
    path: "/export/sponsors",
    handler: "exporter.exportSponsorsToCSV", // Handles the export of sponsor data to CSV
    config: {
      policies: [], // No policies applied to this route
    },
  },
];
