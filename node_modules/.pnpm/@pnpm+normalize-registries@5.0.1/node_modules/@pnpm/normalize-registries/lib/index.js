"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeRegistries = exports.DEFAULT_REGISTRIES = void 0;
const normalize_registry_url_1 = __importDefault(require("normalize-registry-url"));
const map_1 = __importDefault(require("ramda/src/map"));
exports.DEFAULT_REGISTRIES = {
    default: 'https://registry.npmjs.org/',
};
function normalizeRegistries(registries) {
    if (registries == null)
        return exports.DEFAULT_REGISTRIES;
    const normalizeRegistries = (0, map_1.default)(normalize_registry_url_1.default, registries);
    return {
        ...exports.DEFAULT_REGISTRIES,
        ...normalizeRegistries,
    };
}
exports.normalizeRegistries = normalizeRegistries;
//# sourceMappingURL=index.js.map