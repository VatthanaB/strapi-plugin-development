const pluginPermissions = {
  read: [{ action: "plugin::data-exporter.read", subject: null }],
  create: [{ action: "plugin::data-exporter.create", subject: null }],
  update: [{ action: "plugin::data-exporter.update", subject: null }],
  delete: [{ action: "plugin::data-exporter.delete", subject: null }],
};

export default pluginPermissions;
