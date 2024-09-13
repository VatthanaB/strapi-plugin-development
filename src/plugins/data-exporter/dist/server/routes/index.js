"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const export_route_1 = __importDefault(require("./export-route"));
const routes = {
    export: {
        routes: export_route_1.default,
    },
};
exports.default = routes;
