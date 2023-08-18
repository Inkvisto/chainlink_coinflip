"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeReadPackageJsonFromDir = exports.safeReadPackageJson = exports.readPackageJsonFromDir = exports.readPackageJson = void 0;
const path_1 = __importDefault(require("path"));
const error_1 = require("@pnpm/error");
const load_json_file_1 = __importDefault(require("load-json-file"));
const normalize_package_data_1 = __importDefault(require("normalize-package-data"));
async function readPackageJson(pkgPath) {
    try {
        const manifest = await (0, load_json_file_1.default)(pkgPath);
        (0, normalize_package_data_1.default)(manifest);
        return manifest;
    }
    catch (err) { // eslint-disable-line
        if (err.code)
            throw err;
        throw new error_1.PnpmError('BAD_PACKAGE_JSON', `${pkgPath}: ${err.message}`);
    }
}
exports.readPackageJson = readPackageJson;
async function readPackageJsonFromDir(pkgPath) {
    return readPackageJson(path_1.default.join(pkgPath, 'package.json'));
}
exports.readPackageJsonFromDir = readPackageJsonFromDir;
async function safeReadPackageJson(pkgPath) {
    try {
        return await readPackageJson(pkgPath);
    }
    catch (err) { // eslint-disable-line
        if (err.code !== 'ENOENT')
            throw err;
        return null;
    }
}
exports.safeReadPackageJson = safeReadPackageJson;
async function safeReadPackageJsonFromDir(pkgPath) {
    return safeReadPackageJson(path_1.default.join(pkgPath, 'package.json'));
}
exports.safeReadPackageJsonFromDir = safeReadPackageJsonFromDir;
//# sourceMappingURL=index.js.map