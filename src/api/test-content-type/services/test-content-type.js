'use strict';

/**
 * test-content-type service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::test-content-type.test-content-type');
