export interface ContentType {
  uid: string;
  plugin?: string;
  apiID: string;
  schema: Schema;
}

interface Schema {
  draftAndPublish: boolean;
  displayName: string;
  singularName: string;
  pluralName: string;
  description: string;
  pluginOptions: PluginOptions;
  kind: string;
  collectionName: string;
  attributes: Record<string, Attribute>;
  visible: boolean;
  restrictRelationsTo?: string[] | null;
}

interface PluginOptions {
  "content-manager"?: { visible: boolean };
  "content-type-builder"?: { visible: boolean };
}

type AttributeType =
  | "string"
  | "email"
  | "password"
  | "boolean"
  | "integer"
  | "relation";

interface Attribute {
  type: AttributeType;
  unique?: boolean;
  minLength?: number;
  configurable?: boolean;
  required?: boolean;
  private?: boolean;
  searchable?: boolean;
  default?: boolean | string;
  relation?: string;
  inversedBy?: string;
  target?: string;
  collectionName?: string;
  targetAttribute?: string;
}

const contentTypes: ContentType[] = [
  {
    uid: "admin::user",
    plugin: "admin",
    apiID: "user",
    schema: {
      draftAndPublish: false,
      displayName: "User",
      singularName: "user",
      pluralName: "users",
      description: "",
      pluginOptions: {
        "content-manager": {
          visible: false,
        },
        "content-type-builder": {
          visible: false,
        },
      },
      kind: "collectionType",
      collectionName: "admin_users",
      attributes: {
        firstname: {
          type: "string",
          unique: false,
          minLength: 1,
          configurable: false,
          required: false,
        },
        lastname: {
          type: "string",
          unique: false,
          minLength: 1,
          configurable: false,
          required: false,
        },
        username: {
          type: "string",
          unique: false,
          configurable: false,
          required: false,
        },
        email: {
          type: "email",
          minLength: 6,
          configurable: false,
          required: true,
          unique: true,
          private: true,
        },
        password: {
          type: "password",
          minLength: 6,
          configurable: false,
          required: false,
          private: true,
          searchable: false,
        },
        resetPasswordToken: {
          type: "string",
          configurable: false,
          private: true,
          searchable: false,
        },
        registrationToken: {
          type: "string",
          configurable: false,
          private: true,
          searchable: false,
        },
        isActive: {
          type: "boolean",
          default: false,
          configurable: false,
          private: true,
        },
        roles: {
          type: "relation",
          configurable: false,
          private: true,
          relation: "manyToMany",
          inversedBy: "users",
          target: "admin::role",
          collectionName: "strapi_users_roles",
          targetAttribute: "users",
        },
        blocked: {
          type: "boolean",
          default: false,
          configurable: false,
          private: true,
        },
        preferedLanguage: {
          type: "string",
          configurable: false,
          required: false,
          searchable: false,
        },
      },
      visible: false,
      restrictRelationsTo: ["oneWay", "manyWay"],
    },
  },
  {
    uid: "api::test-content-type.test-content-type",
    apiID: "test-content-type",
    schema: {
      draftAndPublish: true,
      displayName: "test-content-type",
      singularName: "test-content-type",
      pluralName: "test-content-types",
      description: "",
      pluginOptions: {},
      kind: "collectionType",
      collectionName: "test_content_types",
      attributes: {
        title: {
          type: "string",
        },
        number: {
          type: "integer",
        },
        isValid: {
          type: "boolean",
        },
      },
      visible: true,
      restrictRelationsTo: null,
    },
  },
];
