"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPkgId = void 0;
const encode_registry_1 = __importDefault(require("encode-registry"));
function createPkgId(registry, pkgName, pkgVersion) {
    const escapedRegistryHost = (0, encode_registry_1.default)(registry);
    return `${escapedRegistryHost}/${pkgName}/${pkgVersion}`;
}
exports.createPkgId = createPkgId;
//# sourceMappingURL=createNpmPkgId.js.map