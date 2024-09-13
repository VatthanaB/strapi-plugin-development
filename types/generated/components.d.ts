import type { Schema, Attribute } from '@strapi/strapi';

export interface PluginDevelopmentNestedComponent extends Schema.Component {
  collectionName: 'components_plugin_development_nested_components';
  info: {
    displayName: 'nestedComponent';
  };
  attributes: {
    title: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'plugin-development.nested-component': PluginDevelopmentNestedComponent;
    }
  }
}
